// packages
import request from "supertest";
// internals
import app from "../../src/index";
import config from "../../src/config/index";
// types
import type { Response } from "supertest";
import type { Product, ProductWithoutDbInserts } from "../../src/types/db-schema";

describe("Products Router", function () {
  const apiPrefix = config.api.prefix;
  let productId: string;

  describe("GET /products", function () {
    let res: Response;

    beforeAll(async function () {
      res = await request(app).get(`${apiPrefix}/products`);
    });

    it("should have status code 200", function () {
      expect(res.status).toBe(200);
    });
    it("should return type of 'application/json'", function () {
      expect(res.type).toMatch(/json/);
    });
    it("should return a list of products", function () {
      expect(res.body).toEqual([]);
    });
  });

  describe("POST /products", function () {
    const mockProduct: ProductWithoutDbInserts = {
      name: "Logitech K380 Keyboard",
      description:
        "This slim Bluetooth keyboard for Mac works with your MacBook, iPad, or iPhone -with a lightweight, minimalist iOS layout that lets you multitask at home or on the go.",
      price: "39",
      stock: 21,
    };
    let res: Response;

    beforeAll(async function () {
      res = await request(app).post(`${apiPrefix}/products`).send(mockProduct);

      productId = res.body.id;
    });

    it("should have status code 201", function () {
      expect(res.status).toBe(201);
    });
    it("should return type of 'application/json'", function () {
      expect(res.type).toMatch(/json/i);
    });
    it("should return the new added product", function () {
      const result: Product = res.body;

      expect(result.id).toBeTruthy();
      expect(result.name).toBe(mockProduct.name);
      expect(result.description).toBe(mockProduct.description);
      expect(result.price).toBe(mockProduct.price);
      expect(result.stock).toBe(mockProduct.stock);
      expect(result.created_at).toBeTruthy();
      expect(result.updated_at).toBeTruthy();
    });
  });

  describe("PATCH /products/:id", function () {
    const mockNewProductValues = { stock: 4, price: "41" };
    let res: Response;

    beforeAll(async function () {
      res = await request(app)
        .patch(`${apiPrefix}/products/${productId}`)
        .send(mockNewProductValues);
    });

    it("should have status code 200", function () {
      expect(res.status).toBe(200);
    });
    it("should return type 'application/json'", function () {
      expect(res.type).toMatch(/json/i);
    });
    it("should return a product with the new updated values", function () {
      const result: Product = res.body;

      expect(result.id).toBeTruthy();
      expect(result.name).toBeTruthy();
      expect(result.description).toBeTruthy();
      expect(result.stock).toBe(mockNewProductValues.stock);
      expect(result.price).toBe(mockNewProductValues.price);
      expect(result.created_at).toBeTruthy();
      expect(result.updated_at).toBeTruthy();
    });
  });

  describe("DELETE /products/:id", function () {
    let res: Response;

    beforeAll(async function () {
      res = await request(app).delete(`${apiPrefix}/products/${productId}`);
    });

    it("should have status 200", function () {
      expect(res.status).toBe(200);
    });
    it("should return type of 'application/json'", function () {
      expect(res.type).toMatch(/json/i);
    });
    it("should return an object with deletion confirmation", function () {
      expect(res.body.deleted).toBe(true);
    });
  });
});
