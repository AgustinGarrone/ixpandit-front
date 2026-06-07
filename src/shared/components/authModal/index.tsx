"use client";

import { Flex } from "@chakra-ui/react";
import { type FC, useState } from "react";

import { AUTH_COPY } from "./auth-copy";
import { AuthModalShell } from "./auth-modal-shell";
import { LoginForm } from "./components/form";
import { RegisterForm } from "./components/registerForm";
import { FormMode } from "./form-mode";

export { FormMode } from "./form-mode";
export { LoginModal } from "./login-modal";

export const LoginPage: FC = () => {
  const [formMode, setFormMode] = useState<FormMode>(FormMode.LOGIN);
  const copy = AUTH_COPY[formMode];

  const switchMode = () => {
    setFormMode((current) =>
      current === FormMode.LOGIN ? FormMode.REGISTER : FormMode.LOGIN,
    );
  };

  return (
    <Flex minH="100vh" w="100%" align="center" justify="center" p={{ base: 4, md: 6 }}>
      <Flex
        className="glass glass-panel auth-modal-content"
        direction="column"
        w="full"
        maxW="480px"
        p={{ base: 4, md: 5 }}
        bg="rgba(8, 14, 30, 0.94)"
        border="1px solid rgba(124, 58, 237, 0.28)"
        boxShadow="0 24px 64px rgba(0, 0, 0, 0.55), 0 0 40px rgba(124, 58, 237, 0.16)"
      >
        <AuthModalShell
          mode={formMode}
          title={copy.title}
          description={copy.description}
          footerPrompt={copy.footerPrompt}
          footerAction={copy.footerAction}
          onSwitchMode={switchMode}
        >
          {formMode === FormMode.LOGIN ? (
            <LoginForm key="login" changeMode={setFormMode} layout="modal" />
          ) : (
            <RegisterForm key="register" changeMode={setFormMode} layout="modal" />
          )}
        </AuthModalShell>
      </Flex>
    </Flex>
  );
};
