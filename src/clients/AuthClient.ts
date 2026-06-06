"use client";
import { env } from "@/config/env";
import {
  type AuthResponses,
  type LoginMutationData,
  type RegisterMutationData,
} from "@/shared/types/api/auth.types";

import RESTClient from "./RESTClient";

class AuthClient extends RESTClient {
  private allowedDomain: string | undefined;

  constructor() {
    super();
    this.allowedDomain = env.apiUrl;
  }

  async login(data: LoginMutationData): Promise<AuthResponses> {
    const response = await this.post<AuthResponses>(`auth/login`, data);
    return {
      user: response.user,
      status: response.status,
      message: response.message,
    };
  }

  async register(data: RegisterMutationData): Promise<AuthResponses> {
    const response = await this.post<AuthResponses>("auth/register", data);
    return {
      user: response.user,
      status: response.status,
      message: response.message,
    };
  }

  async setInitialPokemonsTrue(): Promise<boolean> {
    const response = await this.post<boolean>("auth/setInitial");
    return response;
  }
}

const authClient = new AuthClient();

export default authClient;
