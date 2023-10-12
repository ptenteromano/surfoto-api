import { type Photo, type PhotosByLocation } from "./photo";

export interface BasicDetails {
  user: string;
  email: string;
  username: string;
}

export interface UpdatedProfile extends BasicDetails {
  avatarUrl: string;
}

export interface UpdateLocation {
  user: string;
  location: string;
}

export interface Profile extends BasicDetails {
  avatarUrl?: string;
  location?: string;
  purchasedPhotos: Photo[];
  balance: number;
  photos: PhotosByLocation[];
  totalOwned: number;
  numSold: number;
  allPhotoUuids: string[];
}

export interface UserPhotos {
  user: string;
  purchasedPhotos: Photo[];
  allPhotoUuids: string[];
}
