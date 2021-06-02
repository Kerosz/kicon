export enum UserRole {
  customer = "customer",
  admin = "admin",
  seller = "seller",
}

export interface User {
  readonly id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  display_name: string;
  birthday: number | string;
  role: keyof typeof UserRole;
  readonly created_at: number | string;
  updated_at: number | string;
}

export type UserWithoutPassword = Omit<User, "password">;

export type UserTestParams = Pick<User, "id" | "created_at" | "updated_at">;

export type UserAuthRequest = Readonly<{
  email: string;
  password: string;
}>;

export interface Customer extends User {
  role: UserRole.customer;
}

export type CustomerDataRequest = Omit<
  Customer,
  "id" | "display_name" | "role" | "birthday" | "created_at" | "updated_at"
>;

export interface Admin extends User {
  role: UserRole.admin;
}

export type AdminDataRequest = Omit<CustomerDataRequest, "first_name" | "last_name">;
