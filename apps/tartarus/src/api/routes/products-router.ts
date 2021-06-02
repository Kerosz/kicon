// packages
import { Router } from "express";
// internals
import productsController from "../controllers/products-controller";
import useAsync from "../middleware/use-async";
import { isAdmin } from "../middleware/authorization";

const products = Router();

products.get("/", useAsync(productsController.showAll));
products.get("/:id", useAsync(productsController.show));
products.post("/", isAdmin, useAsync(productsController.create));
products.patch("/:id", isAdmin, useAsync(productsController.update));
products.delete("/:id", isAdmin, useAsync(productsController.remove));

export default products;
