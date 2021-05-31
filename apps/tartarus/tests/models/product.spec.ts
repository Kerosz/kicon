// packages
import { v4 as uuid } from "uuid";
// internals
import { store } from "../../src/models/product";
// types
import type { Product, ProductWithoutDbInserts } from "../../src/types/db-schema";

describe("ProductStore Model", function () {
  const idMock = uuid();
  const createdAtMock = Date.now();
  const updatedAtMock = Date.now();

  const productMock: Product = {
    id: idMock,
    name: "Apple MacBook Pro",
    description:
      "Designed for those who defy limits and change the world, the 16-inch MacBook Pro is by far the most powerful notebook we have ever made. With an immersive Retina display, super fast processors, advanced graphics, the largest battery capacity ever in a MacBook Pro, Magic Keyboard, and massive storage, it's the ultimate pro notebook for the ultimate user.",
    price: "2399",
    stock: 10,
    created_at: createdAtMock.toString(),
    updated_at: updatedAtMock.toString(),
  };

  describe("createProduct()", function () {
    it("method should be defined", function () {
      expect(store.createProduct).toBeDefined();
    });

    it("should add a new product", async function () {
      const result = await store.createProduct(
        {
          name: productMock.name,
          description: productMock.description,
          price: productMock.price,
          stock: productMock.stock,
        },
        { id: idMock, created_at: createdAtMock, updated_at: updatedAtMock }
      );

      expect(result).toEqual(productMock);
    });
  });

  describe("getAllProducts()", function () {
    it("method should be defined", function () {
      expect(store.getAllProducts).toBeDefined();
    });

    it("should return a list of products", async function () {
      const result: Product[] = await store.getAllProducts();
      const expectedResult: Product[] = [{ ...productMock }];

      expect(result).toEqual(expectedResult);
    });
  });

  describe("getProductById()", function () {
    it("method should be defined", function () {
      expect(store.getProductById).toBeDefined();
    });

    it("should return an object with a single product", async function () {
      const result: Product = await store.getProductById(idMock);

      expect(result).toEqual(productMock);
    });
  });

  describe("updateProduct()", function () {
    it("method should be defined", function () {
      expect(store.updateProduct).toBeDefined();
    });

    it("should update the product and return the updated data object", async function () {
      const newValues = {
        stock: 40,
        price: "3000",
        updated_at: Date.now().toString(),
      } as Partial<ProductWithoutDbInserts>;

      const restul: Product = await store.updateProduct(idMock, newValues);
      const expectedResult: Product = { ...productMock, ...newValues };

      expect(restul).toEqual(expectedResult);
    });
  });

  describe("deleteProduct()", function () {
    it("method should be defined", function () {
      expect(store.deleteProduct).toBeDefined();
    });

    it("should remove a single product", async function () {
      await store.deleteProduct(idMock);

      const result: Product[] = await store.getAllProducts();
      const expectedResult: Product[] = [];

      expect(result).toEqual(expectedResult);
    });
  });
});
