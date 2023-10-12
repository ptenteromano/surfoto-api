import type { Either } from "../utils";
import type { Photo, PhotosByLocation } from "../photo";
import type { Location } from "../location";
import type { OrderResponse } from "../order";
import type { PaymentIntent, CartWithPaymentIntent } from "../cart";

export type EmailPassword = {
  email: string;
  password: string;
};

export type LoginPayload = {
  user: {
    email: string;
    password: string;
  };
  token_only?: boolean;
};

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
  avatar?: File;
}

export type NoTokenBody = EmailPassword | { email: string };

// ------------------------------------
// JSON STRUCTURES
// ------------------------------------

export interface PhotosResponse {
  photos: Photo[];
}

export interface ProfileResponse {
  status: number;
  token: string;
  user: string;
  email: string;
  username: string;
  avatarUrl: string | null;
  location: Location | null;
  purchasedPhotos: Photo[];
  balance: number;
  photos: PhotosByLocation[];
  totalOwned: number;
  numSold: number;
  allPhotoUuids: string[];
}

export interface SignupResponse {
  status: number;
  token: string;
  user: string;
  email: string;
  username: string;
  message: string;
}

export interface LoginResponse {
  status: number;
  token: string;
  user: string;
}

export interface ErrorResponse {
  error: string;
  networkError?: true;
}

// ------------------------------------
// JSON RETURNED FROM CALLS
// ------------------------------------

export type LoginJson = Either<LoginResponse, ErrorResponse>;
export type SignupJson = Either<SignupResponse, ErrorResponse>;
export type PhotosJson = Either<PhotosResponse, ErrorResponse>;
export type PhotoJson = Either<Photo, ErrorResponse>;
export type ProfileJson = Either<ProfileResponse, ErrorResponse>;
export type InCartJson = Either<{ in_cart: boolean }, ErrorResponse>;
export type PaymentIntentJson = Either<PaymentIntent, ErrorResponse>;
export type CartWithPaymentIntentJson = Either<
  CartWithPaymentIntent,
  ErrorResponse
>;
export type OrderJson = Either<OrderResponse, ErrorResponse>;
