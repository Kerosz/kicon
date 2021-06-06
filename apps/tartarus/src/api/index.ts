// packages
import { Router } from "express";
// internals
import authRouter from "./routes/auth-router";
import usersRouter from "./routes/users-router";
import productsRouter from "./routes/products-router";
import ordersRouter from "./routes/orders-router";

const api = Router();

api.use("/", authRouter);
api.use("/users", usersRouter);
api.use("/products", productsRouter);
api.use("/orders", ordersRouter);

export default api;
