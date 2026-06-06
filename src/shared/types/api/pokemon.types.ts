import { type JSendSuccess } from "./jsend.types";
import { type Pokemon } from "./models";

export type ListPokemonQuery = {
  page?: number;
  limit?: number;
};

export type PokemonListResponse = JSendSuccess<Pokemon[]>;
