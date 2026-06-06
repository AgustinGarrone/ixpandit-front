import { Alert, Button, Field, Flex, Input, Text } from "@chakra-ui/react";
import { type Dispatch, type FC, type FormEvent, type SetStateAction, useState } from "react";
import { z } from "zod";

import { useAuthClient } from "@/hooks/useAuthClient";
import { errorAlert } from "@/shared/utils/alerts";
import { getApiErrorMessage } from "@/shared/utils/api-error.utils";
import { playSound } from "@/shared/utils/fx";
import { checkLocalStorage } from "@/shared/utils/localStorage.utils";

import { FormMode } from "../form-mode";
import { loginSchema, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "./form.schemas";

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

    try {
      const formData = { email, password };
      loginSchema.parse(formData);
      setError(null);
    } catch (submitError) {
      if (submitError instanceof z.ZodError) {
        setError(submitError.issues[0]?.message ?? "Datos inválidos");
      }
      return;
    }

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          if (checkLocalStorage()) {
            localStorage.setItem("accessToken", data.user.token);
            localStorage.setItem("initialPokemons", data.user.initialPokemons ? "true" : "false");
          }

          if (!data.user.initialPokemons) {
            window.location.href = "/getInitial";
          } else {
            window.location.href = "/";
          }
        },
        onError: (mutationError) => {
          const message = getApiErrorMessage(
            mutationError,
            "No pudimos iniciar sesión. Revisá tus credenciales.",
          );

          setError(message);
          errorAlert(message);
        },
      },
    );
  };

  return (
    <Flex
      w={layout === "page" ? "30%" : "full"}
      h={layout === "page" ? "90%" : "auto"}
      direction="column"
      alignItems="center"
      justifyContent="center"
      bg={layout === "page" ? "rgba(255, 255, 255, 0.1)" : "transparent"}
      backdropFilter={layout === "page" ? "blur(2px)" : undefined}
      border={layout === "page" ? "1px solid rgba(255, 255, 255, 0.18)" : undefined}
      borderRadius={layout === "page" ? "16px" : undefined}
      boxShadow={layout === "page" ? "0 4px 30px rgba(0, 0, 0, 0.1)" : undefined}
    >
      {layout === "page" ? (
        <Text fontSize="2rem" fontWeight="bold">
          GTS Pokémon
        </Text>
      ) : null}

      {error ? (
        <Alert.Root
          status="error"
          mb={4}
          borderRadius="md"
          width={layout === "page" ? "80%" : "100%"}
        >
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{error}</Alert.Title>
          </Alert.Content>
        </Alert.Root>
      ) : null}

      <form
        style={{
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit}
      >
        <Field.Root width={layout === "page" ? "80%" : "100%"} mt={4}>
          <Field.Label>Email</Field.Label>
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            borderRadius="md"
            variant="subtle"
            _hover={{ borderColor: "blue.500" }}
          />
          <Field.HelperText>Nunca compartiremos tu email.</Field.HelperText>
        </Field.Root>

        <Field.Root width={layout === "page" ? "80%" : "100%"} mt={4}>
          <Field.Label>Password</Field.Label>
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value.slice(0, PASSWORD_MAX_LENGTH))}
            minLength={PASSWORD_MIN_LENGTH}
            maxLength={PASSWORD_MAX_LENGTH}
            pattern=".{6,15}"
            borderRadius="md"
            variant="subtle"
            _hover={{ borderColor: "blue.500" }}
          />
          <Field.HelperText>Mínimo {PASSWORD_MIN_LENGTH}, máximo {PASSWORD_MAX_LENGTH} caracteres.</Field.HelperText>
        </Field.Root>

        <Button
          type="submit"
          mt={6}
          colorPalette="blue"
          borderRadius="md"
          loading={loginMutation.isPending}
        >
          Iniciar sesión
        </Button>
      </form>

      {layout === "page" ? (
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
      ) : null}
    </Flex>
  );
};
