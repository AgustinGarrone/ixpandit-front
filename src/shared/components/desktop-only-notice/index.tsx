"use client";

import { Box, Flex, Text, VStack } from "@chakra-ui/react";

import { PokeballIcon } from "@/shared/icons/svg-icons";

const DesktopIcon = () => (
  <Box as="span" display="inline-flex" color="var(--accent-purple)" aria-hidden>
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect
        x="6"
        y="10"
        width="36"
        height="26"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M18 40h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 36v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M14 18h20M14 23h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  </Box>
);

export const DesktopOnlyNotice = () => (
  <Flex
    className="glass glass-panel"
    direction="column"
    align="center"
    justify="center"
    flex="1"
    minH={0}
    w="full"
    p={{ base: 6, md: 8 }}
    textAlign="center"
    gap={5}
  >
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="72px"
      h="72px"
      borderRadius="20px"
      bg="rgba(124, 58, 237, 0.14)"
      border="1px solid rgba(124, 58, 237, 0.32)"
      boxShadow="0 0 24px rgba(124, 58, 237, 0.2)"
    >
      <DesktopIcon />
    </Box>

    <VStack gap={3} maxW="360px">
      <Flex align="center" justify="center" gap={2}>
        <PokeballIcon />
        <Text
          color="var(--text-primary)"
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="800"
          lineHeight="1.25"
          letterSpacing="-0.02em"
        >
          Disponible en desktop
        </Text>
      </Flex>

      <Text color="var(--text-muted)" fontSize={{ base: "sm", md: "md" }} lineHeight="1.6">
        Esta experiencia está optimizada para pantallas grandes. Abrí Pokémon Finder desde una
        computadora para buscar Pokémon, guardar favoritos y abrir huevos misteriosos.
      </Text>
    </VStack>

    <Box
      px={4}
      py={2}
      borderRadius="999px"
      bg="rgba(255, 203, 5, 0.12)"
      border="1px solid rgba(255, 203, 5, 0.28)"
    >
      <Text color="var(--pokemon-yellow)" fontSize="xs" fontWeight="600" letterSpacing="0.04em">
        Ancho mínimo recomendado: 1024px
      </Text>
    </Box>
  </Flex>
);
