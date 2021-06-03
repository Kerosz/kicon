// internals
import { store } from "../../src/models/user";
import { deleteProperty } from "../../src/utils/transformers";
// types
import type { Admin, AdminDataRequest, Customer, CustomerDataRequest, User } from "../../src/types";

describe("UserStore Model", function () {
  let createdUser: User;

  describe("saveCustomer()", function () {
    it("method should be defined ", function () {
      expect(store.saveCustomer).toBeDefined();
    });

    it("should store a user to DB and return the created user object", async function () {
      const mockCustomerData: CustomerDataRequest = {
        email: "customer@customtest.com",
        password: "customer",
        first_name: "Test",
        last_name: "Test",
      };

      const result: Customer = await store.saveCustomer(mockCustomerData);
      // Saving user info to be used in later testing
      createdUser = result;

      expect(result.id).toBeTruthy();
      expect(result.email).toBe(mockCustomerData.email);
      // NOTE: Password is not hashed as hashing happens in the Auth Services layer
      expect(result.password).toBe(mockCustomerData.password);
      expect(result.first_name).toBe(mockCustomerData.first_name);
      expect(result.last_name).toBe(mockCustomerData.last_name);
      expect(result.role).toBe("customer");
      expect(result.display_name).toBeNull();
      expect(result.birthday).toBeNull();
      expect(result.created_at).toBeTruthy();
      expect(result.updated_at).toBeTruthy();
    });
  });

  describe("getUserById()", function () {
    it("method should be defined", function () {
      expect(store.getUserById).toBeDefined();
    });

    it("should return the user object queried by it's ID", async function () {
      const result = await store.getUserById(createdUser.id);

      expect(result).toBeTruthy();
      expect(result).toEqual(createdUser);
    });
  });

  describe("getUserByEmail()", function () {
    it("method should be defined", function () {
      expect(store.getUserByEmail).toBeDefined();
    });

    it("should return the user object queried by it's ID", async function () {
      const result = await store.getUserByEmail(createdUser.email);

      expect(result).toEqual(createdUser);
    });
  });

  describe("saveAdmin()", function () {
    it("method should be defined ", function () {
      expect(store.saveAdmin).toBeDefined();
    });

    it("should store a user to DB and return the created user object", async function () {
      const mockAdminData: AdminDataRequest = {
        email: "admin@customadmin.com",
        password: "admin",
      };

      const result: Admin = await store.saveAdmin(mockAdminData);

      expect(result.id).toBeTruthy();
      expect(result.email).toBe(mockAdminData.email);
      // NOTE: Password is not hashed as hashing happens in the Auth Services layer
      expect(result.password).toBe(mockAdminData.password);
      expect(result.first_name).toBe("Administration");
      expect(result.last_name).toBe("Account");
      expect(result.role).toBe("admin");
      expect(result.display_name).toBe("Admin");
      expect(result.birthday).toBeNull();
      expect(result.created_at).toBeTruthy();
      expect(result.updated_at).toBeTruthy();
    });
  });

  describe("getAllUsers()", function () {
    it("method should be defined", function () {
      expect(store.getAllUsers).toBeDefined();
    });

    it("should return a list of all users", async function () {
      const result: User[] = await store.getAllUsers();

      deleteProperty<Partial<User>>(createdUser, ["password"]);

      expect(result).toContain(createdUser);
    });
  });

  describe("updateUser()", function () {
    it("method should be defined", function () {
      expect(store.updateUser).toBeDefined();
    });

    it("should return an object with the updated user data", async function () {
      const mockNewUserValues = { display_name: "testinator007" };

      const result: User = await store.updateUser(createdUser.id, mockNewUserValues);

      expect(result).toBeTruthy();
      expect(result.display_name).toBe(mockNewUserValues.display_name);
    });
  });
});
