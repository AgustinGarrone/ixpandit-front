"use client";

import { Box } from "@chakra-ui/react";
import { type FC } from "react";

import { usePokemonTypes } from "@/hooks/usePokemonClient";
import { formatTypeFilterLabel } from "@/shared/constants/pokemon.constants";
import { type PokemonType } from "@/shared/types/api/pokemon.types";

import { FilterSkeleton } from "./constants";
import { FilterRow } from "./constants";
import { FilterPill } from "./constants";

type FiltersProps = {
  value: string | null;
  onChange: (slug: string | null) => void;
};

export const Filters: FC<FiltersProps> = ({ value, onChange }) => {
  const { data, isLoading } = usePokemonTypes();
  const types = data?.data ?? [];

  if (isLoading) {
    return <FilterSkeleton />;
  }

  return (
    <Box>
      <FilterRow expanded={false}>
        <FilterPill label="Todos" isActive={value === null} onClick={() => onChange(null)} />

        {types.map((type: PokemonType) => (
          <FilterPill
            key={type.slug}
            label={formatTypeFilterLabel(type.slug, type.name)}
            isActive={value === type.slug}
            onClick={() => onChange(type.slug)}
          />
        ))}
      </FilterRow>
    </Box>
  );
};
