// internals
import { store } from "../../models/product";
// types
import type { Request, Response } from "express";
import type { ProductWithoutDbInserts } from "../../types/db-schema";

class ProductsController {
  async showAll(_req: Request, res: Response): Promise<void> {
    const products = await store.getAllProducts();

    res.status(200).json(products);
  }

  async show(req: Request, res: Response): Promise<void> {
    const productId: string = req.params.id;

    const result = await store.getProductById(productId);

    res.status(200).json(result);
  }

  async create(req: Request, res: Response): Promise<void> {
    const newProduct: ProductWithoutDbInserts = req.body;

    const result = await store.createProduct(newProduct);

    res.status(201).json(result);
  }

  async update(req: Request, res: Response): Promise<void> {
    const productId: string = req.params.id;
    const newProductValues: ProductWithoutDbInserts = req.body;

    const result = await store.updateProduct(productId, newProductValues);

    res.status(200).json(result);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const productId: string = req.params.id;

    await store.deleteProduct(productId);

    res.status(200).json({ deleted: true });
  }
}

export default new ProductsController();
