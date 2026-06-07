import { type JSendSuccess } from "./jsend.types";

export type AddFavoriteDto = {
  pokeapiId: number;
};

export type FavoriteResponseDto = {
  id: string;
  pokeapiId: number;
};

export type RemoveFavoriteResponseDto = {
  pokeapiId: number;
  removed: boolean;
};

export type AddFavoriteResponse = JSendSuccess<FavoriteResponseDto>;
export type RemoveFavoriteResponse = JSendSuccess<RemoveFavoriteResponseDto>;
