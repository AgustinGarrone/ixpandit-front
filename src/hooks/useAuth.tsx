"use client";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { useRouter } from "next/navigation";
import { createContext, type ReactNode, useContext } from "react";

import { type DecodeTokenData } from "@/shared/types/api/auth.types";
import { checkLocalStorage } from "@/shared/utils/localStorage.utils";

interface AuthProviderProps {
  children: ReactNode;
}

const defaultAuthContext = {
  isAuthenticated: () => false,
  userHasInitialPokemons: () => false,
  getToken: () => "",
  getUserInfo: () => null as JwtPayload | null,
  logout: () => {},
};

const AuthContext = createContext(defaultAuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();

  const isAuthenticated = () => {
    if (checkLocalStorage()) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp! > currentTime;
      }
    }
    return false;
  };

  const userHasInitialPokemons = () => {
    if (checkLocalStorage()) {
      const initialPokemons = localStorage.getItem("initialPokemons");
      if (initialPokemons === "true") {
        return true;
      }
    }
    return false;
  };

  const getToken = () => {
    if (checkLocalStorage()) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        return token;
      }
    }
    return "";
  };

  const getUserInfo = (): DecodeTokenData | null => {
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
      router.push("/login");
    }
  };

  const authContextValue = {
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
