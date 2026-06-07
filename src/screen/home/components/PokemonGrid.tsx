"use client";

import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

import { usePokemonList } from "@/hooks/usePokemonClient";
import { Paginator } from "@/shared/components/paginator";
import { PokemonSearcherCard } from "@/shared/components/pokemonSearcherCard";
import { PokeballIcon } from "@/shared/icons/svg-icons";
import { type Pokemon } from "@/shared/types/api/models";

const PAGE_SIZE = 4;

type PokemonGridProps = {
  selectedType: string | null;
};

export const PokemonGrid = ({ selectedType }: PokemonGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [savedIds, setSavedIds] = useState<Set<number>>(() => new Set());
  const [prevSelectedType, setPrevSelectedType] = useState(selectedType);

  if (selectedType !== prevSelectedType) {
    setPrevSelectedType(selectedType);
    setCurrentPage(1);
  }

  const { data, isLoading } = usePokemonList({
    page: currentPage,
    limit: PAGE_SIZE,
    ...(selectedType ? { type: selectedType } : {}),
  });

  const pokemons = data?.data ?? [];
  const totalPages = data?.meta?.pagination?.totalPages ?? 1;

  const toggleSaved = (id: number) => {
    setSavedIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
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
      <HStack gap={3}>
        <Box flexShrink={0} transform="scale(1.1)" transformOrigin="center">
          <PokeballIcon />
        </Box>
        <Text
          color="var(--text-primary)"
          fontSize={{ base: "10px", md: "12px" }}
          letterSpacing="0.1em"
          lineHeight="1.4"
        >
          RESULTADOS DE LA BÚSQUEDA
        </Text>
      </HStack>

      <VStack align="stretch" gap={4} flex="1" minH={0} overflow="auto">
        {isLoading ? (
          Array.from({ length: PAGE_SIZE }).map((_, index) => (
            <Box
              key={index}
              h={{ base: "72px", md: "88px" }}
              borderRadius="12px"
              bg="var(--glass-bg-light)"
              border="1px solid var(--glass-border)"
              className="animate-pulse"
            />
          ))
        ) : pokemons.length > 0 ? (
          pokemons.map((pokemon: Pokemon) => (
            <PokemonSearcherCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              imageUrl={pokemon.imageUrl}
              type={pokemon.type}
              isSaved={savedIds.has(pokemon.id)}
              onToggleSave={() => toggleSaved(pokemon.id)}
            />
          ))
        ) : (
          <Box
            py={10}
            textAlign="center"
            color="var(--text-muted)"
            fontSize={{ base: "7px", md: "8px" }}
            letterSpacing="0.08em"
          >
            NO HAY RESULTADOS PARA MOSTRAR
          </Box>
        )}
      </VStack>

      <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </VStack>
  );
};
