import { Box, Button, Field, Input, Text } from "@chakra-ui/react";
import { type ComponentProps, type FC, type FormEvent, type ReactNode } from "react";

export const authInputStyles = {
  h: "44px",
  px: 4,
  bg: "rgba(0, 0, 0, 0.3)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "12px",
  color: "var(--text-primary)",
  fontSize: "sm",
  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  _placeholder: { color: "var(--text-muted)" },
  _hover: { borderColor: "rgba(255, 255, 255, 0.2)" },
  _focus: {
    borderColor: "var(--accent-purple)",
    boxShadow: "0 0 0 2px rgba(124, 58, 237, 0.28)",
    outline: "none",
  },
  _focusVisible: {
    borderColor: "var(--accent-purple)",
    boxShadow: "0 0 0 2px rgba(124, 58, 237, 0.28)",
    outline: "none",
  },
} as const;

type AuthFieldProps = {
  label: string;
  helperText?: string;
  children: ReactNode;
};

export const AuthField: FC<AuthFieldProps> = ({ label, helperText, children }) => (
  <Field.Root w="full">
    <Field.Label
      color="var(--text-secondary)"
      fontSize="sm"
      fontWeight="600"
      mb={1.5}
      letterSpacing="-0.01em"
    >
      {label}
    </Field.Label>
    {children}
    {helperText ? (
      <Field.HelperText color="var(--text-muted)" fontSize="xs" mt={1.5} lineHeight="1.45">
        {helperText}
      </Field.HelperText>
    ) : null}
  </Field.Root>
);

type AuthInputProps = ComponentProps<typeof Input>;

export const AuthInput: FC<AuthInputProps> = (props) => (
  <Input variant="outline" w="full" css={authInputStyles} {...props} />
);

type AuthErrorAlertProps = {
  message: string;
};

export const AuthErrorAlert: FC<AuthErrorAlertProps> = ({ message }) => (
  <Box
    w="full"
    px={3.5}
    py={3}
    borderRadius="12px"
    bg="rgba(251, 113, 133, 0.1)"
    border="1px solid rgba(251, 113, 133, 0.32)"
    boxShadow="0 0 18px rgba(251, 113, 133, 0.08)"
  >
    <Text color="#fecdd3" fontSize="sm" fontWeight="600" lineHeight="1.45">
      {message}
    </Text>
  </Box>
);

type AuthSubmitButtonProps = {
  children: ReactNode;
  loading?: boolean;
};

export const AuthSubmitButton: FC<AuthSubmitButtonProps> = ({ children, loading }) => (
  <Button
    type="submit"
    w="full"
    h="48px"
    mt={2}
    borderRadius="12px"
    bg="var(--accent-purple)"
    color="var(--text-primary)"
    fontSize="sm"
    fontWeight="700"
    letterSpacing="0.01em"
    boxShadow="0 6px 22px rgba(124, 58, 237, 0.38)"
    loading={loading}
    _hover={{ bg: "var(--accent-purple-hover)" }}
    _active={{ transform: "scale(0.99)" }}
  >
    {children}
  </Button>
);

type AuthFormLayoutProps = {
  children: ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  name: string;
};

export const AuthFormLayout: FC<AuthFormLayoutProps> = ({ children, onSubmit, name }) => (
  <form
    name={name}
    autoComplete="on"
    style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}
    onSubmit={onSubmit}
  >
    {children}
  </form>
);
