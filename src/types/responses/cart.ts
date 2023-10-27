import { PhotoPresenter } from "./photo";
import { ErrorResponse } from "./utils";
import { PaymentIntent } from "./payments";

export type CartBasics = { photos: PhotoPresenter[]; total: number, fee: number };

export type CartIndex = CartBasics | ErrorResponse;
export type CartWithPaymentIntent = (CartIndex & PaymentIntent) | ErrorResponse;
export type CartCreate = { cart_item_uuid: string } | ErrorResponse;
export type CartUpdate = { success: boolean } | ErrorResponse;
export type CartItemInCart = { in_cart: boolean } | ErrorResponse;

export type Cart = CartBasics;
