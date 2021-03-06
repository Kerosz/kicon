// packages
import argon2 from "argon2";
import jwt from "jsonwebtoken";
// internals
import config from "../config/index";
import { store } from "../models/user";
import { deleteProperty } from "../utils/transformers";
// types
import type {
  Admin,
  AdminDataRequest,
  Customer,
  CustomerDataRequest,
  User,
  UserAuthRequest,
  UserWithoutPassword,
} from "../types";

export interface AuthReturn {
  user: UserWithoutPassword;
  token: string;
}

class AuthService {
  private readonly pepper: string = config.argon.secret;

  /**
   * @description Generates the customer token with metadata
   *
   * @param u Customer data object
   * @returns Customer token
   * @private
   */
  private static getToken(u: User): string {
    return jwt.sign(
      //  Metadata
      {
        id: u.id,
        role: u.role,
      },
      config.jwt.secret
    );
  }

  /**
   * @description Processes a auth signUp call
   *
   * @param customerRequestData Customer data object coming from the signUp request
   * @returns An object containing the customer information and it's token
   */
  public async signUp({ password, ...rest }: CustomerDataRequest): Promise<AuthReturn> {
    const hashedPassword: string = await argon2.hash(password + this.pepper);

    const customerResult: Customer = await store.saveCustomer({
      ...rest,
      password: hashedPassword,
    });

    deleteProperty<Partial<Customer>>(customerResult, ["password"]);

    const token: string = AuthService.getToken(customerResult);

    return { user: customerResult, token };
  }

  /**
   * @description Processes an admin create account call
   *
   * @param customerRequestData Admin signUp data request
   * @returns An object containing the customer information and it's token
   */
  public async signUpAsAdmin({ password, ...rest }: AdminDataRequest): Promise<AuthReturn> {
    const hashedPassword: string = await argon2.hash(password + this.pepper);

    const adminResult: Admin = await store.saveAdmin({
      ...rest,
      password: hashedPassword,
    });

    deleteProperty<Partial<Admin>>(adminResult, ["password"]);

    const token: string = AuthService.getToken(adminResult);

    return { user: adminResult, token };
  }

  /**
   * @description Processes a signIn call
   *
   * @param email User email address
   * @param password User password
   * @returns An object containing the user information and it's token
   */
  public async signIn({ email, password }: UserAuthRequest): Promise<AuthReturn> {
    const userResult: User = await store.getUserByEmail(email);

    if (!userResult) {
      throw new Error("Invalid email address!");
    }

    const isPasswordValid: boolean = await argon2.verify(
      userResult.password,
      password + this.pepper
    );

    if (isPasswordValid) {
      deleteProperty<Partial<User>>(userResult, ["password"]);

      const token: string = AuthService.getToken(userResult);

      return { user: userResult, token };
    } else {
      throw new Error("Invalid password!");
    }
  }
}

export default AuthService;
