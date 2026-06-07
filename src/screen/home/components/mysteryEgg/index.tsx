"use client";

import { Box, Button, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useMemo, useState } from "react";

import { useFavoritesClient, useFavoritesList } from "@/hooks/useFavoritesClient";
import { useRandomPokemon } from "@/hooks/usePokemonClient";
import { PokemonSearcherCard } from "@/shared/components/pokemonSearcherCard";
import { EggFeatureIcon } from "@/shared/icons/svg-icons";
import { type Pokemon } from "@/shared/types/api/models";
import { errorAlert } from "@/shared/utils/alerts";
import { getApiErrorMessage } from "@/shared/utils/api-error.utils";
import { getFavoritePokeapiIds } from "@/shared/utils/favorites.utils";
import { playSound, playSuccess } from "@/shared/utils/fx";

import pokemonEgg from "../../../../../public/pokemonEgg.png";

type Phase = "idle" | "opening" | "revealed";

const OPENING_DURATION_MS = 1400;
const FAVORITES_SYNC_LIMIT = 200;

export const MysteryEggPanel = () => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [optimisticSaved, setOptimisticSaved] = useState(false);
  const [optimisticRemoved, setOptimisticRemoved] = useState(false);
  const randomMutation = useRandomPokemon();
  const { addFavoriteMutation, removeFavoriteMutation } = useFavoritesClient();
  const { data: favoritesData, isLoading: isFavoritesLoading } = useFavoritesList(
    { page: 1, limit: FAVORITES_SYNC_LIMIT },
    { enabled: phase === "revealed" && pokemon !== null },
  );

  const savedIdsFromServer = useMemo(() => getFavoritePokeapiIds(favoritesData), [favoritesData]);

  const isBusy = phase === "opening" || randomMutation.isPending;

  const resetFavoriteOptimism = () => {
    setOptimisticSaved(false);
    setOptimisticRemoved(false);
  };

  const isPokemonSaved = (pokeapiId: number) => {
    if (optimisticRemoved) {
      return false;
    }

    if (optimisticSaved) {
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
    if (isFavoritePending(pokeapiId) || isFavoritesLoading) {
      return;
    }

    const isSaved = isPokemonSaved(pokeapiId);

    if (isSaved) {
      setOptimisticRemoved(true);
      setOptimisticSaved(false);

      removeFavoriteMutation.mutate(pokeapiId, {
        onSettled: () => setOptimisticRemoved(false),
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

    setOptimisticSaved(true);
    setOptimisticRemoved(false);

    addFavoriteMutation.mutate(
      { pokeapiId },
      {
        onSettled: () => setOptimisticSaved(false),
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

  const handleOpenEgg = () => {
    if (isBusy) {
      return;
    }

    playSound();
    setPhase("opening");

    randomMutation.mutate(undefined, {
      onSuccess: (data) => {
        window.setTimeout(() => {
          playSuccess();
          resetFavoriteOptimism();
          setPokemon(data);
          setPhase("revealed");
        }, OPENING_DURATION_MS);
      },
      onError: (error) => {
        setPhase("idle");
        void errorAlert(getApiErrorMessage(error, "No pudimos abrir el huevo. Intentá de nuevo."));
      },
    });
  };

  const handleTryAgain = () => {
    playSound();
    setPhase("idle");
    setPokemon(null);
    resetFavoriteOptimism();
    randomMutation.reset();
  };

  return (
    <VStack
      className="glass glass-panel"
      align="stretch"
      gap={{ base: 5, md: 6 }}
      w="full"
      minW={0}
      h="full"
      minH={0}
      p={{ base: 4, md: 6 }}
      overflow="auto"
    >
      <HStack justify="space-between" align="center" gap={3}>
        <HStack gap={3} minW={0}>
          <Box flexShrink={0} color="var(--accent-purple)">
            <EggFeatureIcon />
          </Box>
          <Text
            color="var(--text-primary)"
            fontSize={{ base: "sm", md: "md" }}
            fontWeight="700"
            lineHeight="1.3"
            truncate
          >
            Huevo Misterioso
          </Text>
        </HStack>
      </HStack>

      <VStack
        align="center"
        gap={{ base: 5, md: 6 }}
        flex="1"
        justify="center"
        py={{ base: 2, md: 4 }}
      >
        {phase !== "revealed" ? (
          <>
            <VStack align="center" gap={3} maxW="420px" textAlign="center" px={2}>
              <Text
                color="var(--text-primary)"
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight="700"
                lineHeight="1.35"
              >
                ¿Qué Pokémon te espera adentro?
              </Text>
              <Text color="var(--text-muted)" fontSize={{ base: "sm", md: "md" }} lineHeight="1.55">
                Abrí el huevo y descubrí un Pokémon aleatorio del catálogo completo de PokeAPI.
              </Text>
            </VStack>

            <Flex
              align="center"
              justify="center"
              position="relative"
              w={{ base: "220px", md: "260px" }}
              h={{ base: "220px", md: "260px" }}
            >
              <Box
                position="absolute"
                inset="12%"
                borderRadius="50%"
                bg="radial-gradient(circle, rgba(124, 58, 237, 0.35) 0%, transparent 70%)"
                className={phase === "opening" ? "mystery-egg-aura" : undefined}
                pointerEvents="none"
              />

              <Image
                src={pokemonEgg.src}
                alt="Huevo misterioso"
                w="full"
                h="full"
                objectFit="contain"
                className={
                  phase === "opening"
                    ? "mystery-egg-opening"
                    : phase === "idle"
                      ? "mystery-egg-float"
                      : undefined
                }
                draggable={false}
              />
            </Flex>

            <Button
              h="48px"
              px={8}
              borderRadius="14px"
              bg="var(--accent-purple)"
              color="var(--text-primary)"
              fontSize="sm"
              fontWeight="700"
              loading={isBusy}
              disabled={isBusy}
              onClick={handleOpenEgg}
              boxShadow="0 0 24px rgba(124, 58, 237, 0.35)"
              _hover={{ bg: "var(--accent-purple-hover)" }}
              _disabled={{ opacity: 0.7, cursor: "not-allowed" }}
            >
              {isBusy ? "Abriendo huevo..." : "Abrir huevo"}
            </Button>
          </>
        ) : null}

        {phase === "revealed" && pokemon ? (
          <VStack align="center" gap={5} w="full" maxW="360px" className="mystery-pokemon-reveal">
            <VStack align="center" gap={2} textAlign="center">
              <Text
                color="var(--text-primary)"
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight="700"
              >
                ¡Lo encontraste!
              </Text>
              <Text color="var(--text-muted)" fontSize="sm">
                Este Pokémon apareció dentro del huevo.
              </Text>
            </VStack>

            <Box w="full">
              <PokemonSearcherCard
                id={pokemon.id}
                name={pokemon.name}
                imageUrl={pokemon.imageUrl}
                type={pokemon.type}
                abilities={pokemon.abilities}
                isSaved={isPokemonSaved(pokemon.id)}
                isSaveLoading={isFavoritePending(pokemon.id)}
                onToggleSave={() => toggleSaved(pokemon.id)}
              />
            </Box>

            <Button
              h="44px"
              px={6}
              borderRadius="12px"
              bg="rgba(255, 255, 255, 0.06)"
              border="1px solid rgba(255, 255, 255, 0.12)"
              color="var(--text-primary)"
              fontSize="sm"
              fontWeight="600"
              onClick={handleTryAgain}
              _hover={{ bg: "rgba(255, 255, 255, 0.1)", borderColor: "rgba(255, 255, 255, 0.2)" }}
            >
              Abrir otro huevo
            </Button>
          </VStack>
        ) : null}
      </VStack>
    </VStack>
  );
};
