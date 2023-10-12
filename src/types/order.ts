import type { Photo } from "./photo";

export interface OrdersResponse {
  user: string;
  orders: Order[];
}

export interface OrderResponse {
  user: string;
  order: Order;
}

export interface Order {
  order: string;
  total: number;
  photos: Photo[];
  date: number;
  stripe_id: string;
  purchase_types?: string[];
}
