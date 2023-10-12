import { ErrorResponse } from "./utils";

export type PaymentIntent = {
  id: string;
  paymentIntent: string;
  ephemeralKey: string;
  customer: string;
};

export type PaymentIntentCreate =
  | ({ user: string } & PaymentIntent)
  | ErrorResponse;
export type PaymentIntentCancel = { cancelled: boolean } | ErrorResponse;
export type VenmoWithdrawal = { user: string } | ErrorResponse;
