import { PhotoPresenter, PhotosByLocation } from "./photo";
import { ErrorResponse } from "./utils";

export type UserPhotos = {
  photos: PhotosByLocation[];
  totalOwned: number;
  numSold: number;
  allPhotoUuids: string[];
};

export type ProfilePresenter = {
  user: string;
  email: string;
  username: string;
  avatarUrl: string | null;
  location: string | null;
  purchasedPhotos: PhotoPresenter[];
  balance: number;
} & UserPhotos;

export type ProfileShow = ProfilePresenter | ErrorResponse;
export type ProfilePhotos = ({ user: string } & UserPhotos) | ErrorResponse;
export type ProfilePurchasedPhotos =
  | {
      user: string;
      purchasedPhotos: PhotoPresenter[];
      allPhotoUuids: string[];
    }
  | ErrorResponse;
export type ProfileBalance =
  | { user: string; balance: number; numSold: number }
  | ErrorResponse;

export type Profile = ProfilePresenter;
