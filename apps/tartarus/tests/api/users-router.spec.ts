// packages
import request from "supertest";
// internals
import app from "../../src/index";
import config from "../../src/config/index";
import AuthService from "../../src/services/auth";
// types
import type { Response } from "supertest";
import type { AuthReturn } from "../../src/services/auth";

describe("User Router", function () {
  let apiPrefix: string = config.api.prefix;
  let userData: AuthReturn;

  /**
   * Creating an admin account for the routes that require admin/owner authorization
   */
  beforeAll(async function () {
    const authInstance = new AuthService();

    userData = await authInstance.signUpAsAdmin({
      email: "admin@customusers.com",
      password: "admin",
    });
  });

  describe("GET /", function () {
    let res: Response;

    beforeAll(async function () {
      res = await request(app)
        .get(`${apiPrefix}/users`)
        .set("Authorization", `Bearer ${userData.token}`);
    });

    it("should have status code 200", function () {
      expect(res.status).toBe(200);
    });
    it("should return type of 'application/json'", function () {
      expect(res.type).toMatch(/json/i);
    });
    it("should return a list of all users", function () {
      expect(res.body).toContain(userData.user);
    });
  });

  describe("GET /:id", function () {
    let res: Response;

    beforeAll(async function () {
      res = await request(app)
        .get(`${apiPrefix}/users/${userData.user.id}`)
        .set("Authorization", `Bearer ${userData.token}`);
    });

    it("should have status code 200", function () {
      expect(res.status).toBe(200);
    });
    it("should return type of 'application/json'", function () {
      expect(res.type).toMatch(/json/i);
    });
    it("should return an object with used data", function () {
      expect(res.body).toEqual(userData.user);
    });
  });

  describe("PATCH /:id", function () {
    const mockNewUserValues = { display_name: "routertest" };
    let res: Response;

    beforeAll(async function () {
      res = await request(app)
        .patch(`${apiPrefix}/users/${userData.user.id}`)
        .set("Authorization", `Bearer ${userData.token}`)
        .send(mockNewUserValues);
    });

    it("should have status code 200", function () {
      expect(res.status).toBe(200);
    });
    it("should return type of 'application/json'", function () {
      expect(res.type).toMatch(/json/i);
    });
    it("should return an object with the newly updated user data", function () {
      const result = res.body;

      expect(result.display_name).toBe(mockNewUserValues.display_name);
      expect(result.id).toBe(userData.user.id);
      expect(result.role).toBe(userData.user.role);
      expect(result.first_name).toBe(userData.user.first_name);
      expect(result.last_name).toBe(userData.user.last_name);
    });
  });
});
