const normalizeBaseUrl = (url: string) => url.replace(/\/+$/, "");

export const env = {
  apiUrl: normalizeBaseUrl(process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api/v1"),
} as const;
