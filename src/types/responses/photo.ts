import { LocationPresenter } from "./location";
import { ErrorResponse } from "./utils";

export type PhotoPresenter = {
  pid: string;
  owner: string;
  username: string;
  url: string;
  imageSize: number;
  price: number;
  description: string;
  dateTaken: number;
  purchase_type?: string; // TODO: this should be camelCase
  location: LocationPresenter;
};

// Used in profile photos
export type PhotosByLocation = {
  [key: string]: Photo[];
};

export type PhotosIndex =
  | {
      total: number;
      photos: PhotoPresenter[];
      nextPage: number | null;
    }
  | ErrorResponse;

export type PhotosNearby = PhotosIndex;
export type PhotoCreate = PhotoPresenter | ErrorResponse;
export type PhotosBulkCreate = { message: string } | ErrorResponse;
export type PhotoShow = PhotoPresenter | ErrorResponse;
export type PhotosUserPhotos =
  | { user: string; photos: PhotoPresenter[] }
  | ErrorResponse;
export type PhotoEdit = { photo: string } | ErrorResponse; // TODO: this should be a photo
export type PhotoDelete = { photo: string; deleted: boolean } | ErrorResponse; // TODO: update this api

export type Photo = PhotoPresenter;
