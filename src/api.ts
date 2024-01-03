import fetch, { type Response } from "node-fetch";
import * as T from "./types";
import * as H from "./headers";

export const WAVEBREAK_URL =
  typeof process === "undefined"
    ? "http://localhost:4000"
    : process.env.WAVEBREAK_URL || "http://localhost:4000";

// Grab token from headers
export const getTokenFromResp = (resp: Response): string | undefined => {
  return (resp.headers?.get("Authorization")?.split("Bearer ") || [])[1];
};

// Only return the token, status, and user uuid from the response
export async function login(
  formBody: T.EmailPassword
): Promise<T.LoginResponse> {
  const body: T.LoginPayload = { user: formBody, token_only: true };
  try {
    const resp = await fetch(
      `${WAVEBREAK_URL}/users/sign_in`,
      H.postNoTok(body)
    );
    const jsonData = await resp.json();

    if (jsonData.error) return { error: jsonData.error };

    const token = getTokenFromResp(resp); // Pull token from the original response
    return { ...jsonData, token, status: resp.status };
  } catch (error: any) {
    return { error: error.message };
  }
}

export const signup = async (
  formBody: T.SignupPayload
): Promise<T.SignupResponse> => {
  try {
    const resp = await fetch(
      `${WAVEBREAK_URL}/users/sign_up`,
      H.postNoTok(formBody)
    );
    const jsonData = await resp.json();
    if (jsonData.error) return { error: jsonData.error };

    const token = getTokenFromResp(resp); // Pull token from the original response

    return { ...jsonData, token, status: resp.status };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const logout = async (token: string): Promise<boolean> => {
  try {
    const resp = await fetch(
      `${WAVEBREAK_URL}/users/sign_out`,
      H.deleteJson(token, {})
    );
    return resp.status === 200;
  } catch (error: any) {
    return false;
  }
};

export async function ensureAuth(token: string): Promise<boolean> {
  try {
    const resp = await fetch(`${WAVEBREAK_URL}/valid_token`, H.getJson(token));
    const jsonData = await resp.json();
    if (jsonData.error) return false;
    return resp.ok;
  } catch (error: any) {
    return false;
  }
}

export async function confirmAccount(confToken: string): Promise<string> {
  try {
    const resp = await fetch(
      `${WAVEBREAK_URL}/users/confirmation?confirmation_token=${confToken}`,
      H.getUnauth()
    );
    const jsonData = await resp.json();
    if (jsonData.error) return jsonData.error;
    return jsonData.success;
  } catch (error: any) {
    return error.message;
  }
}

// Request a password reset
export async function requestResetPassword(email: string): Promise<string> {
  try {
    const resp = await fetch(
      `${WAVEBREAK_URL}/users/password`,
      H.postNoTok({ email })
    );
    const jsonData = await resp.json();
    if (jsonData.success) return "Please check your email for a reset link";
    return (
      jsonData.error ||
      "Something went wrong, please make sure your email is correct"
    );
  } catch (error: any) {
    return error.message;
  }
}

// Actually Reset the password
export async function resetPassword(
  resetToken: string,
  password: string
): Promise<T.ProfileShow> {
  const body = {
    reset_password_token: resetToken,
    password,
    password_confirmation: password,
  };

  try {
    const resp = await fetch(
      `${WAVEBREAK_URL}/users/password`,
      H.patchJsonNoTok(body)
    );
    const jsonData = await resp.json();
    if (jsonData.error) return { error: jsonData.error };
    // This returns the entire profile, but we don't really need it upfront
    return { ...jsonData, token: getTokenFromResp(resp) };
  } catch (error: any) {
    return error.message;
  }
}

export async function fetchPhotos(
  page: string | number
): Promise<T.PhotosIndex> {
  try {
    const resp = await fetch(
      `${WAVEBREAK_URL}/photos/index/${page}?limit=15`,
      H.getUnauth()
    );
    return await resp.json();
  } catch (error: any) {
    return { error: error.message };
  }
}

// id is uuid here
export async function fetchPhotoById(
  token: string,
  id: string
): Promise<T.PhotoShow> {
  try {
    const resp = await fetch(`${WAVEBREAK_URL}/photos/${id}`, H.getJson(token));
    return await resp.json();
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function createPhoto(
  token: string,
  formData: FormData
): Promise<T.PhotoCreate> {
  try {
    const resp = await fetch(
      `${WAVEBREAK_URL}/photos`,
      H.postFile(token, formData)
    );
    return await resp.json();
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function bulkCreatePhotos(
  token: string,
  formData: FormData
): Promise<T.PhotosBulkCreate> {
  try {
    const resp = await fetch(
      `${WAVEBREAK_URL}/photos/bulk`,
      H.postFile(token, formData)
    );
    return await resp.json();
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function cartItems(token: string): Promise<T.CartIndex> {
  try {
    const resp = await fetch(`${WAVEBREAK_URL}/cart`, H.getJson(token));
    return await resp.json();
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function cartItemsWithIntent(
  token: string
): Promise<T.CartWithPaymentIntent> {
  try {
    const resp = await fetch(
      `${WAVEBREAK_URL}/cart/with_payment_intent`,
      H.postJson(token, {})
    );
    return await resp.json();
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function addCartItem(
  token: string,
  photo_uuid: string
): Promise<T.CartCreate> {
  try {
    const resp = await fetch(
      `${WAVEBREAK_URL}/cart`,
      H.postJson(token, { photo_uuid })
    );
    return await resp.json();
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateCartItem(
  token: string,
  photo_uuid: string,
  status: "pending" | "purchased" | "removed"
): Promise<T.CartUpdate> {
  try {
    const resp = await fetch(
      `${WAVEBREAK_URL}/cart`,
      H.patchJson(token, { photo_uuid, status })
    );
    return await resp.json();
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function inCart(
  token: string,
  pid: string
): Promise<T.CartItemInCart> {
  try {
    const resp = await fetch(
      `${WAVEBREAK_URL}/cart/in_cart/${pid}`,
      H.getJson(token)
    );
    return await resp.json();
  } catch (error: any) {
    return { error: error.message };
  }
}

export const createPaymentIntent = async (
  token: string,
  amount = 0
): Promise<T.PaymentIntentCreate> => {
  try {
    const resp = await fetch(
      `${WAVEBREAK_URL}/payment_intent`,
      H.postJson(token, { amount })
    );
    return await resp.json();
  } catch (error: any) {
    return { error: error.message };
  }
};

export const completeOrder = async (
  token: string,
  payment_id: string
): Promise<T.OrderCreate> => {
  try {
    const resp = await fetch(
      `${WAVEBREAK_URL}/orders/v2`,
      H.postJson(token, { payment_id })
    );
    return await resp.json();
  } catch (error: any) {
    return { error: error.message };
  }
};

export const fetchFullProfile = async (
  token: string
): Promise<T.ProfileShow> => {
  try {
    const resp = await fetch(`${WAVEBREAK_URL}/profile`, H.getJson(token));

    return await resp.json();
  } catch (error: any) {
    return { error: error.message };
  }
};

export const publicProfile = async (
  token: string,
  username: string
): Promise<T.ProfileShowPublic> => {
  try {
    const resp = await fetch(
      `${WAVEBREAK_URL}/api/v1/profile/${username}`,
      H.getJson(token)
    );

    return await resp.json();
  } catch (error: any) {
    return { error: error.message };
  }
};

export const dumperIndex = async (token: string): Promise<T.DumperIndex> => {
  try {
    const resp = await fetch(`${WAVEBREAK_URL}/dumper`, H.getJson(token));

    return await resp.json();
  } catch (error: any) {
    return { error: error.message };
  }
};

export const dumperUsers = async (token: string): Promise<T.DumperUsers> => {
  try {
    const resp = await fetch(`${WAVEBREAK_URL}/dumper/users`, H.getJson(token));

    return await resp.json();
  } catch (error: any) {
    return { error: error.message };
  }
};

export const dumperPhotos = async (token: string): Promise<T.DumperPhotos> => {
  try {
    const resp = await fetch(
      `${WAVEBREAK_URL}/dumper/photos`,
      H.getJson(token)
    );

    return await resp.json();
  } catch (error: any) {
    return { error: error.message };
  }
};

export const dumperOrders = async (token: string): Promise<T.DumperOrders> => {
  try {
    const resp = await fetch(
      `${WAVEBREAK_URL}/dumper/orders`,
      H.getJson(token)
    );

    return await resp.json();
  } catch (error: any) {
    return { error: error.message };
  }
};

export const dumperLocations = async (
  token: string
): Promise<T.DumperLocations> => {
  try {
    const resp = await fetch(
      `${WAVEBREAK_URL}/dumper/locations`,
      H.getJson(token)
    );

    return await resp.json();
  } catch (error: any) {
    return { error: error.message };
  }
};

export const dumperCartItems = async (
  token: string
): Promise<T.DumperCartItems> => {
  try {
    const resp = await fetch(
      `${WAVEBREAK_URL}/dumper/cart_items`,
      H.getJson(token)
    );

    return await resp.json();
  } catch (error: any) {
    return { error: error.message };
  }
};
