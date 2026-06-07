import { isAxiosError } from "axios";

import { isJSendFailure, type JSendFailure, JSendStatus } from "@/shared/types/api/jsend.types";

const API_ERROR_MESSAGES: Record<string, string> = {
  USER_NOT_FOUND: "No encontramos una cuenta con ese email.",
  PASSWORD_INCORRECT: "Contraseña incorrecta.",
  EMAIL_ALREADY_EXISTS: "Ese email ya está registrado.",
  USERNAME_ALREADY_EXISTS: "Ese nombre de usuario ya está en uso.",
  "Username or email already registered":
    "Ese email o nombre de usuario ya está registrado. Probá con otros datos.",
  Internal_server_error: "Error interno del servidor.",
  "Internal server error": "Error interno del servidor.",
};

const resolveJSendMessage = (jsend: JSendFailure, fallback: string): string => {
  const { message } = jsend;

  if (API_ERROR_MESSAGES[message]) {
    return API_ERROR_MESSAGES[message];
  }

  if (message.trim()) {
    return message;
  }

  if (jsend.status === JSendStatus.ERROR) {
    return "Error del servidor. Intentá de nuevo más tarde.";
  }

  return fallback;
};

export class ApiRequestError extends Error {
  readonly httpStatus?: number;
  readonly jsend?: JSendFailure;

  constructor(message: string, options?: { httpStatus?: number; jsend?: JSendFailure }) {
    super(message);
    this.name = "ApiRequestError";
    this.httpStatus = options?.httpStatus;
    this.jsend = options?.jsend;
  }

  get code(): string | undefined {
    return this.jsend?.message;
  }
}

export const getApiErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof ApiRequestError) {
    return error.message;
  }

  if (isAxiosError(error)) {
    const jsend = isJSendFailure(error.response?.data) ? error.response?.data : null;

    if (jsend) {
      return resolveJSendMessage(jsend, fallback);
    }

    const status = error.response?.status;

    if (status === 401 || status === 403) {
      return "Credenciales inválidas o acceso denegado.";
    }

    if (status === 404) {
      return "No encontramos el servicio solicitado.";
    }

    if (status === 409) {
      return "Ese email o nombre de usuario ya está registrado. Probá con otros datos.";
    }

    if (status && status >= 500) {
      return "Error del servidor. Intentá de nuevo más tarde.";
    }
  }

  if (error instanceof Error && error.message && !error.message.startsWith("Request failed")) {
    return error.message;
  }

  return fallback;
};

export const normalizeApiError = (error: unknown, fallback: string): ApiRequestError => {
  if (error instanceof ApiRequestError) {
    return error;
  }

  if (isAxiosError(error)) {
    const jsend = isJSendFailure(error.response?.data) ? error.response?.data : undefined;
    const message = jsend
      ? resolveJSendMessage(jsend, fallback)
      : getApiErrorMessage(error, fallback);

    return new ApiRequestError(message, {
      httpStatus: error.response?.status,
      jsend,
    });
  }

  if (error instanceof Error) {
    return new ApiRequestError(error.message || fallback);
  }

  return new ApiRequestError(fallback);
};

export const parseJSendFailure = (data: unknown): JSendFailure | null => {
  return isJSendFailure(data) ? data : null;
};
