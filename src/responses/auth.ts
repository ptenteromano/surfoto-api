import { ErrorResponse } from "./utils";

// These are a little different because the function needs to parse
// the token and status out and return them all together in a hash.
export type SignupResponse =
  | {
      user: string;
      email: string;
      username: string;
      message: string;
      token: string;
      status: number;
    }
  | ErrorResponse;

export type LoginResponse =
  | {
      status: number;
      user: string;
      token: string;
    }
  | ErrorResponse;

// token: string;
