"use client";

import { Box, Button, Flex } from "@chakra-ui/react";
import { type FC } from "react";

import { usePokemonTypes } from "@/hooks/usePokemonClient";
import { formatTypeFilterLabel } from "@/shared/constants/pokemon.constants";
import { type PokemonType } from "@/shared/types/api/pokemon.types";

type FiltersProps = {
  value: string | null;
  onChange: (slug: string | null) => void;
};

const SKELETON_COUNT = 6;

const FilterSkeleton = () => (
  <Flex gap={2} flexWrap="wrap" aria-busy="true" aria-label="Cargando filtros">
    {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
      <Box
        key={index}
        h="36px"
        w={{ base: "72px", md: "84px" }}
        borderRadius="999px"
        bg="rgba(255, 255, 255, 0.06)"
        className="animate-pulse"
      />
    ))}
  </Flex>
);

type FilterPillProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

const FilterPill: FC<FilterPillProps> = ({ label, isActive, onClick }) => (
  <Button
    h="36px"
    px={4}
    borderRadius="999px"
    fontSize="sm"
    fontWeight="500"
    flexShrink={0}
    bg={isActive ? "var(--accent-purple)" : "transparent"}
    color="var(--text-primary)"
    border="1px solid"
    borderColor={isActive ? "var(--accent-purple)" : "rgba(255, 255, 255, 0.16)"}
    onClick={onClick}
    _hover={{
      bg: isActive ? "var(--accent-purple-hover)" : "rgba(255, 255, 255, 0.04)",
      borderColor: isActive ? "var(--accent-purple-hover)" : "rgba(255, 255, 255, 0.24)",
    }}
  >
    {label}
  </Button>
);

export const Filters: FC<FiltersProps> = ({ value, onChange }) => {
  const { data, isLoading } = usePokemonTypes();
  const types = data?.data ?? [];

  if (isLoading) {
    return <FilterSkeleton />;
  }

  return (
    <Flex gap={2} flexWrap="wrap">
      <FilterPill label="Todos" isActive={value === null} onClick={() => onChange(null)} />

      {types.map((type: PokemonType) => (
        <FilterPill
          key={type.slug}
          label={formatTypeFilterLabel(type.slug, type.name)}
          isActive={value === type.slug}
          onClick={() => onChange(type.slug)}
        />
      ))}
    </Flex>
  );
};
