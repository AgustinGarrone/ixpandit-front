import { type JSendSuccess } from "./jsend.types";
import { type Pokemon } from "./models";

export type ListPokemonQuery = {
  page?: number;
  limit?: number;
  type?: string;
};

export type PokemonType = {
  name: string;
  slug: string;
};

export type PokemonListResponse = JSendSuccess<Pokemon[]>;
export type PokemonTypesResponse = JSendSuccess<PokemonType[]>;
