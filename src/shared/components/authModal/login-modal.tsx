"use client";

import { Dialog, Portal, Text } from "@chakra-ui/react";
import { useState } from "react";

import { AUTH_COPY } from "./auth-copy";
import { LoginForm } from "./components/form";
import { RegisterForm } from "./components/registerForm";
import { FormMode } from "./form-mode";

type LoginModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const LoginModal = ({ open, onOpenChange }: LoginModalProps) => {
  const [formMode, setFormMode] = useState<FormMode>(FormMode.LOGIN);
  const copy = AUTH_COPY[formMode];

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setFormMode(FormMode.LOGIN);
    }

    onOpenChange(nextOpen);
  };

  const switchMode = () => {
    setFormMode((current) =>
      current === FormMode.LOGIN ? FormMode.REGISTER : FormMode.LOGIN,
    );
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(details) => handleOpenChange(details.open)}
      placement="center"
    >
      <Portal>
        <Dialog.Backdrop bg="rgba(4, 12, 24, 0.72)" backdropFilter="blur(6px)" />
        <Dialog.Positioner p={4}>
          <Dialog.Content
            className="glass glass-panel"
            maxW="440px"
            w="full"
            p={{ base: 5, md: 6 }}
            bg="rgba(var(--glass-color-rgb), 0.92)"
          >
            <Dialog.Header p={0} mb={5}>
              <Dialog.Title>
                <Text
                  color="var(--text-primary)"
                  fontSize={{ base: "12px", md: "14px" }}
                  letterSpacing="0.1em"
                >
                  {copy.title}
                </Text>
              </Dialog.Title>
              <Dialog.Description mt={2}>
                <Text
                  color="var(--text-muted)"
                  fontSize="8px"
                  letterSpacing="0.06em"
                  lineHeight="1.6"
                >
                  {copy.description}
                </Text>
              </Dialog.Description>
            </Dialog.Header>

            <Dialog.Body p={0}>
              {formMode === FormMode.LOGIN ? (
                <LoginForm key="login" changeMode={setFormMode} layout="modal" />
              ) : (
                <RegisterForm key="register" changeMode={setFormMode} layout="modal" />
              )}
            </Dialog.Body>

            <Dialog.Footer p={0} mt={5} justifyContent="center">
              <Text color="var(--text-muted)" fontSize="8px" letterSpacing="0.06em">
                {copy.footerPrompt}{" "}
                <Text
                  as="span"
                  color="var(--pokemon-yellow)"
                  cursor="pointer"
                  onClick={switchMode}
                  _hover={{ textDecoration: "underline" }}
                >
                  {copy.footerAction}
                </Text>
              </Text>
            </Dialog.Footer>

            <Dialog.CloseTrigger
              position="absolute"
              top={3}
              right={3}
              color="var(--text-muted)"
              fontSize="12px"
            />
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
