// packages
import { Router } from "express";
// internals
import productsController from "../controllers/products-controller";

const products = Router();

products.get("/", productsController.showAll);
products.get("/:id", productsController.show);
products.post("/", productsController.create);
products.patch("/:id", productsController.update);
products.delete("/:id", productsController.delete);

export default products;
