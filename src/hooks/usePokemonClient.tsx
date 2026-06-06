"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import pokemonClient from "@/clients/PokemonClient";
import { pokemonKeys } from "@/shared/constants/pokemon-keys";
import { type Pokemon } from "@/shared/types/api/models";
import { type ListPokemonQuery } from "@/shared/types/api/pokemon.types";
import { type ApiRequestError } from "@/shared/utils/api-error.utils";

export const usePokemonList = (query: ListPokemonQuery = {}) =>
  useQuery({
    queryKey: pokemonKeys.list(query),
    queryFn: () => pokemonClient.findAll(query),
  });

export const usePokemonTypes = () =>
  useQuery({
    queryKey: pokemonKeys.types(),
    queryFn: () => pokemonClient.getTypes(),
    staleTime: 5 * 60 * 1000,
  });

export const useRandomPokemon = () =>
  useMutation<Pokemon, ApiRequestError, number[]>({
    mutationFn: (excludeIds) => pokemonClient.getRandomPokemon(excludeIds),
  });
