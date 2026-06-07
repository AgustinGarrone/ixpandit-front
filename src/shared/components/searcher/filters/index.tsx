"use client";

import { Box } from "@chakra-ui/react";
import { type FC } from "react";

import { useAuth } from "@/hooks/useAuth";
import { usePokemonTypes } from "@/hooks/usePokemonClient";
import { FAVORITES_FILTER } from "@/shared/constants/filter.constants";
import { formatTypeFilterLabel } from "@/shared/constants/pokemon.constants";
import { type PokemonType } from "@/shared/types/api/pokemon.types";
import { infoAlert } from "@/shared/utils/alerts";

import { FavoritesFilterPill, FilterPill, FilterRow, FilterSkeleton } from "./constants";

type FiltersProps = {
  value: string | null;
  onChange: (slug: string | null) => void;
};

export const Filters: FC<FiltersProps> = ({ value, onChange }) => {
  const { hasHydrated, isAuthenticated } = useAuth();
  const authenticated = hasHydrated && isAuthenticated();
  const { data, isLoading } = usePokemonTypes();
  const types = data?.data ?? [];

  const handleFavoritesClick = () => {
    if (!authenticated) {
      infoAlert("Debés iniciar sesión para ver tus favoritos");
      return;
    }

    onChange(FAVORITES_FILTER);
  };

  if (isLoading) {
    return <FilterSkeleton />;
  }

  return (
    <Box>
      <FilterRow expanded={false}>
        <FavoritesFilterPill isActive={value === FAVORITES_FILTER} onClick={handleFavoritesClick} />

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
