"use client";

import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

import { env } from "@/config/env";

import { getAuthFromCache } from "./auth";

export type RESTClientOptions = {
  baseURL?: string;
  timeout?: number;
  headers?: AxiosRequestConfig["headers"];
};

export default class RESTClient {
  protected readonly client: AxiosInstance;
  protected readonly baseURL: string;

  constructor(options: RESTClientOptions = {}) {
    this.baseURL = options.baseURL ?? env.apiUrl;

    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: options.timeout ?? 15_000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
      },
    });

    this.setupInterceptors();
  }

  protected setupInterceptors(): void {
    this.client.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        if (config.withAuth) {
          const token = await getAuthFromCache();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }

        return config;
      },
      (error: AxiosError) => Promise.reject(error),
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => Promise.reject(error),
    );
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await this.client.get<T>(url, config);
    return data;
  }

  protected async post<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await this.client.post<T>(url, body, config);
    return data;
  }

  protected async put<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await this.client.put<T>(url, body, config);
    return data;
  }

  protected async patch<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await this.client.patch<T>(url, body, config);
    return data;
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await this.client.delete<T>(url, config);
    return data;
  }
}

export const apiClient = new RESTClient();
