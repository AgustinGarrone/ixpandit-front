"use client";

import { useMutation } from "@tanstack/react-query";

import favoritesClient from "@/clients/FavoritesClient";
import {
  type AddFavoriteDto,
  type AddFavoriteResponse,
  type RemoveFavoriteResponse,
} from "@/shared/types/api/favorites.types";
import { type ApiRequestError } from "@/shared/utils/api-error.utils";

const useAddFavoriteMutation = () =>
  useMutation<AddFavoriteResponse, ApiRequestError, AddFavoriteDto>({
    mutationFn: (dto) => favoritesClient.addFavorite(dto),
  });

const useRemoveFavoriteMutation = () =>
  useMutation<RemoveFavoriteResponse, ApiRequestError, number>({
    mutationFn: (pokeapiId) => favoritesClient.removeFavorite(pokeapiId),
  });

export const useFavoritesClient = () => {
  const addFavoriteMutation = useAddFavoriteMutation();
  const removeFavoriteMutation = useRemoveFavoriteMutation();

  return {
    addFavoriteMutation,
    removeFavoriteMutation,
  };
};
