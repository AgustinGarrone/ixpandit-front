"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import favoritesClient from "@/clients/FavoritesClient";
import { favoritesKeys } from "@/shared/constants/favorites-keys";
import {
  type AddFavoriteDto,
  type AddFavoriteResponse,
  type FavoritesListResponse,
  type ListFavoritesQuery,
  type RemoveFavoriteResponse,
} from "@/shared/types/api/favorites.types";
import { type ApiRequestError } from "@/shared/utils/api-error.utils";

type UseFavoritesListOptions = {
  enabled?: boolean;
};

export const useFavoritesList = (
  query: ListFavoritesQuery = {},
  options: UseFavoritesListOptions = {},
) =>
  useQuery<FavoritesListResponse, ApiRequestError>({
    queryKey: favoritesKeys.list(query),
    queryFn: () => favoritesClient.findAll(query),
    enabled: options.enabled ?? true,
  });

const useAddFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AddFavoriteResponse, ApiRequestError, AddFavoriteDto>({
    mutationFn: (dto) => favoritesClient.addFavorite(dto),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: favoritesKeys.all });
    },
  });
};

const useRemoveFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<RemoveFavoriteResponse, ApiRequestError, number>({
    mutationFn: (pokeapiId) => favoritesClient.removeFavorite(pokeapiId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: favoritesKeys.all });
    },
  });
};

export const useFavoritesClient = () => {
  const addFavoriteMutation = useAddFavoriteMutation();
  const removeFavoriteMutation = useRemoveFavoriteMutation();

  return {
    addFavoriteMutation,
    removeFavoriteMutation,
  };
};
