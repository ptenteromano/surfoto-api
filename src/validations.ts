// Usernames cannot start with numbers range 3-25 inclusive
// Passwords need at least a capital & lower letters and numbers
const REGEX_MAP = {
  EMAIL:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  ZIP_CODE: /^([0-9]{5})\s*$/,
  NUMBER: /^\d+(\.\d{1,2})?$/,
  USERNAME: /^[a-zA-Z]([a-zA-z]|[0-9]){3,24}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#~`_\-.+$%^&*=])(?=.{6,})/,
};

// Return true when they MATCH = meaning VALID!
export const validUsername = (username: string) => {
  if (typeof username !== "string" || username.length < 3) {
    return false;
  }

  return REGEX_MAP.USERNAME.test(username.toLowerCase());
};

export const validEmail = (email: string) => {
  if (typeof email !== "string" || email.length < 4) {
    return false;
  }

  return REGEX_MAP.EMAIL.test(email.toLowerCase());
};

// Do not lower case passwords on validation
export const validPassword = (password: string) => {
  if (typeof password !== "string" || password.length < 6) {
    return false;
  }

  return REGEX_MAP.PASSWORD.test(password);
};

// NaN and 'NaN' are not >= 1
export const validPrice = (price: string | number) => {
  try {
    const normalizedPrice = Number((+(price || 0)).toFixed(2));
    return normalizedPrice >= 1.0 && normalizedPrice <= 300.0;
  } catch {
    return false;
  }
};

type ValidationError = string | null;

export function emailValidationMsg(email: string): ValidationError {
  if (validEmail(email)) return null;

  if (typeof email !== "string" || email.length < 3) {
    return "emails must be at least 3 characters long";
  }

  return "email must be valid";
}

export function passwordValidationMsg(password: string): ValidationError {
  if (validPassword(password)) return null;

  if (typeof password !== "string" || password.length < 6) {
    return "passwords must be at least 6 characters long";
  }

  return "password must contain at least one capital letter, one lower case letter, and one number";
}

export function usernameValidationMsg(username: string): ValidationError {
  if (validUsername(username)) return null;

  if (typeof username !== "string" || username.length < 3) {
    return "usernames must be at least 4 characters long";
  }

  if (username.length > 25) {
    return "usernames cannot be longer than 25 characters";
  }

  return "usernames cannot start with a number or special character";
}
