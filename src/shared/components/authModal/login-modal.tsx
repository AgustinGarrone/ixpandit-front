"use client";

import { Dialog, Flex, Portal } from "@chakra-ui/react";
import { useState } from "react";

import { CloseIcon } from "@/shared/icons/svg-icons";

import { AUTH_COPY } from "./auth-copy";
import { AuthModalShell } from "./auth-modal-shell";
import { LoginForm } from "./components/form";
import { RegisterForm } from "./components/registerForm";
import { FormMode } from "./form-mode";

type LoginModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialMode?: FormMode;
};

export const LoginModal = ({ open, onOpenChange, initialMode = FormMode.LOGIN }: LoginModalProps) => {
  const [formMode, setFormMode] = useState<FormMode>(initialMode);
  const [prevOpen, setPrevOpen] = useState(open);
  const copy = AUTH_COPY[formMode];

  if (open !== prevOpen) {
    setPrevOpen(open);

    if (open) {
      setFormMode(initialMode);
    } else {
      setFormMode(FormMode.LOGIN);
    }
  }

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
  };

  const switchMode = () => {
    setFormMode((current) =>
      current === FormMode.LOGIN ? FormMode.REGISTER : FormMode.LOGIN,
    );
  };

  return (
    <Dialog.Root
      lazyMount
      unmountOnExit
      open={open}
      onOpenChange={(details) => handleOpenChange(details.open)}
      placement="center"
      restoreFocus={false}
    >
      <Portal>
        <Dialog.Backdrop
          bg="rgba(4, 10, 22, 0.78)"
          backdropFilter="blur(10px)"
          className="auth-modal-backdrop"
        />
        <Dialog.Positioner p={{ base: 4, md: 6 }}>
          <Dialog.Content
            className="glass glass-panel auth-modal-content"
            maxW="480px"
            w="full"
            p={{ base: 4, md: 5 }}
            bg="rgba(8, 14, 30, 0.94)"
            border="1px solid rgba(124, 58, 237, 0.28)"
            boxShadow="0 24px 64px rgba(0, 0, 0, 0.55), 0 0 40px rgba(124, 58, 237, 0.16)"
            overflow="visible"
          >
            <Dialog.CloseTrigger
              aria-label="Cerrar modal"
              position="absolute"
              top={{ base: "-10px", md: "-12px" }}
              right={{ base: "-6px", md: "-8px" }}
              zIndex={2}
              w="34px"
              h="34px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="full"
              bg="rgba(12, 18, 36, 0.96)"
              border="1px solid rgba(255, 255, 255, 0.22)"
              color="var(--text-primary)"
              boxShadow="0 8px 20px rgba(0, 0, 0, 0.35)"
              transition="all 0.15s ease"
              cursor="pointer"
              _hover={{
                bg: "rgba(255, 255, 255, 0.1)",
                color: "#ffffff",
                borderColor: "rgba(255, 255, 255, 0.35)",
              }}
            >
              <Flex align="center" justify="center" w="full" h="full">
                <CloseIcon />
              </Flex>
            </Dialog.CloseTrigger>

            <Dialog.Body p={0}>
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
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
