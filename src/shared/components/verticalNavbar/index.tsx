"use client";

import { useAuth } from "@/hooks/useAuth";
import { useAuthModal } from "@/hooks/useAuthModal";
import { type DecodeTokenData } from "@/shared/types/api/auth.types";

import { GuestPanel } from "./guest-panel";
import { LoggedInPanel } from "./logged-in-panel";

export const VerticalNavbar = () => {
  const { openLogin, openRegister } = useAuthModal();
  const { isAuthenticated, getUserInfo, logout } = useAuth();

  const authenticated = isAuthenticated();
  const userInfo = authenticated ? (getUserInfo() as DecodeTokenData | null) : null;

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return authenticated && userInfo ? (
    <LoggedInPanel userInfo={userInfo} onLogout={handleLogout} />
  ) : (
    <GuestPanel onLoginClick={openLogin} onRegisterClick={openRegister} />
  );
};
