"use client";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { createContext, type ReactNode, useContext, useSyncExternalStore } from "react";

import { type DecodeTokenData } from "@/shared/types/api/auth.types";
import { checkLocalStorage } from "@/shared/utils/localStorage.utils";

interface AuthProviderProps {
  children: ReactNode;
}

const defaultAuthContext = {
  hasHydrated: false,
  isAuthenticated: () => false,
  userHasInitialPokemons: () => false,
  getToken: () => "",
  getUserInfo: () => null as JwtPayload | null,
  logout: () => {},
};

const AuthContext = createContext(defaultAuthContext);

const subscribe = () => () => {};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const hasHydrated = useSyncExternalStore(subscribe, () => true, () => false);

  const isAuthenticated = () => {
    if (!hasHydrated) {
      return false;
    }

    if (checkLocalStorage()) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          return Boolean(decodedToken.exp && decodedToken.exp > currentTime);
        } catch {
          return false;
        }
      }
    }
    return false;
  };

  const userHasInitialPokemons = () => {
    if (!hasHydrated) {
      return false;
    }

    if (checkLocalStorage()) {
      const initialPokemons = localStorage.getItem("initialPokemons");
      if (initialPokemons === "true") {
        return true;
      }
    }
    return false;
  };

  const getToken = () => {
    if (!hasHydrated) {
      return "";
    }

    if (checkLocalStorage()) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        return token;
      }
    }
    return "";
  };

  const getUserInfo = (): DecodeTokenData | null => {
    if (!hasHydrated) {
      return null;
    }

    if (checkLocalStorage()) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const decodedToken = jwtDecode(token) as DecodeTokenData;
        const data: DecodeTokenData = {
          username: decodedToken.username || "",
          initialPokemons: decodedToken.initialPokemons,
          id: decodedToken.id!,
          iat: decodedToken.iat!,
          exp: decodedToken.exp!,
        };
        return data;
      }
    }
    return null;
  };

  const logout = () => {
    if (checkLocalStorage()) {
      localStorage.removeItem("initialPokemons");
      localStorage.removeItem("accessToken");
    }
  };

  const authContextValue = {
    hasHydrated,
    isAuthenticated,
    userHasInitialPokemons,
    getToken,
    getUserInfo,
    logout,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
