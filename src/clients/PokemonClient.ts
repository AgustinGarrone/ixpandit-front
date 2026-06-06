"use client";

import { type Pokemon } from "@/shared/types/api/models";
import { type ListPokemonQuery, type PokemonListResponse } from "@/shared/types/api/pokemon.types";
import { ApiRequestError } from "@/shared/utils/api-error.utils";

import RESTClient from "./RESTClient";

class PokemonClient extends RESTClient {
  async findAll(query: ListPokemonQuery = {}): Promise<PokemonListResponse> {
    return this.get<PokemonListResponse>("pokemon", { params: query });
  }

  async getRandomPokemon(excludeIds: number[] = []): Promise<Pokemon> {
    const bootstrap = await this.findAll({ page: 1, limit: 1 });
    const totalPages = bootstrap.meta?.pagination?.totalPages ?? 0;

    if (totalPages <= 0) {
      throw new ApiRequestError("No hay pokémon disponibles.");
    }

    for (let attempt = 0; attempt < 10; attempt++) {
      const page = Math.floor(Math.random() * totalPages) + 1;
      const result = await this.findAll({ page, limit: 20 });
      const available = result.data.filter(
        (pokemon) => pokemon.name && !excludeIds.includes(pokemon.id),
      );

      if (available.length > 0) {
        return available[Math.floor(Math.random() * available.length)];
      }
    }

    throw new ApiRequestError("No pudimos obtener un pokémon aleatorio.");
  }
}

const pokemonClient = new PokemonClient();

export default pokemonClient;
