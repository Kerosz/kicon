// packages
import { v4 as uuid } from "uuid";
// types
import type { Admin, AdminDataRequest, Customer, CustomerDataRequest, User } from "../types";
import usePoolConnection from "../utils/use-pool-connection";

class CustomerStore {
  /**
   * @description Method used to get a customer by it's email
   *
   * @param email Customer email to be queried by
   * @returns The customer data object
   */
  public async getUserByEmail(email: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE email = ($1)";

      const [result]: User[] = await usePoolConnection<User>(sql, [email]);

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Could not get customer. Error: ${error.message}`);
      } else {
        throw new Error(`Could not get customer. Error: ${error}`);
      }
    }
  }

  public async getUserById(id: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id = ($1)";

      const [result]: User[] = await usePoolConnection<User>(sql, [id]);

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Could not get customer. Error: ${error.message}`);
      } else {
        throw new Error(`Could not get customer. Error: ${error}`);
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
        "INSERT INTO users (id, email, password, role, first_name, last_name, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";

      const [result]: Customer[] = await usePoolConnection<Customer>(sql, [
        id,
        c.email,
        c.password,
        "customer" /** role */,
        c.first_name,
        c.last_name,
        Date.now() /** created_at */,
        Date.now() /** updated_at */,
      ]);

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Could not create customer. Error: ${error.message}`);
      } else {
        throw new Error(`Could not create customer. Error: ${error}`);
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
        "INSERT INTO users (id, email, password, role, first_name, last_name, display_name, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";

      const [result]: Admin[] = await usePoolConnection<Admin>(sql, [
        id,
        a.email,
        a.password,
        "admin" /** role */,
        "Administration" /** first_name */,
        "Account" /** last_name */,
        "Admin" /** display_name */,
        Date.now() /** created_at */,
        Date.now() /** updated_at */,
      ]);

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Could not create admin. Error: ${error.message}`);
      } else {
        throw new Error(`Could not create admin. Error: ${error}`);
      }
    }
  }
}

export const store = new CustomerStore();
