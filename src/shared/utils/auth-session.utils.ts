import { type AuthResponses } from "@/shared/types/api/auth.types";

import { checkLocalStorage } from "./localStorage.utils";

export const persistAuthSession = (response: AuthResponses) => {
  if (!checkLocalStorage()) {
    return;
  }

  localStorage.setItem("accessToken", response.user.token);
  localStorage.setItem("initialPokemons", String(response.user.initialPokemons));
};
