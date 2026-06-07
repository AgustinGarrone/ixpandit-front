"use client";

import { Box, Button, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { type FC } from "react";

import {
  formatPokemonId,
  typeLabels,
  typeSolidColors,
} from "@/shared/constants/pokemon.constants";
import { StarSaveIcon } from "@/shared/icons/svg-icons";
import { mapPokemonTypes } from "@/shared/utils/pokemon.utils";

import unknown from "../../../../public/unknown.png";

type PokemonSearcherCardProps = {
  id: number;
  name: string;
  imageUrl: string;
  type: string;
  isSaved?: boolean;
  onToggleSave?: () => void;
};

const getTypeTextColor = (typeName: string) => {
  const lightTextTypes = new Set([
    "fighting",
    "flying",
    "poison",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "water",
    "fire",
  ]);

  return lightTextTypes.has(typeName) ? "#ffffff" : "#0a0a0a";
};

const formatPokemonName = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

export const PokemonSearcherCard: FC<PokemonSearcherCardProps> = ({
  id,
  name,
  imageUrl,
  type,
  isSaved = false,
  onToggleSave,
}) => {
  const types = mapPokemonTypes(type);

  return (
    <VStack
      className="glass glass-panel"
      align="stretch"
      gap={3}
      w="full"
      minW={0}
      p={3}
      borderRadius="16px"
      border={isSaved ? "2px solid var(--pokemon-yellow)" : "1px solid var(--glass-border)"}
      boxShadow={isSaved ? "var(--shadow-yellow)" : undefined}
      bg="rgba(0, 0, 0, 0.22)"
    >
      <Flex align="flex-start" justify="space-between" gap={2}>
        <Box
          px={2}
          py="2px"
          borderRadius="6px"
          bg={isSaved ? "#ffcb05" : "rgba(255, 255, 255, 0.12)"}
          color={isSaved ? "#0a0a0a" : "var(--text-secondary)"}
          fontSize="10px"
          fontWeight="700"
          letterSpacing="0.04em"
          lineHeight="1.6"
        >
          {formatPokemonId(id)}
        </Box>

        <Button
          aria-label={isSaved ? "Quitar de favoritos" : "Guardar en favoritos"}
          flexShrink={0}
          w="28px"
          h="28px"
          minW="28px"
          p={0}
          borderRadius="8px"
          bg="transparent"
          border="none"
          onClick={onToggleSave}
          _hover={{ bg: "rgba(255, 255, 255, 0.06)" }}
        >
          <StarSaveIcon filled={isSaved} />
        </Button>
      </Flex>

      <Flex align="center" justify="center" minH={{ base: "88px", md: "96px" }} py={1}>
        <Image
          src={imageUrl || unknown.src}
          alt={name}
          maxW={{ base: "72px", md: "84px" }}
          maxH={{ base: "72px", md: "84px" }}
          objectFit="contain"
          filter="drop-shadow(0 6px 12px rgba(0, 0, 0, 0.35))"
        />
      </Flex>

      <VStack align="stretch" gap={2}>
        <Text
          color="var(--text-primary)"
          fontSize={{ base: "sm", md: "md" }}
          fontWeight="700"
          lineHeight="1.2"
          truncate
        >
          {formatPokemonName(name)}
        </Text>

        <HStack gap={1.5} flexWrap="wrap">
          {types.map((pokemonType) => {
            const typeName = pokemonType.name.toLowerCase();
            const badgeColor = typeSolidColors[typeName] ?? typeSolidColors.unknown;

            return (
              <Box
                key={pokemonType.id}
                px={2}
                py="2px"
                borderRadius="999px"
                bg={badgeColor}
                color={getTypeTextColor(typeName)}
                fontSize="9px"
                fontWeight="700"
                letterSpacing="0.04em"
                lineHeight="1.5"
              >
                {typeLabels[typeName] ?? pokemonType.name.toUpperCase()}
              </Box>
            );
          })}
        </HStack>
      </VStack>
    </VStack>
  );
};
