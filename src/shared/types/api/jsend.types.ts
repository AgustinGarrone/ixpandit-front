export enum JSendStatus {
  SUCCESS = "success",
  FAIL = "fail",
  ERROR = "error",
}

export type JSendPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext?: boolean;
  hasPrev?: boolean;
};

export type JSendMeta = {
  timestamp?: string;
  pagination?: JSendPagination;
  [key: string]: unknown;
};

export type JSendSuccess<T> = {
  status: JSendStatus.SUCCESS;
  data: T;
  message: string;
  meta?: JSendMeta;
};

export type JSendFail = {
  status: JSendStatus.FAIL;
  message: string;
  meta?: JSendMeta;
};

export type JSendError = {
  status: JSendStatus.ERROR;
  message: string;
  meta?: JSendMeta;
};

export type JSendFailure = JSendFail | JSendError;

export type PaginatedData<T> = {
  items: T[];
  pagination: JSendPagination;
};

const normalizeJSendStatus = (status: unknown): string | null => {
  if (typeof status !== "string") {
    return null;
  }

  return status.trim().toLowerCase();
};

export const isJSendFailure = (data: unknown): data is JSendFailure => {
  if (!data || typeof data !== "object") {
    return false;
  }

  const status = normalizeJSendStatus((data as JSendFailure).status);

  return status === JSendStatus.FAIL || status === JSendStatus.ERROR;
};

export const isJSendSuccess = <T>(data: unknown): data is JSendSuccess<T> => {
  if (!data || typeof data !== "object") {
    return false;
  }

  const status = normalizeJSendStatus((data as JSendSuccess<T>).status);

  return status === JSendStatus.SUCCESS && "data" in data;
};

export const isPaginatedData = <T>(data: unknown): data is PaginatedData<T> => {
  if (!data || typeof data !== "object") {
    return false;
  }

  const record = data as PaginatedData<T>;

  return Array.isArray(record.items) && typeof record.pagination === "object";
};

export const unwrapJSendSuccess = <T>(response: JSendSuccess<T>): T => response.data;
