import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { type Dispatch, type FC, type FormEvent, type SetStateAction, useState } from "react";
import { z } from "zod";

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
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, registerSchema } from "./form.schemas";

type RegisterFormProps = {
  changeMode: Dispatch<SetStateAction<FormMode>>;
  layout?: "page" | "modal";
};

export const RegisterForm: FC<RegisterFormProps> = ({ changeMode, layout = "page" }) => {
  const { registerMutation } = useAuthClient();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    playSound();

    try {
      const formData = { username, email, password };
      registerSchema.parse(formData);
      setError(null);
    } catch (submitError) {
      if (submitError instanceof z.ZodError) {
        setError(submitError.issues[0]?.message ?? "Datos inválidos");
      }
      return;
    }

    registerMutation.mutate(
      { username, email, password },
      {
        onSuccess: () => {
          void successAlert("¡Cuenta creada! Ya podés empezar a explorar.").then(() => {
            window.location.href = "/";
          });
        },
        onError: (mutationError) => {
          const message = getApiErrorMessage(
            mutationError,
            "No pudimos crear tu cuenta. Probá con otros datos.",
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
        h="95%"
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
          ¡Regístrate!
        </Text>

        {error ? <AuthErrorAlert message={error} /> : null}

        <Box w="80%" mt={4}>
          <AuthFormLayout name="register-form" onSubmit={handleSubmit}>
            <AuthField label="Nombre de usuario">
              <AuthInput
                id="register-username"
                name="register-username"
                type="text"
                autoComplete="nickname"
                value={username}
                placeholder="AshKetchum"
                onChange={(event) => setUsername(event.target.value)}
              />
            </AuthField>

            <AuthField label="Email" helperText="Nunca compartiremos tu email.">
              <AuthInput
                id="register-email"
                name="register-email"
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
                id="register-password"
                name="register-password"
                type="password"
                autoComplete="new-password"
                value={password}
                placeholder="Ingresá una contraseña"
                onChange={(event) => setPassword(event.target.value.slice(0, PASSWORD_MAX_LENGTH))}
                minLength={PASSWORD_MIN_LENGTH}
                maxLength={PASSWORD_MAX_LENGTH}
                pattern=".{6,15}"
              />
            </AuthField>

            <AuthSubmitButton loading={registerMutation.isPending}>Crear cuenta</AuthSubmitButton>
          </AuthFormLayout>
        </Box>

        <Flex mt={8} direction="column" alignItems="center" justifyContent="center">
          <Text mt={4}>¿Ya tienes una cuenta? </Text>
          <Button
            variant="plain"
            onClick={() => changeMode(FormMode.LOGIN)}
            color="blue.400"
            fontWeight="normal"
            p={0}
            h="auto"
          >
            Iniciar sesión
          </Button>
        </Flex>
      </Flex>
    );
  }

  return (
    <AuthFormLayout name="register-form" onSubmit={handleSubmit}>
      {error ? <AuthErrorAlert message={error} /> : null}

      <AuthField label="Nombre de usuario">
        <AuthInput
          id="register-username"
          name="register-username"
          type="text"
          autoComplete="nickname"
          value={username}
          placeholder="AshKetchum"
          onChange={(event) => setUsername(event.target.value)}
        />
      </AuthField>

      <AuthField label="Email" helperText="Nunca compartiremos tu email.">
        <AuthInput
          id="register-email"
          name="register-email"
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
          id="register-password"
          name="register-password"
          type="password"
          autoComplete="new-password"
          value={password}
          placeholder="Ingresá una contraseña"
          onChange={(event) => setPassword(event.target.value.slice(0, PASSWORD_MAX_LENGTH))}
          minLength={PASSWORD_MIN_LENGTH}
          maxLength={PASSWORD_MAX_LENGTH}
          pattern=".{6,15}"
        />
      </AuthField>

      <AuthSubmitButton loading={registerMutation.isPending}>Crear cuenta</AuthSubmitButton>
    </AuthFormLayout>
  );
};
