// internals
import AuthService from "../../src/services/auth";
// types
import type { AuthReturn } from "../../src/services/auth";
import {
  AdminDataRequest,
  CustomerDataRequest,
  UserAuthRequest,
  UserWithoutPassword,
} from "../../src/types";

describe("AuthService Class", function () {
  const customerMockData: CustomerDataRequest = {
    email: "customer@servicecustom.com",
    password: "customer",
    first_name: "Test",
    last_name: "Test",
  };

  let authInstance: AuthService;

  beforeAll(() => {
    authInstance = new AuthService();
  });

  afterAll(() => {
    // @ts-ignore
    authInstance = null;
  });

  describe("signUp()", function () {
    let createdCustomer: UserWithoutPassword;

    it("method should be defined", function () {
      expect(authInstance.signUp).toBeDefined();
    });

    it("should process a 'customer' signUp call and return an object with the created user data and it's token", async function () {
      const result: AuthReturn = await authInstance.signUp(customerMockData);
      createdCustomer = result.user;

      expect(result.token).toBeTruthy();
      expect(result.user).toBeTruthy();
      expect(result.user.role).toBe("customer");
    });

    it("should not expose the newly created 'customer' password", function () {
      // @ts-ignore
      expect(createdCustomer.password).toBeUndefined();
    });
  });

  describe("signIn()", function () {
    let loggedInUser: UserWithoutPassword;

    it("method should be defined", function () {
      expect(authInstance.signIn).toBeDefined();
    });

    it("should verify the user credentials and return an object with user data and token if they are valid", async function () {
      const loginCredentials: UserAuthRequest = {
        email: customerMockData.email,
        password: customerMockData.password,
      };

      const result: AuthReturn = await authInstance.signIn(loginCredentials);
      loggedInUser = result.user;

      expect(result.user).toBeTruthy();
      expect(result.token).toBeTruthy();
    });

    it("should throw an error if the email address does not exist", async function () {
      const invalidCredentials: UserAuthRequest = {
        email: "invalid@testcustom.com",
        password: "invalid",
      };
      const errorMessage = "Invalid email address!";

      await expectAsync(authInstance.signIn(invalidCredentials)).toBeRejectedWithError(
        errorMessage
      );
    });

    it("should throw an error if the password is incorrect", async function () {
      const invalidCredentials: UserAuthRequest = {
        email: customerMockData.email,
        password: "invalid",
      };
      const errorMessage = "Invalid password!";

      await expectAsync(authInstance.signIn(invalidCredentials)).toBeRejectedWithError(
        errorMessage
      );
    });

    it("should not expose user password", function () {
      //@ts-ignore
      expect(loggedInUser.password).toBeUndefined();
    });
  });

  describe("signUpAsAdmin()", function () {
    let createdAdmin: UserWithoutPassword;

    it("method should be defined", function () {
      expect(authInstance.signUpAsAdmin).toBeDefined();
    });

    it("should process an 'admin' signUp call and return an object with the created user data and it's token", async function () {
      const adminMockData: AdminDataRequest = {
        email: "admin@servicecustom.com",
        password: "admin",
      };

      const result: AuthReturn = await authInstance.signUpAsAdmin(adminMockData);
      createdAdmin = result.user;

      expect(result.token).toBeTruthy();
      expect(result.user).toBeTruthy();
      expect(result.user.role).toBe("admin");
    });

    it("should not expose the newly created 'admin' password", function () {
      // @ts-ignore
      expect(createdAdmin.password).toBeUndefined();
    });
  });
});
