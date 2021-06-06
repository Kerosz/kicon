export enum OrderStatus {
  pending = "pending",
  delivered = "delivered",
  processed = "processed",
}

export interface Order {
  id: string;
  user_id: string;
  shipping_address_id: string;
  billing_address_id: string;
  shipping_no: string;
  invoice_no: string;
  invoice_date: string;
  delivery_date: string;
  status: keyof typeof OrderStatus;
  total: number;
  total_discount: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

export interface OrderRequest {
  user_id: string;
  shipping_address_id: string;
  billing_address_id: string;
  total: number;
  total_discount: number;
  comment: string;
}

export type ProcessedOrder = Omit<Order, "id" | "created_at" | "updated_at">;

export interface OrderProduct {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number | string;
}

export type OrderProducRequest = Omit<OrderProduct, "id" | "order_id">;

export type ShippingDetails = Pick<Order, "shipping_no" | "delivery_date">;
