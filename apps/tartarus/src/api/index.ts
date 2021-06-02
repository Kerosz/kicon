// packages
import { Router } from "express";
// internals
import authRouter from "./routes/auth-router";
import productsRouter from "./routes/products-router";
// types
import type { Response, Request } from "express";

const api = Router();

api.get("/", (_req: Request, res: Response): void => {
  res.send("api");
});

api.use("/", authRouter);
api.use("/products", productsRouter);

export default api;
