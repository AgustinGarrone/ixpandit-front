"use client";

import { type Pokemon } from "@/shared/types/api/models";
import {
  type ListPokemonQuery,
  type PokemonListResponse,
  type PokemonRandomResponse,
  type PokemonTypesResponse,
} from "@/shared/types/api/pokemon.types";

import RESTClient from "./RESTClient";

class PokemonClient extends RESTClient {
  async findAll(query: ListPokemonQuery = {}): Promise<PokemonListResponse> {
    return this.get<PokemonListResponse>("pokemon", { params: query });
  }

  async getTypes(): Promise<PokemonTypesResponse> {
    return this.get<PokemonTypesResponse>("pokemon/types");
  }

  async getRandomPokemon(): Promise<Pokemon> {
    const response = await this.get<PokemonRandomResponse>("pokemon/random", { withAuth: true });
    return response.data;
  }
}

const pokemonClient = new PokemonClient();

export default pokemonClient;
