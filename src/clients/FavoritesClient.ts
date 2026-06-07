"use client";

import {
  type AddFavoriteDto,
  type AddFavoriteResponse,
  type RemoveFavoriteResponse,
} from "@/shared/types/api/favorites.types";

import RESTClient from "./RESTClient";

class FavoritesClient extends RESTClient {
  async addFavorite(dto: AddFavoriteDto): Promise<AddFavoriteResponse> {
    return this.post<AddFavoriteResponse>("favorites", dto, { withAuth: true });
  }

  async removeFavorite(pokeapiId: number): Promise<RemoveFavoriteResponse> {
    return this.delete<RemoveFavoriteResponse>(`favorites/${pokeapiId}`, { withAuth: true });
  }
}

const favoritesClient = new FavoritesClient();

export default favoritesClient;
