export type LoginPayload = {
  user: {
    email: string;
    password: string;
  };
  token_only?: boolean;
};

export type SignupPayload = {
  username: string;
  email: string;
  password: string;
  avatar?: File;
};
