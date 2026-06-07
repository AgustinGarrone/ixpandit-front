"use client";

import { createContext, type ReactNode, useCallback, useContext, useState } from "react";

import { LoginModal } from "@/shared/components/authModal";
import { FormMode } from "@/shared/components/authModal/form-mode";

type AuthModalContextValue = {
  openLogin: () => void;
  openRegister: () => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

type AuthModalProviderProps = {
  children: ReactNode;
};

export const AuthModalProvider = ({ children }: AuthModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<FormMode>(FormMode.LOGIN);

  const openLogin = useCallback(() => {
    setMode(FormMode.LOGIN);
    setIsOpen(true);
  }, []);

  const openRegister = useCallback(() => {
    setMode(FormMode.REGISTER);
    setIsOpen(true);
  }, []);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);

    if (!open) {
      setMode(FormMode.LOGIN);
    }
  }, []);

  return (
    <AuthModalContext.Provider value={{ openLogin, openRegister }}>
      {children}
      <LoginModal open={isOpen} onOpenChange={handleOpenChange} initialMode={mode} />
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);

  if (!context) {
    throw new Error("useAuthModal debe usarse dentro de AuthModalProvider");
  }

  return context;
};
