import { ErrorResponse } from "./utils";
import { PhotoPresenter } from "./photo";
import { LocationPresenter } from "./location";
import { OrderPresenter } from "./order";

export type DumperIndex =
  | {
      userCount: number;
      photoCount: number;
      orderCount: number;
      locationCount: number;
      cartItemCount: number;
    }
  | ErrorResponse;

type DumperUser = {
  id: string;
  uuid: string;
  email: string;
  username: string;
  avatarUrl: string;
  location: LocationPresenter;
  createdAt: number;
  updatedAt: number;
  photos: PhotoPresenter[];
  purchasedPhotos: PhotoPresenter[];
  numSold: number;
  orders: OrderPresenter;
  balance: number;
  signInCount: number;
  lastSignInAt: number;
  lastSignInIp: string;
  confirmed: boolean;
  confirmedAt: number;
  confirmationSentAt: number;
};

export type DumperUsers =
  | {
      users: DumperUser[];
    }
  | ErrorResponse;

export type DumperPhotos =
  | {
      photos: PhotoPresenter[];
    }
  | ErrorResponse;

export type DumperOrders =
  | {
      orders: OrderPresenter[];
    }
  | ErrorResponse;

export type DumperLocations =
  | {
      locations: LocationPresenter[];
    }
  | ErrorResponse;

export type DumperCartItems =
  | {
      cartItems: {
        id: string;
        uuid: string;
        userEmail: string;
        userId: number;
        photoId: number;
        photoUrl: string;
        status: string;
        createdAt: number;
        updatedAt: number;
      }[];
    }
  | ErrorResponse;
