// packages
import { v4 as uuid } from "uuid";
// internals
import usePoolConnection from "../utils/use-pool-connection";
import { generateUpdateSqlQuery } from "../utils/generators";
// types
import type { Product, ProductTestParams, ProductWithoutDbInserts } from "../types";

class ProductStore {
  /**
   * @description Method used to query a list of all the products
   *
   * @returns A list of all products data
   */
  public async getAllProducts(): Promise<Product[]> {
    try {
      const sql = "SELECT * FROM products";

      return await usePoolConnection<Product>(sql);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Could not get products. Error: ${error.message}`);
      } else {
        throw new Error(`Could not get products. Error: ${error}`);
      }
    }
  }

  /**
   * @description Method used to query a single product based on it's `ID`
   *
   * @param productId The `ID` of the product to be queried
   * @returns Data of the product with the `ID` specified
   */
  public async getProductById(productId: string): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1)";

      const [result]: Product[] = await usePoolConnection<Product>(sql, [productId]);

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Could not get product. Error: ${error.message}`);
      } else {
        throw new Error(`Could not get product. Error: ${error}`);
      }
    }
  }

  /**
   * @description Method used to add a new product to the DB
   *
   * @param p New product data object
   * @param testParams Custom params used for testing purposes
   * @returns The new created product data
   */
  public async saveProduct(
    p: ProductWithoutDbInserts,
    testParams?: ProductTestParams
  ): Promise<Product> {
    try {
      const id = testParams?.id || uuid();
      const sql =
        "INSERT INTO products (id, name, description, price, stock, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *";

      const [result]: Product[] = await usePoolConnection<Product>(sql, [
        id,
        p.name,
        p.description,
        p.price,
        p.stock,
        testParams?.created_at || Date.now() /** created_at */,
        testParams?.updated_at || Date.now() /** updated_at */,
      ]);

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Could not create product. Error: ${error.message}`);
      } else {
        throw new Error(`Could not create product. Error: ${error}`);
      }
    }
  }

  /**
   * @description Method for updating an existent product based on it's `ID`
   *
   * @param productId The `ID` of the product to be updated
   * @param data Data object containing the values to be updated
   * @returns The updated product data
   */
  public async updateProduct(
    productId: string,
    data: Partial<ProductWithoutDbInserts>
  ): Promise<Product> {
    try {
      const { sql, params } = generateUpdateSqlQuery({
        tablename: "products",
        condition: productId,
        rawData: data,
      });

      const [result]: Product[] = await usePoolConnection<Product>(sql, params);

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Could not update product. Error: ${error.message}`);
      } else {
        throw new Error(`Could not update product. Error: ${error}`);
      }
    }
  }

  /**
   * @description Method used to delete an existing product based on it's `ID`
   *
   * @param productId The `ID` of the product to be deleted
   */
  public async deleteProduct(productId: string): Promise<void> {
    try {
      const sql = "DELETE FROM products WHERE id=($1)";

      await usePoolConnection<Product>(sql, [productId]);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Could not delete product. Error: ${error.message}`);
      } else {
        throw new Error(`Could not delete product. Error: ${error}`);
      }
    }
  }
}

export const store = new ProductStore();
