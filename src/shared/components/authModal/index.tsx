"use client";

import { Flex, Text } from "@chakra-ui/react";
import { type FC, useState } from "react";

import { AUTH_COPY } from "./auth-copy";
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
        className="glass glass-panel"
        direction="column"
        w="full"
        maxW="440px"
        p={{ base: 5, md: 6 }}
        bg="rgba(var(--glass-color-rgb), 0.92)"
      >
        <Flex direction="column" mb={5}>
          <Text
            color="var(--text-primary)"
            fontSize={{ base: "12px", md: "14px" }}
            letterSpacing="0.1em"
          >
            {copy.title}
          </Text>
          <Text
            color="var(--text-muted)"
            fontSize="8px"
            letterSpacing="0.06em"
            lineHeight="1.6"
            mt={2}
          >
            {copy.description}
          </Text>
        </Flex>

        {formMode === FormMode.LOGIN ? (
          <LoginForm key="login" changeMode={setFormMode} layout="modal" />
        ) : (
          <RegisterForm key="register" changeMode={setFormMode} layout="modal" />
        )}

        <Text
          color="var(--text-muted)"
          fontSize="8px"
          letterSpacing="0.06em"
          textAlign="center"
          mt={5}
        >
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
      </Flex>
    </Flex>
  );
};
