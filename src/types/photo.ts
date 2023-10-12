import { Location } from "./location";

export interface Photo {
  pid: string;
  owner: string;
  url: string;
  imageSize: number;
  price: number;
  description: string;
  dateTaken: number | string;
  location: Location;
}

export interface PhotosByLocation {
  [key: string]: Photo[];
}

export interface PaginatedPhotos {
  photos: Photo[];
  total: number;
  nextPage: number;
}

// Used in image cropper component
export interface ImageCropResponse {
  cancelled?: boolean;
  path?: string;
}

export type PhotoView = {
  pid: string;
  owner: string;
  url: string;
  imageSize: number;
  price: number;
  description: string;
  dateTaken: string;
  location: string;
};
