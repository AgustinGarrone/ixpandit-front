"use client";

import { Box, Button, Flex, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { type ChangeEvent, type FC, useState } from "react";

import { Filters } from "@/shared/components/searcher/filters";

import { CloseIcon, PokeballIcon, SearchIcon } from "../../icons/svg-icons";

const MAX_QUERY_LENGTH = 20;
const VALID_QUERY_CHARS = /[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\-'.]/g;

const sanitizeQuery = (value: string): string =>
  value.replace(VALID_QUERY_CHARS, "").slice(0, MAX_QUERY_LENGTH);

type SearcherProps = {
  selectedType: string | null;
  nameLike: string | null;
  onTypeChange: (slug: string | null) => void;
  onNameLikeChange: (nameLike: string | null) => void;
};

export const Searcher: FC<SearcherProps> = ({
  selectedType,
  nameLike,
  onTypeChange,
  onNameLikeChange,
}) => {
  const [query, setQuery] = useState<string | null>(null);
  const hasActiveSearch = nameLike !== null;

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeQuery(event.target.value);
    setQuery(sanitized.length > 0 ? sanitized : null);

    if (sanitized.trim().length === 0) {
      onNameLikeChange(null);
    }
  };

  const handleSearch = () => {
    const trimmed = (query ?? "").trim();
    onNameLikeChange(trimmed.length > 0 ? trimmed : null);
  };

  const handleClearSearch = () => {
    setQuery(null);
    onNameLikeChange(null);
  };
  return (
    <VStack align="stretch" gap={{ base: 2.5, md: 3 }} w="full" minW={0}>
      <HStack align="center" gap={2.5}>
        <Box flexShrink={0} transform="scale(1)" transformOrigin="center">
          <PokeballIcon />
        </Box>
        <Text
          color="var(--text-primary)"
          fontSize={{ base: "md", md: "lg" }}
          fontWeight="700"
          lineHeight="1.3"
        >
          ¿Qué Pokémon estás buscando? ✨
        </Text>
      </HStack>

      <Box
        bg="var(--bg-secondary)"
        border="1px solid rgba(255, 255, 255, 0.08)"
        borderRadius="16px"
        p={{ base: 3, md: 3.5 }}
        w="full"
        minW={0}
      >
        <VStack align="stretch" gap={3}>
          <Flex
            align="stretch"
            direction={{ base: "column", sm: "row" }}
            gap={2}
            bg="rgba(0, 0, 0, 0.28)"
            border="1px solid rgba(255, 255, 255, 0.08)"
            borderRadius="12px"
            p={1.5}
            minW={0}
            _focusWithin={{
              outline: "none",
              boxShadow: "none",
              borderColor: "rgba(255, 255, 255, 0.08)",
            }}
          >
            <Flex align="center" flex={1} gap={2.5} px={2.5} minW={0}>
              <SearchIcon />
              <Input
                unstyled
                flex={1}
                minW={0}
                h={{ base: "40px", md: "42px" }}
                value={query ?? ""}
                maxLength={MAX_QUERY_LENGTH}
                onChange={handleQueryChange}
                placeholder="Ingresá el nombre a buscar"
                color="var(--text-primary)"
                fontSize={{ base: "sm", md: "md" }}
                outline="none"
                _placeholder={{ color: "var(--text-muted)" }}
                _focus={{ outline: "none", boxShadow: "none", border: "none" }}
                _focusVisible={{ outline: "none", boxShadow: "none", border: "none" }}
              />
              {hasActiveSearch ? (
                <Box
                  as="button"
                  aria-label="Limpiar búsqueda"
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                  w="28px"
                  h="28px"
                  borderRadius="full"
                  color="var(--text-muted)"
                  bg="rgba(255, 255, 255, 0.06)"
                  transition="background 0.15s ease, color 0.15s ease"
                  _hover={{ bg: "rgba(255, 255, 255, 0.12)", color: "var(--text-primary)" }}
                  onClick={handleClearSearch}
                >
                  <CloseIcon />
                </Box>
              ) : null}
            </Flex>

            <Button
              h={{ base: "40px", md: "42px" }}
              minW={{ base: "full", sm: "120px" }}
              px={4}
              borderRadius="10px"
              bg="var(--pokemon-yellow)"
              color="#0a0a0a"
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="700"
              boxShadow="var(--shadow-yellow)"
              flexShrink={0}
              _hover={{ bg: "var(--pokemon-yellow-hover)" }}
              onClick={handleSearch}
            >
              <HStack gap={2}>
                <Box color="#0a0a0a">
                  <SearchIcon />
                </Box>
                <Text>Buscar</Text>
              </HStack>
            </Button>
          </Flex>

          <Filters value={selectedType} onChange={onTypeChange} />
        </VStack>
      </Box>
    </VStack>
  );
};
