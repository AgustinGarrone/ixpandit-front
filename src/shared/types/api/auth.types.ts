import { type JSendSuccess } from "./jsend.types";
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
  id: string;
  initialPokemons: boolean;
  iat: number;
  exp: number;
};

export type AuthUserData = {
  id: string;
  username: string;
  email: string;
  token: string;
  initialPokemons: boolean;
};

export type AuthResponses = {
  user: UserWithToken;
  message: string;
};

export type AuthJSendResponse = JSendSuccess<AuthUserData>;
