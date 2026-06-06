const normalizeBaseUrl = (url: string) => url.replace(/\/+$/, "");

export const env = {
  apiUrl: normalizeBaseUrl(process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8100/api/v1"),
} as const;
