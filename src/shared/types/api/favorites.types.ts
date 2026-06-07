import { type JSendSuccess, type PaginatedData } from "./jsend.types";
import { type Pokemon } from "./models";

export type AddFavoriteDto = {
  pokeapiId: number;
};

export type ListFavoritesQuery = {
  page?: number;
  limit?: number;
};

export type FavoriteRecordDto = {
  id: string;
  pokeapiId: number;
};

export type FavoriteResponseDto = Pokemon;

export type RemoveFavoriteResponseDto = {
  pokeapiId: number;
  removed: boolean;
};

export type AddFavoriteResponse = JSendSuccess<FavoriteRecordDto>;
export type RemoveFavoriteResponse = JSendSuccess<RemoveFavoriteResponseDto>;
export type FavoritesListResponse = JSendSuccess<
  PaginatedData<FavoriteResponseDto> | FavoriteResponseDto[]
>;
