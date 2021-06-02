// packages
import request from "supertest";
// internals
import app from "../../src/index";
import config from "../../src/config/index";
// types
import type { Response } from "supertest";
import type { AdminDataRequest, CustomerDataRequest, UserAuthRequest } from "../../src/types";

describe("Auth Router", function () {
  const mockCustomerData: CustomerDataRequest = {
    email: "customer@customrouter.com",
    password: "customer",
    first_name: "Test",
    last_name: "Text",
  };
  const apiPrefix: string = config.api.prefix;

  describe("POST /signup", function () {
    let res: Response;

    beforeAll(async function () {
      res = await request(app).post(`${apiPrefix}/signup`).send(mockCustomerData);
    });

    it("should have status code 201", function () {
      expect(res.status).toBe(201);
    });
    it("should return type of 'application/json'", function () {
      expect(res.type).toMatch(/json/i);
    });
    it("should create a new customer and return back it's user data and token", function () {
      const result = res.body;

      expect(result.token).toBeTruthy();
      expect(result.user).toBeTruthy();
      expect(result.user.role).toBe("customer");
    });
  });

  describe("POST /signin", function () {
    let res: Response;

    beforeAll(async function () {
      const mockLoginCredentials: UserAuthRequest = {
        email: mockCustomerData.email,
        password: mockCustomerData.password,
      };

      res = await request(app).post(`${apiPrefix}/signin`).send(mockLoginCredentials);
    });

    it("should have status code 200", function () {
      expect(res.status).toBe(200);
    });
    it("should return type of 'application/json'", function () {
      expect(res.type).toMatch(/json/i);
    });
    it("should verify user credentials and return back it's user data and token", function () {
      const result = res.body;

      expect(result.user).toBeTruthy();
      expect(result.token).toBeTruthy();
    });
  });

  describe("POST /create-admin-account", function () {
    let res: Response;

    beforeAll(async function () {
      const mockAdminData: AdminDataRequest = {
        email: "admin@customrouter.com",
        password: "admin",
      };

      res = await request(app).post(`${apiPrefix}/create-admin-account`).send(mockAdminData);
    });

    it("should have status code 201", function () {
      expect(res.status).toBe(201);
    });
    it("should return type of 'application/json'", function () {
      expect(res.type).toMatch(/json/i);
    });
    it("should a new admin and return back it's user data and token", function () {
      const result = res.body;

      expect(result.token).toBeTruthy();
      expect(result.user).toBeTruthy();
      expect(result.user.role).toBe("admin");
    });
  });
});
