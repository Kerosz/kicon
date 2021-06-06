// internals
import { store } from "../../models/product";
// types
import type { Request, Response } from "express";
import type { Product, ProductWithoutDbInserts } from "../../types";

class ProductsController {
  /**
   * @description It gets the products from storage and sends back a list of all products
   *
   * @param _req Express Request
   * @param res Express Response
   */
  public async showAll(_req: Request, res: Response): Promise<void> {
    const products: Product[] = await store.getAllProducts();

    res.status(200).json(products);
  }

  /**
   * @description It gets a specific product from storage and sends back the product
   *
   * @param req Express Request
   * @param res Express Response
   */
  public async show(req: Request, res: Response): Promise<void> {
    const productId: string = req.params.id;

    const product: Product = await store.getProductById(productId);

    res.status(200).json(product);
  }

  /**
   * @description It stores the newly created product in storage and sends back the product
   *
   * @param req Express request
   * @param res Express response
   */
  public async create(req: Request, res: Response): Promise<void> {
    const newProduct: ProductWithoutDbInserts = req.body;

    const result: Product = await store.saveProduct(newProduct);

    res.status(201).json(result);
  }

  /**
   * @description Updates a specific product from storage and sends back the updated product
   *
   * @param req Express Request
   * @param res Express Response
   */
  public async update(req: Request, res: Response): Promise<void> {
    const productId: string = req.params.id;
    const newProductValues: ProductWithoutDbInserts = req.body;

    const result: Product = await store.updateProduct(productId, newProductValues);

    res.status(200).json(result);
  }

  /**
   * @description Deletes a specific product from storage and sends back a confirmation object
   *
   * @param req Express Request
   * @param res Express Response
   */
  public async remove(req: Request, res: Response): Promise<void> {
    const productId: string = req.params.id;

    await store.deleteProduct(productId);

    res.status(200).json({ deleted: true });
  }

  /**
   * @description It gets a list of top products and sends back it's details
   *
   * @param req Express Request
   * @param res Express Response
   */
  public async showTop(req: Request, res: Response): Promise<void> {
    const queryLimit = req.query.limit as string;

    const result = await store.getTopProducts(queryLimit ? +queryLimit : undefined);

    res.status(200).json(result);
  }
}

export default new ProductsController();
