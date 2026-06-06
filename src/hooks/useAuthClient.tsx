"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import authClient from "@/clients/AuthClient";
import { authKeys } from "@/shared/constants/auth-keys";
import {
  type AuthResponses,
  type LoginMutationData,
  type RegisterMutationData,
} from "@/shared/types/api/auth.types";
import { type ApiRequestError } from "@/shared/utils/api-error.utils";
import { persistAuthSession } from "@/shared/utils/auth-session.utils";
import { checkLocalStorage } from "@/shared/utils/localStorage.utils";

const cacheAuthSession = (
  queryClient: ReturnType<typeof useQueryClient>,
  response: AuthResponses,
) => {
  persistAuthSession(response);
  queryClient.setQueryData(authKeys.session(), response);
};

const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponses, ApiRequestError, LoginMutationData>({
    mutationFn: async (data) => {
      const response = await authClient.login(data);
      cacheAuthSession(queryClient, response);
      return response;
    },
  });
};

const useRegisterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponses, ApiRequestError, RegisterMutationData>({
    mutationFn: async (data) => {
      const response = await authClient.register(data);
      cacheAuthSession(queryClient, response);
      return response;
    },
  });
};

const useSetInitialMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<boolean, ApiRequestError>({
    mutationFn: async () => {
      const response = await authClient.setInitialPokemonsTrue();

      queryClient.setQueryData<AuthResponses | undefined>(
        authKeys.session(),
        (current: AuthResponses | undefined) => {
          if (!current) {
            return current;
          }

          return {
            ...current,
            user: {
              ...current.user,
              initialPokemons: true,
            },
          };
        },
      );

      if (checkLocalStorage()) {
        localStorage.setItem("initialPokemons", "true");
      }

      return response;
    },
  });
};

export const useAuthClient = () => {
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();
  const setInitialMutation = useSetInitialMutation();

  return {
    loginMutation,
    registerMutation,
    setInitialMutation,
  };
};
