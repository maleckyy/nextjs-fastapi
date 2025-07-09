export type UserToken = {
  refresh_token: string;
  access_token: string;
  user_id: string;
  id: string;
  token_expires_time: number;
};

export type LoginOutput = {
  access_token: string;
  expire_datetime: string;
  token_expires_time: number
  user: UserToken;
  refreshToken: string
};

export type User = {
  username: string;
  email: string;
  id: string;
  created_at: string;
};

export type LoginFormType = {
  username: string;
  password: string
}

export type RegisterFormType = {
  username: string;
  email: string;
  password: string;
}

