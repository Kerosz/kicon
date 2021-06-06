// internals
import OrderService from "../../services/order";
import { store } from "../../models/order";
// types
import type { Request, Response } from "express";
import type { Order, OrderProducRequest, OrderProduct, OrderRequest } from "../../types";

class OrdersController {
  /**
   * @description It gets the orders from storage and sends back a list of all orders details
   *
   * @param _req Express Request
   * @param res Express Response
   */
  public async showAll(_req: Request, res: Response): Promise<void> {
    const orders: Order[] = await store.getAllOrders();

    res.status(200).json(orders);
  }

  /**
   * @description It gets the orders of a specific user from storage and sends back a list of all orders details
   *
   * @param req Express Request
   * @param res Express Response
   */
  public async showAllByUser(req: Request, res: Response): Promise<void> {
    const userId: string = req.params.id;

    const orders: Order[] = await store.getOrdersByUserId(userId);

    res.status(200).json(orders);
  }

  /**
   * @description It gets a specific order from storage and sends back the order details
   *
   * @param req Express Request
   * @param res Express Response
   */
  public async show(req: Request, res: Response): Promise<void> {
    const orderStatus: string = req.query.status as string;
    const orderId: string = req.params.id;

    const order: Order = await store.getOrderById(orderId, orderStatus);

    if (!order) {
      throw new Error("Order cannot be found!");
    }

    res.status(200).json(order);
  }

  /**
   * @description It gets a specific order with product details from storage and sends back the order details
   *
   * @param req Express Request
   * @param res Express Response
   */
  public async showComplete(req: Request, res: Response): Promise<void> {
    const orderId: string = req.params.id;

    const order: Order[] = await store.getOrderWithProducts(orderId);

    res.status(200).json(order);
  }

  /**
   * @description It stores the newly created order in storage and sends back the order details
   *
   * @param req Express request
   * @param res Express response
   */
  public async create(req: Request, res: Response): Promise<void> {
    const newOrder: OrderRequest = req.body;
    const orderInstance: OrderService = new OrderService();

    const order = await orderInstance.processOrder(newOrder);

    res.status(201).json(order);
  }

  /**
   * @description It stores the newly added product in storage and sends back the newly updated order details
   *
   * @param req Express request
   * @param res Express response
   */
  public async insert(req: Request, res: Response): Promise<void> {
    const orderId: string = req.params.id;
    const newProductValues: OrderProducRequest = req.body;
    const orderInstance: OrderService = new OrderService();

    const orderProduct: OrderProduct = await orderInstance.addProduct(orderId, newProductValues);

    res.status(200).json(orderProduct);
  }
}

export default new OrdersController();
