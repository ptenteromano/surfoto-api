import { ErrorResponse } from "./utils";

export type UserBasics = { user: string; email: string; username: string };
export type UserShow = UserBasics | ErrorResponse;
export type UserEdit = UserBasics | ErrorResponse;
export type UserUpdateLocation =
  | { user: string; location: string }
  | ErrorResponse;
export type UserDelete = { user: string; deleted: boolean } | ErrorResponse;

export type User = UserBasics;
