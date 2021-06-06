// packages
import { Router } from "express";
// internals
import ordersController from "../controllers/orders-controller";
import useAsync from "../middleware/use-async";
import { isAdmin, isAuth, isOrderOpen } from "../middleware/authorization";

const orders = Router();

orders.get("/", isAdmin, useAsync(ordersController.showAll));
orders.get("/:id", isAuth, useAsync(ordersController.show));
orders.get("/:id/products", isAuth, useAsync(ordersController.showComplete));
orders.post("/", isAuth, useAsync(ordersController.create));
orders.post("/:id/products", isOrderOpen, useAsync(ordersController.insert));

export default orders;
