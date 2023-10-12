import { ErrorResponse } from "./utils";

export type LocationPresenter = {
  placeId: string;
  address: string;
  name: string;
  latitude: number | string;
  longitude: number | string;
};

export type LocationExists = { placeId: string } | ErrorResponse;
export type LocationCreate = LocationPresenter | ErrorResponse;

export type Location = LocationPresenter;
export type LocationFull = LocationPresenter & {
  vicinity?: string;
  description?: string;
};
