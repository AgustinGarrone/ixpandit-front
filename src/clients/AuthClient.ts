"use client";

import {
  type AuthJSendResponse,
  type AuthResponses,
  type AuthUserData,
  type LoginMutationData,
  type RegisterMutationData,
} from "@/shared/types/api/auth.types";
import { type JSendSuccess } from "@/shared/types/api/jsend.types";

import RESTClient from "./RESTClient";

class AuthClient extends RESTClient {
  private mapAuthResponse = (response: JSendSuccess<AuthUserData>): AuthResponses => ({
    user: {
      id: response.data.id,
      username: response.data.username,
      email: response.data.email,
      token: response.data.token,
      initialPokemons: response.data.initialPokemons,
    },
    message: response.message,
  });

  async login(data: LoginMutationData): Promise<AuthResponses> {
    const response = await this.post<AuthJSendResponse>("auth/login", data);
    return this.mapAuthResponse(response);
  }

  async register(data: RegisterMutationData): Promise<AuthResponses> {
    const response = await this.post<AuthJSendResponse>("auth/register", data);
    return this.mapAuthResponse(response);
  }

  async setInitialPokemonsTrue(): Promise<boolean> {
    const response = await this.post<JSendSuccess<boolean>>("auth/setInitial");
    return response.data;
  }
}

const authClient = new AuthClient();

export default authClient;
