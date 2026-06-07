"use client";

import { Box, Button, Text } from "@chakra-ui/react";
import { type FC, type ReactNode } from "react";

import { AuthModalHeader } from "./auth-modal-header";
import { FormMode } from "./form-mode";

type AuthModalShellProps = {
  mode: FormMode;
  title: string;
  description: string;
  footerPrompt: string;
  footerAction: string;
  onSwitchMode: () => void;
  children: ReactNode;
};

export const AuthModalShell: FC<AuthModalShellProps> = ({
  mode,
  title,
  description,
  footerPrompt,
  footerAction,
  onSwitchMode,
  children,
}) => (
  <Box className="auth-modal-shell" w="full">
    <AuthModalHeader mode={mode} title={title} description={description} />

    <Box mt={5}>{children}</Box>

    <Box mt={6} pt={4} borderTop="1px solid rgba(255, 255, 255, 0.08)" textAlign="center">
      <Text color="var(--text-muted)" fontSize="sm" lineHeight="1.5">
        {footerPrompt}{" "}
        <Button
          variant="plain"
          display="inline"
          h="auto"
          minH="auto"
          p={0}
          color="var(--pokemon-yellow)"
          fontSize="sm"
          fontWeight="700"
          verticalAlign="baseline"
          _hover={{ color: "var(--pokemon-yellow-hover)", textDecoration: "underline" }}
          onClick={onSwitchMode}
        >
          {footerAction}
        </Button>
      </Text>
    </Box>
  </Box>
);
