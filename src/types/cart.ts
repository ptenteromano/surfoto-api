import { Photo } from './photo';

export interface PaymentIntent {
  id: string;
  paymentIntent: string;
  ephemeralKey: string;
  customer: string;
}

export interface CartWithPaymentIntent {
  photos: Photo[];
  total: number;
  payment_intent: PaymentIntent;
}
