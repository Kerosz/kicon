// packages
import { v4 as uuid } from "uuid";
// internals
import usePoolConnection from "../utils/use-pool-connection";
// types
import type { Order, OrderProducRequest, OrderProduct, ProcessedOrder } from "../types";
import { CompleteOrder } from "../types";

class OrderModel {
  /**
   * @description Method used to query a list of all orders
   *
   * @returns A list of all orders data
   */
  public async getAllOrders(): Promise<Order[]> {
    try {
      const sql = "SELECT * FROM orders";

      return await usePoolConnection<Order>(sql);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Could not get orders. Error: ${error.message}`);
      } else {
        throw new Error(String(error));
      }
    }
  }

  /**
   * @description Method used to query an order by it's `id`
   *
   * @param orderId Order id to be queried by
   * @param orderStatus The order status to be queried by
   * @returns The order data object
   */
  public async getOrderById(orderId: string, orderStatus = "delivered"): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE id = ($1) AND status = ($2)";

      const [result]: Order[] = await usePoolConnection<Order>(sql, [orderId, orderStatus]);

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Could not get order. Error: ${error.message}`);
      } else {
        throw new Error(String(error));
      }
    }
  }

  /**
   * @description Method used to query an order by it's `id`
   *
   * @param orderId Order id to be queried by
   * @returns The order data object
   */
  public async getOrderWithProducts(orderId: string): Promise<CompleteOrder[]> {
    try {
      const sql =
        "SELECT o.shipping_address_id, o.billing_address_id, o.shipping_no, " +
        "o.delivery_date, o.status, o.total, o.total_discount, o.comment, op.quantity, " +
        "op.price AS product_total_price, p.id AS product_id, p.name, p.description FROM orders AS o " +
        "INNER JOIN order_products AS op ON o.id = op.order_id " +
        "INNER JOIN products AS p ON p.id = op.product_id WHERE op.order_id = ($1)";

      return await usePoolConnection<CompleteOrder>(sql, [orderId]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Could not get order. Error: ${error.message}`);
      } else {
        throw new Error(String(error));
      }
    }
  }

  /**
   * @description Method used to query an order by it's `userId`
   *
   * @param userId User id of the order to be queried by
   * @returns The order data object
   */
  public async getOrdersByUserId(userId: string): Promise<Order[]> {
    try {
      const sql = "SELECT * FROM orders WHERE user_id = ($1)";

      return await usePoolConnection<Order>(sql, [userId]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Could not get order. Error: ${error.message}`);
      } else {
        throw new Error(String(error));
      }
    }
  }

  /**
   * @description Method used insert a new product into an existing order
   *
   * @param orderId Order id to be queried by
   * @param p The new product data
   * @returns The order data object
   */
  public async saveProductToOrder(orderId: string, p: OrderProducRequest): Promise<OrderProduct> {
    try {
      const id = uuid();
      const sql = "INSERT INTO order_products VALUES($1, $2, $3, $4, $5) RETURNING *";

      const [result]: OrderProduct[] = await usePoolConnection<OrderProduct>(sql, [
        id,
        orderId,
        p.product_id,
        p.quantity,
        p.price,
      ]);

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Could not get order. Error: ${error.message}`);
      } else {
        throw new Error(String(error));
      }
    }
  }

  /**
   * @description Method used to save a new order to storage
   *
   * @param o Order data to be saved
   * @returns The newly created order data object
   */
  public async saveOrder(o: ProcessedOrder): Promise<Order> {
    try {
      const id = uuid();
      const sql =
        "INSERT INTO orders VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *";

      const [result]: Order[] = await usePoolConnection<Order>(sql, [
        id,
        o.user_id,
        o.shipping_address_id,
        o.billing_address_id,
        o.shipping_no,
        o.invoice_no,
        o.invoice_date,
        o.delivery_date,
        o.status,
        o.total,
        o.total_discount,
        o.comment,
        Date.now().toString() /** created_at */,
        Date.now().toString() /** created_at */,
      ]);

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Could not get order. Error: ${error.message}`);
      } else {
        throw new Error(String(error));
      }
    }
  }

  /**
   * @description Method used delete a product from an existing order
   *
   * @param orderId The order id for the product to be removed from
   * @param productId Product id to be removed from the order
   * @returns The order data object
   */
  public async deleteProductFromOrder(orderId: string, productId: string): Promise<void> {
    try {
      const sql = "DELETE FROM order_products WHERE order_id = ($1) AND product_id = ($2)";

      await usePoolConnection<OrderProduct>(sql, [orderId, productId]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Could not delete product from order. Error: ${error.message}`);
      } else {
        throw new Error(String(error));
      }
    }
  }
}

export const store = new OrderModel();
