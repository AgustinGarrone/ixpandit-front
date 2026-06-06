"use client";

import { Box, Button, Flex } from "@chakra-ui/react";
import { type FC, type ReactNode } from "react";

import { usePokemonTypes } from "@/hooks/usePokemonClient";
import { formatTypeFilterLabel } from "@/shared/constants/pokemon.constants";
import { type PokemonType } from "@/shared/types/api/pokemon.types";

type FiltersProps = {
  value: string | null;
  onChange: (slug: string | null) => void;
};

const SKELETON_COUNT = 6;

const filterRowStyles = {
  scrollbarWidth: "thin" as const,
  scrollbarColor: "rgba(255, 255, 255, 0.2) transparent",
  "&::-webkit-scrollbar": { height: "4px" },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "999px",
  },
};

const FilterSkeleton = () => (
  <Flex
    gap={2}
    flexWrap="nowrap"
    overflowX="auto"
    overflowY="hidden"
    pb={1}
    aria-busy="true"
    aria-label="Cargando filtros"
    css={filterRowStyles}
  >
    {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
      <Box
        key={index}
        h="36px"
        w={{ base: "72px", md: "84px" }}
        borderRadius="999px"
        bg="rgba(255, 255, 255, 0.06)"
        className="animate-pulse"
        flexShrink={0}
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

type FilterRowProps = {
  expanded: boolean;
  children: ReactNode;
};

const FilterRow: FC<FilterRowProps> = ({ expanded, children }) => (
  <Flex
    gap={2}
    flexWrap={expanded ? "wrap" : "nowrap"}
    overflowX={expanded ? "visible" : "auto"}
    overflowY="hidden"
    pb={expanded ? 0 : 1}
    css={expanded ? undefined : filterRowStyles}
  >
    {children}
  </Flex>
);

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
