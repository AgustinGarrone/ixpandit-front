"use client";

import { Box, Button, Flex, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { type FC, useState } from "react";

import { Filters } from "@/shared/components/searcher/filters";

import { PokeballIcon, SearchIcon } from "../../icons/svg-icons";

type SearcherProps = {
  selectedType: string | null;
  onTypeChange: (slug: string | null) => void;
};

export const Searcher: FC<SearcherProps> = ({ selectedType, onTypeChange }) => {
  const [query, setQuery] = useState("");

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
          >
            <Flex align="center" flex={1} gap={2.5} px={2.5} minW={0}>
              <SearchIcon />
              <Input
                unstyled
                flex={1}
                minW={0}
                h={{ base: "40px", md: "42px" }}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ingresá el nombre a buscar"
                color="var(--text-primary)"
                fontSize={{ base: "sm", md: "md" }}
                _placeholder={{ color: "var(--text-muted)" }}
              />
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
