"use client";

import { Box, Button, Flex, HStack, Input, Text, VStack } from "@chakra-ui/react";

import { PokeballIcon, SearchIcon } from "../icons/svg-icons";

export const Searcher = () => {
  return (
    <VStack align="stretch" gap={{ base: 5, md: 6 }} w="full">
      <HStack align="center" gap={{ base: 4, md: 5 }}>
        <Box flexShrink={0} transform="scale(1.35)" transformOrigin="center">
          <PokeballIcon />
        </Box>

        <VStack align="flex-start" gap={1}>
          <Text
            color="var(--text-primary)"
            fontSize={{ base: "12px", md: "16px" }}
            letterSpacing="0.1em"
            lineHeight="1.4"
          >
            POKEMON FINDER
          </Text>
          <Text
            color="var(--text-primary)"
            fontSize={{ base: "7px", md: "8px" }}
            letterSpacing="0.06em"
            lineHeight="1.6"
          >
            EL QUE QUIERE POKEMONS, QUE LOS BUSQUE.
          </Text>
        </VStack>
      </HStack>

      <Flex
        align={{ base: "stretch", sm: "center" }}
        direction={{ base: "column", sm: "row" }}
        gap={3}
      >
        <Flex
          className="glass glass-panel"
          align="center"
          flex={1}
          gap={3}
          px={4}
          h={{ base: "52px", md: "56px" }}
          minW={0}
        >
          <SearchIcon />
          <Input
            unstyled
            flex={1}
            h="full"
            placeholder="INGRESA EL NOMBRE A BUSCAR"
            color="var(--text-primary)"
            fontSize={{ base: "7px", md: "8px" }}
            letterSpacing="0.08em"
            _placeholder={{ color: "var(--text-muted)" }}
          />
        </Flex>

        <Button
          h={{ base: "52px", md: "56px" }}
          minW={{ base: "full", sm: "140px" }}
          px={8}
          borderRadius="12px"
          bg="var(--pokemon-yellow)"
          color="#0a0a0a"
          fontSize={{ base: "8px", md: "9px" }}
          letterSpacing="0.1em"
          boxShadow="var(--shadow-yellow)"
          flexShrink={0}
          _hover={{ bg: "var(--pokemon-yellow-hover)" }}
        >
          BUSCAR
        </Button>
      </Flex>
    </VStack>
  );
};
