import { type ListFavoritesQuery } from "@/shared/types/api/favorites.types";

export const favoritesKeys = {
  all: ["favorites"] as const,
  list: (query: ListFavoritesQuery = {}) => [...favoritesKeys.all, "list", query] as const,
};
