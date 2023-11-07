import { type RequestInit } from "node-fetch";

const ORIGIN =
  typeof process === "undefined"
    ? "http://localhost:3000"
    : process.env.ORIGIN || "http://localhost:3000";

// GET with no token
export const getUnauth = () => {
  return {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
};

export const getJson = (token: string): RequestInit => {
  return {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      origin: ORIGIN,
    },
  };
};

// {user: body, token_only: true}
export const postNoTok = (body: any) => {
  return {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      origin: ORIGIN,
    },
    body: JSON.stringify(body),
  };
};

// JSON for 'post' routes
export const postJson = (token: string, body: any) => {
  return {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      origin: ORIGIN,
    },
    body: JSON.stringify(body),
  };
};

// POST with file / media. must have formData
export const postFile = (
  token: string | null,
  formData: FormData
): RequestInit => {
  return {
    method: "post",
    headers: {
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
      origin: ORIGIN,
    },
    body: JSON.stringify(formData),
  };
};

// JSON for 'delete' routes
export const deleteJson = (token: string, body: Object) => {
  return {
    method: "delete",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      origin: ORIGIN,
    },
    body: JSON.stringify(body),
  };
};

// JSON for 'patch' routes with no auth jwt token
export const patchJsonNoTok = (body: Object) => {
  return {
    method: "patch",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
};

export const patchJson = (token: string, body: Object) => {
  return {
    method: "patch",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      origin: ORIGIN,
    },
    body: JSON.stringify(body),
  };
};
