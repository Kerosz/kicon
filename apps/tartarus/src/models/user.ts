// packages
import { v4 as uuid } from "uuid";
// internals
import usePoolConnection from "../utils/use-pool-connection";
import { generateUpdateSqlQuery } from "../utils/generators";
// types
import type {
  Admin,
  AdminDataRequest,
  Customer,
  CustomerDataRequest,
  User,
  UserDetailsRequest,
} from "../types";

class CustomerStore {
  /**
   * @description Method used to query a list of all users
   *
   * @returns A list of all users data
   */
  public async getAllUsers(): Promise<User[]> {
    try {
      const sql =
        "SELECT id, email, first_name, last_name, display_name, role, birthday, updated_at, created_at FROM users";

      return await usePoolConnection<User>(sql);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Could not get customer. Error: ${error.message}`);
      } else {
        throw new Error(String(error));
      }
    }
  }

  /**
   * @description Method used to query a user by it's `email`
   *
   * @param email User email to be queried by
   * @returns The user data object
   */
  public async getUserByEmail(email: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE email = ($1)";

      const [result]: User[] = await usePoolConnection<User>(sql, [email]);

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Could not get customer. Error: ${error.message}`);
      } else {
        throw new Error(String(error));
      }
    }
  }

  /**
   * @description Method used to query a user by it's `id`
   *
   * @param userId User id to be queried by
   * @returns The user data object
   */
  public async getUserById(userId: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id = ($1)";

      const [result]: User[] = await usePoolConnection<User>(sql, [userId]);

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Could not get user. Error: ${error.message}`);
      } else {
        throw new Error(String(error));
      }
    }
  }

  /**
   * @description Method used to add a new user to storage
   *
   * @param c New user data object
   * @returns The newly created user data object
   */
  public async saveCustomer(c: CustomerDataRequest): Promise<Customer> {
    try {
      const id = uuid();
      const sql =
        "INSERT INTO users (id, email, password, role, " +
        "first_name, last_name, created_at, updated_at)" +
        " VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";

      const [result]: Customer[] = await usePoolConnection<Customer>(sql, [
        id,
        c.email,
        c.password,
        "customer" /** role */,
        c.first_name,
        c.last_name,
        Date.now().toString() /** created_at */,
        Date.now().toString() /** updated_at */,
      ]);

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Could not create customer. Error: ${error.message}`);
      } else {
        throw new Error(String(error));
      }
    }
  }

  /**
   * @description Method used to add a new admin account to storage
   *
   * @param a New admin data object
   * @returns The newly created admin data object
   */
  public async saveAdmin(a: AdminDataRequest): Promise<Admin> {
    try {
      const id = uuid();
      const sql =
        "INSERT INTO users (id, email, password, role, first_name, " +
        "last_name, display_name, created_at, updated_at) " +
        "VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";

      const [result]: Admin[] = await usePoolConnection<Admin>(sql, [
        id,
        a.email,
        a.password,
        "admin" /** role */,
        "Administration" /** first_name */,
        "Account" /** last_name */,
        "Admin" /** display_name */,
        Date.now().toString() /** created_at */,
        Date.now().toString() /** updated_at */,
      ]);

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Could not create admin. Error: ${error.message}`);
      } else {
        throw new Error(String(error));
      }
    }
  }

  /**
   * @description Method for updating a user details
   *
   * @param userId The `ID` of the user to be updated
   * @param data Data object containing the values to be updated
   * @returns The updated user data
   */
  public async updateUser(userId: string, data: Partial<UserDetailsRequest>): Promise<User> {
    try {
      const { sql, params } = generateUpdateSqlQuery({
        tablename: "users",
        condition: userId,
        rawData: data,
      });

      const [result]: User[] = await usePoolConnection<User>(sql, params);

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Could not update user. Error: ${error.message}`);
      } else {
        throw new Error(String(error));
      }
    }
  }
}

export const store = new CustomerStore();
