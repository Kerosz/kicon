// packages
import { Router } from "express";
// internals
import productsController from "../controllers/products-controller";
import useAsync from "../middleware/use-async";

const products = Router();

products.get("/", useAsync(productsController.showAll));
products.get("/:id", useAsync(productsController.show));
products.post("/", useAsync(productsController.create));
products.patch("/:id", useAsync(productsController.update));
products.delete("/:id", useAsync(productsController.remove));

export default products;
