import { type HttpStatusCode } from "axios";

import { type UserWithToken } from "./models";

export type LoginMutationData = {
  email: string;
  password: string;
};

export type RegisterMutationData = {
  username: string;
  email: string;
  password: string;
};

export type DecodeTokenData = {
  username: string;
  id: number;
  initialPokemons: boolean;
  iat: number;
  exp: number;
};

export type AuthResponses = {
  user: UserWithToken;
  status: HttpStatusCode;
  message: string;
};
