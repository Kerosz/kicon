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
  total: string;
  total_discount: string;
  comment: string;
  created_at: string;
  updated_at: string;
}

export interface OrderRequest {
  user_id: string;
  shipping_address_id: string;
  billing_address_id: string;
  total: string;
  total_discount: string;
  comment: string;
}

export type ProcessedOrder = Omit<Order, "id" | "created_at" | "updated_at">;

export interface OrderProduct {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: string | number;
}

export interface CompleteOrder {
  product_id: string;
  shipping_address_id: string;
  billing_address_id: string;
  shipping_no: string;
  delivery_date: string;
  total: string;
  total_discount: string;
  comment: string;
  product_total_price: string;
  quantity: number;
  name: string;
  description: string;
}

export type OrderProducRequest = Omit<OrderProduct, "id" | "order_id">;

export type ShippingDetails = Pick<Order, "shipping_no" | "delivery_date">;
