import { PhotoPresenter } from "./photo";
import { ErrorResponse } from "./utils";

export type CartBasics = { photos: PhotoPresenter[]; total: string };

export type CartIndex = CartBasics | ErrorResponse;
export type CartWithPaymentIntent = CartIndex & { payment_intent: string } | ErrorResponse;
export type CartCreate = { cart_item_uuid: string } | ErrorResponse;
export type CartUpdate = { success: boolean } | ErrorResponse;
export type CartItemInCart = { in_cart: boolean } | ErrorResponse;

export type Cart = CartBasics;
