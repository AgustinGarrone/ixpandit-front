import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { type Dispatch, type FC, type FormEvent, type SetStateAction, useState } from "react";
import { useAuthClient } from "@/hooks/useAuthClient";
import { errorAlert, successAlert } from "@/shared/utils/alerts";
import { getApiErrorMessage } from "@/shared/utils/api-error.utils";
import { playSound } from "@/shared/utils/fx";

import { FormMode } from "../form-mode";
import {
  AuthErrorAlert,
  AuthField,
  AuthFormLayout,
  AuthInput,
  AuthSubmitButton,
} from "./auth-form-ui";
import {
  formatZodError,
  loginSchema,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "./form.schemas";

type LoginFormProps = {
  changeMode: Dispatch<SetStateAction<FormMode>>;
  layout?: "page" | "modal";
};

export const LoginForm: FC<LoginFormProps> = ({ changeMode, layout = "page" }) => {
  const { loginMutation } = useAuthClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    playSound();

    const formData = {
      email: email.trim(),
      password,
    };

    const validation = loginSchema.safeParse(formData);

    if (!validation.success) {
      setError(formatZodError(validation.error));
      return;
    }

    setError(null);

    loginMutation.mutate(
      validation.data,
      {
        onSuccess: () => {
          void successAlert("¡Sesión iniciada correctamente!").then(() => {
            window.location.href = "/";
          });
        },
        onError: (mutationError) => {
          const message = getApiErrorMessage(
            mutationError,
            "No pudimos iniciar sesión. Revisá tus credenciales.",
          );

          setError(message);
          void errorAlert(message);
        },
      },
    );
  };

  if (layout === "page") {
    return (
      <Flex
        w="30%"
        h="90%"
        direction="column"
        alignItems="center"
        justifyContent="center"
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(2px)"
        border="1px solid rgba(255, 255, 255, 0.18)"
        borderRadius="16px"
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
      >
        <Text fontSize="2rem" fontWeight="bold">
          GTS Pokémon
        </Text>

        {error ? <AuthErrorAlert message={error} /> : null}

        <Box w="80%" mt={4}>
          <AuthFormLayout name="login-form" onSubmit={handleSubmit}>
            <AuthField label="Email" helperText="Nunca compartiremos tu email.">
              <AuthInput
                id="login-email"
                name="login-email"
                type="email"
                autoComplete="email"
                value={email}
                placeholder="tu@email.com"
                onChange={(event) => setEmail(event.target.value)}
              />
            </AuthField>

            <AuthField
              label="Contraseña"
              helperText={`Mínimo ${PASSWORD_MIN_LENGTH}, máximo ${PASSWORD_MAX_LENGTH} caracteres.`}
            >
              <AuthInput
                id="login-password"
                name="login-password"
                type="password"
                autoComplete="current-password"
                value={password}
                placeholder="Ingresá una contraseña"
                onChange={(event) => setPassword(event.target.value.slice(0, PASSWORD_MAX_LENGTH))}
                minLength={PASSWORD_MIN_LENGTH}
                maxLength={PASSWORD_MAX_LENGTH}
                pattern=".{6,20}"
              />
            </AuthField>

            <AuthSubmitButton loading={loginMutation.isPending}>Iniciar sesión</AuthSubmitButton>
          </AuthFormLayout>
        </Box>

        <Flex mt={8} direction="column" alignItems="center" justifyContent="center">
          <Text mt={2}>¿No tienes una cuenta? </Text>
          <Button
            variant="plain"
            onClick={() => changeMode(FormMode.REGISTER)}
            color="blue.400"
            fontWeight="normal"
            p={0}
            h="auto"
          >
            Crear cuenta
          </Button>
        </Flex>
      </Flex>
    );
  }

  return (
    <AuthFormLayout name="login-form" onSubmit={handleSubmit}>
      {error ? <AuthErrorAlert message={error} /> : null}

      <AuthField label="Email" helperText="Nunca compartiremos tu email.">
        <AuthInput
          id="login-email"
          name="login-email"
          type="email"
          autoComplete="email"
          value={email}
          placeholder="tu@email.com"
          onChange={(event) => setEmail(event.target.value)}
        />
      </AuthField>

      <AuthField
        label="Contraseña"
        helperText={`Mínimo ${PASSWORD_MIN_LENGTH}, máximo ${PASSWORD_MAX_LENGTH} caracteres.`}
      >
        <AuthInput
          id="login-password"
          name="login-password"
          type="password"
          autoComplete="current-password"
          value={password}
          placeholder="Ingresá una contraseña"
          onChange={(event) => setPassword(event.target.value.slice(0, PASSWORD_MAX_LENGTH))}
          minLength={PASSWORD_MIN_LENGTH}
          maxLength={PASSWORD_MAX_LENGTH}
          pattern=".{6,20}"
        />
      </AuthField>

      <AuthSubmitButton loading={loginMutation.isPending}>Iniciar sesión</AuthSubmitButton>
    </AuthFormLayout>
  );
};
