// packages
import { Router } from "express";
// internals
import authRouter from "./routes/auth-router";
import usersRouter from "./routes/users-router";
import productsRouter from "./routes/products-router";

const api = Router();

api.use("/", authRouter);
api.use("/users", usersRouter);
api.use("/products", productsRouter);

export default api;
