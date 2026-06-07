"use client";

import { Box, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useMemo, useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { useFavoritesClient, useFavoritesList } from "@/hooks/useFavoritesClient";
import { usePokemonList } from "@/hooks/usePokemonClient";
import { Paginator } from "@/shared/components/paginator";
import { PokemonSearcherCard } from "@/shared/components/pokemonSearcherCard";
import { FAVORITES_FILTER } from "@/shared/constants/filter.constants";
import { PokeballIcon, StarSaveIcon } from "@/shared/icons/svg-icons";
import { type Pokemon } from "@/shared/types/api/models";
import { errorAlert, infoAlert } from "@/shared/utils/alerts";
import { getApiErrorMessage } from "@/shared/utils/api-error.utils";
import {
  getFavoritePokeapiIds,
  normalizeFavoriteToPokemon,
  parseFavoritesListResponse,
} from "@/shared/utils/favorites.utils";

const PAGE_SIZE = 8;
const FAVORITES_SYNC_LIMIT = 200;

const GRID_COLUMNS = { base: 2, md: 3, xl: 4 };

type PokemonGridProps = {
  selectedType: string | null;
  nameLike: string | null;
};

export const PokemonGrid = ({ selectedType, nameLike }: PokemonGridProps) => {
  const { hasHydrated, isAuthenticated } = useAuth();
  const authenticated = hasHydrated && isAuthenticated();
  const isFavoritesView = selectedType === FAVORITES_FILTER;
  const { addFavoriteMutation, removeFavoriteMutation } = useFavoritesClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [optimisticSaved, setOptimisticSaved] = useState<Set<number>>(() => new Set());
  const [optimisticRemoved, setOptimisticRemoved] = useState<Set<number>>(() => new Set());
  const [prevSelectedType, setPrevSelectedType] = useState(selectedType);

  if (selectedType !== prevSelectedType) {
    setPrevSelectedType(selectedType);
    setCurrentPage(1);
  }

  const { data: favoritesSyncData, isLoading: isFavoritesSyncLoading } = useFavoritesList(
    { page: 1, limit: FAVORITES_SYNC_LIMIT },
    { enabled: authenticated && !isFavoritesView },
  );

  const { data: favoritesPageData, isLoading: isFavoritesPageLoading } = useFavoritesList(
    { page: currentPage, limit: PAGE_SIZE },
    { enabled: authenticated && isFavoritesView },
  );

  const savedIdsFromServer = useMemo(() => {
    if (isFavoritesView) {
      return getFavoritePokeapiIds(favoritesPageData);
    }

    return getFavoritePokeapiIds(favoritesSyncData);
  }, [favoritesPageData, favoritesSyncData, isFavoritesView]);

  const { data: pokemonData, isLoading: isPokemonLoading } = usePokemonList(
    {
      page: currentPage,
      limit: PAGE_SIZE,
      ...(selectedType && !isFavoritesView ? { type: selectedType } : {}),
      ...(nameLike ? { nameLike: nameLike.toLowerCase() } : {}),
    },
    { enabled: !isFavoritesView },
  );

  const favoritesPage = parseFavoritesListResponse(favoritesPageData);
  const pokemons: Pokemon[] = isFavoritesView
    ? favoritesPage.items
        .map(normalizeFavoriteToPokemon)
        .filter((pokemon): pokemon is Pokemon => pokemon !== null)
    : (pokemonData?.data ?? []);

  const totalPages = isFavoritesView
    ? favoritesPage.pagination.totalPages
    : (pokemonData?.meta?.pagination?.totalPages ?? 1);

  const totalResults = isFavoritesView
    ? favoritesPage.pagination.total
    : (pokemonData?.meta?.pagination?.total ?? 0);

  const isLoading = isFavoritesView ? isFavoritesPageLoading : isPokemonLoading;
  const isFavoritesLoading = isFavoritesView ? isFavoritesPageLoading : isFavoritesSyncLoading;

  const isPokemonSaved = (pokeapiId: number) => {
    if (!authenticated) {
      return false;
    }

    if (isFavoritesView) {
      return !optimisticRemoved.has(pokeapiId);
    }

    if (optimisticRemoved.has(pokeapiId)) {
      return false;
    }

    if (optimisticSaved.has(pokeapiId)) {
      return true;
    }

    return savedIdsFromServer.has(pokeapiId);
  };

  const isFavoritePending = (pokeapiId: number) => {
    if (addFavoriteMutation.isPending && addFavoriteMutation.variables?.pokeapiId === pokeapiId) {
      return true;
    }

    return removeFavoriteMutation.isPending && removeFavoriteMutation.variables === pokeapiId;
  };

  const toggleSaved = (pokeapiId: number) => {
    if (!authenticated) {
      infoAlert("Debés iniciar sesión para guardar favoritos");
      return;
    }

    if (isFavoritePending(pokeapiId) || isFavoritesLoading) {
      return;
    }

    const isSaved = isPokemonSaved(pokeapiId);

    if (isSaved) {
      setOptimisticRemoved((prev) => new Set(prev).add(pokeapiId));
      setOptimisticSaved((prev) => {
        const next = new Set(prev);
        next.delete(pokeapiId);
        return next;
      });

      removeFavoriteMutation.mutate(pokeapiId, {
        onSettled: () => {
          setOptimisticRemoved((prev) => {
            const next = new Set(prev);
            next.delete(pokeapiId);
            return next;
          });
        },
        onError: (mutationError) => {
          void errorAlert(
            getApiErrorMessage(mutationError, "No pudimos quitar el Pokémon de favoritos."),
          );
        },
      });

      return;
    }

    if (savedIdsFromServer.has(pokeapiId)) {
      return;
    }

    setOptimisticSaved((prev) => new Set(prev).add(pokeapiId));
    setOptimisticRemoved((prev) => {
      const next = new Set(prev);
      next.delete(pokeapiId);
      return next;
    });

    addFavoriteMutation.mutate(
      { pokeapiId },
      {
        onSettled: () => {
          setOptimisticSaved((prev) => {
            const next = new Set(prev);
            next.delete(pokeapiId);
            return next;
          });
        },
        onError: (mutationError) => {
          if (mutationError.httpStatus === 409) {
            return;
          }

          void errorAlert(
            getApiErrorMessage(mutationError, "No pudimos guardar el Pokémon en favoritos."),
          );
        },
      },
    );
  };

  return (
    <VStack
      className="glass glass-panel"
      align="stretch"
      gap={{ base: 4, md: 5 }}
      w="full"
      minW={0}
      h="full"
      minH={0}
      p={{ base: 4, md: 5 }}
      overflow="hidden"
    >
      <HStack justify="space-between" align="center" gap={3}>
        <HStack gap={3} minW={0}>
          <Box flexShrink={0} color={isFavoritesView ? "var(--pokemon-yellow)" : undefined}>
            {isFavoritesView ? <StarSaveIcon filled /> : <PokeballIcon />}
          </Box>
          <Text
            color="var(--text-primary)"
            fontSize={{ base: "sm", md: "md" }}
            fontWeight="700"
            lineHeight="1.3"
            truncate
          >
            {isFavoritesView ? "Mis Pokémon favoritos" : "Resultados de la búsqueda"}
          </Text>
        </HStack>

        {!isLoading && totalResults > 0 ? (
          <Box
            flexShrink={0}
            px={3}
            py={1}
            borderRadius="999px"
            bg="var(--accent-purple)"
            color="var(--text-primary)"
            fontSize={{ base: "10px", md: "xs" }}
            fontWeight="600"
            whiteSpace="nowrap"
          >
            {isFavoritesView ? `${totalResults} guardados` : `${totalResults} resultados`}
          </Box>
        ) : null}
      </HStack>

      <Box flex="1" minH={0} overflow="auto">
        {isLoading ? (
          <SimpleGrid columns={GRID_COLUMNS} gap={3}>
            {Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <Box
                key={index}
                h={{ base: "220px", md: "232px" }}
                borderRadius="18px"
                bg="var(--glass-bg-light)"
                border="1px solid var(--glass-border)"
                className="animate-pulse"
              />
            ))}
          </SimpleGrid>
        ) : pokemons.length > 0 ? (
          <SimpleGrid columns={GRID_COLUMNS} gap={3}>
            {pokemons.map((pokemon: Pokemon, index) => (
              <PokemonSearcherCard
                key={`pokemon-${pokemon.id}-${index}`}
                id={pokemon.id}
                name={pokemon.name}
                imageUrl={pokemon.imageUrl}
                type={pokemon.type}
                abilities={pokemon.abilities}
                isSaved={isPokemonSaved(pokemon.id)}
                isSaveLoading={isFavoritePending(pokemon.id)}
                onToggleSave={() => toggleSaved(pokemon.id)}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Box
            py={10}
            textAlign="center"
            color="var(--text-muted)"
            fontSize={{ base: "xs", md: "sm" }}
            letterSpacing="0.06em"
          >
            {isFavoritesView ? "NO TENÉS FAVORITOS GUARDADOS" : "NO HAY RESULTADOS PARA MOSTRAR"}
          </Box>
        )}
      </Box>

      <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </VStack>
  );
};
