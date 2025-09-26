export interface SignInPayloadAuth {
  email: string;
  password: string;
}

export interface ResponceAuth {
  token?: string;
  twoFa: boolean;
}
