import { PhotoPresenter } from "./photo";
import { ErrorResponse } from "./utils";

export type OrderPresenter = {
  order: string;
  total: string;
  photos: PhotoPresenter[];
  purchase_types: string[];
  date: number;
  stripe_id: string;
};

export type OrderResponse = {
  user: string;
  orders: OrderPresenter[];
};

export type OrderIndex = OrderResponse | ErrorResponse;
export type OrderCreate = OrderResponse | ErrorResponse;
export type OrderShow = OrderResponse | ErrorResponse;

export type Order = OrderPresenter;
