export interface Product {
  readonly id: string;
  name: string;
  description: string;
  price: number | string;
  stock: number;
  readonly created_at: number | string;
  updated_at: number | string;
}

export type ProductWithoutDbInserts = Omit<Product, "id" | "created_at" | "updated_at">;

export type ProductTestParams = Pick<Product, "id" | "created_at" | "updated_at">;
