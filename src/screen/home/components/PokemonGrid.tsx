"use client";

import { Box, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

import { usePokemonList } from "@/hooks/usePokemonClient";
import { Paginator } from "@/shared/components/paginator";
import { PokemonSearcherCard } from "@/shared/components/pokemonSearcherCard";
import { PokeballIcon } from "@/shared/icons/svg-icons";
import { type Pokemon } from "@/shared/types/api/models";

const PAGE_SIZE = 8;

const GRID_COLUMNS = { base: 2, md: 3, xl: 4 };

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
  const totalResults = data?.meta?.pagination?.total ?? 0;

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
      <HStack justify="space-between" align="center" gap={3}>
        <HStack gap={3} minW={0}>
          <Box flexShrink={0} transform="scale(1.1)" transformOrigin="center">
            <PokeballIcon />
          </Box>
          <Text
            color="var(--text-primary)"
            fontSize={{ base: "sm", md: "md" }}
            fontWeight="700"
            lineHeight="1.3"
            truncate
          >
            Resultados de la búsqueda
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
            {totalResults} resultados
          </Box>
        ) : null}
      </HStack>

      <Box flex="1" minH={0} overflow="auto">
        {isLoading ? (
          <SimpleGrid columns={GRID_COLUMNS} gap={3}>
            {Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <Box
                key={index}
                h={{ base: "180px", md: "196px" }}
                borderRadius="16px"
                bg="var(--glass-bg-light)"
                border="1px solid var(--glass-border)"
                className="animate-pulse"
              />
            ))}
          </SimpleGrid>
        ) : pokemons.length > 0 ? (
          <SimpleGrid columns={GRID_COLUMNS} gap={3}>
            {pokemons.map((pokemon: Pokemon) => (
              <PokemonSearcherCard
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                imageUrl={pokemon.imageUrl}
                type={pokemon.type}
                isSaved={savedIds.has(pokemon.id)}
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
            NO HAY RESULTADOS PARA MOSTRAR
          </Box>
        )}
      </Box>

      <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </VStack>
  );
};
