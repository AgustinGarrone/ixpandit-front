import { checkLocalStorage } from "@/shared/utils/localStorage.utils";

export async function getAuthFromCache(): Promise<string | null> {
  if (!checkLocalStorage()) {
    return null;
  }

  return localStorage.getItem("accessToken");
}
