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

export const useAuthClient = () => {
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  return {
    loginMutation,
    registerMutation,
  };
};
