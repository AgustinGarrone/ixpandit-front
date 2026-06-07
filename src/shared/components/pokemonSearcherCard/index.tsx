"use client";

import { Box, Button, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { type FC } from "react";

import {
  formatPokemonId,
  typeLabels,
  typeSolidColors,
} from "@/shared/constants/pokemon.constants";
import { BookmarkIcon } from "@/shared/icons/svg-icons";
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

export const PokemonSearcherCard: FC<PokemonSearcherCardProps> = ({
  id,
  name,
  imageUrl,
  type,
  isSaved = false,
  onToggleSave,
}) => {
  const types = mapPokemonTypes(type);
  const primaryType = types[0]?.name.toLowerCase() ?? "unknown";
  const idBadgeColor = typeSolidColors[primaryType] ?? typeSolidColors.unknown;

  return (
    <Flex
      className="glass glass-panel"
      align="center"
      gap={{ base: 3, md: 4 }}
      w="full"
      minW={0}
      px={{ base: 3, md: 4 }}
      py={3}
      border={isSaved ? "2px solid var(--pokemon-yellow)" : "1px solid var(--glass-border)"}
      boxShadow={isSaved ? "var(--shadow-yellow)" : undefined}
    >
      <Flex
        align="center"
        justify="center"
        flexShrink={0}
        w={{ base: "56px", md: "72px" }}
        h={{ base: "56px", md: "72px" }}
      >
        <Image
          src={imageUrl || unknown.src}
          alt={name}
          maxW="full"
          maxH="full"
          objectFit="contain"
          filter="drop-shadow(0 4px 8px rgba(0, 0, 0, 0.35))"
        />
      </Flex>

      <Flex flex={1} minW={0} direction="column" gap={2}>
        <Text
          color="var(--text-primary)"
          fontSize={{ base: "10px", md: "12px" }}
          letterSpacing="0.08em"
          lineHeight="1.2"
          truncate
        >
          {name.toUpperCase()}
        </Text>

        <HStack gap={2} flexWrap="wrap">
          <Box
            px={2}
            py="2px"
            borderRadius="4px"
            bg={idBadgeColor}
            color="#0a0a0a"
            fontSize={{ base: "6px", md: "7px" }}
            letterSpacing="0.06em"
            lineHeight="1.6"
          >
            {formatPokemonId(id)}
          </Box>

          {types.map((pokemonType) => {
            const typeName = pokemonType.name.toLowerCase();

            return (
              <HStack key={pokemonType.id} gap={1}>
                <Image
                  src={`/icons/${typeName}.svg`}
                  alt={pokemonType.name}
                  w={{ base: "12px", md: "14px" }}
                  h={{ base: "12px", md: "14px" }}
                />
                <Text
                  color="var(--text-secondary)"
                  fontSize={{ base: "6px", md: "7px" }}
                  letterSpacing="0.06em"
                >
                  {typeLabels[typeName] ?? pokemonType.name.toUpperCase()}
                </Text>
              </HStack>
            );
          })}
        </HStack>
      </Flex>

      <Button
        className="glass-hover"
        aria-label={isSaved ? "Quitar de guardados" : "Guardar pokémon"}
        flexShrink={0}
        w={{ base: "36px", md: "40px" }}
        h={{ base: "36px", md: "40px" }}
        minW={{ base: "36px", md: "40px" }}
        p={0}
        borderRadius="8px"
        bg="var(--glass-bg-light)"
        border="1px solid"
        borderColor={isSaved ? "var(--pokemon-yellow)" : "var(--glass-border)"}
        onClick={onToggleSave}
        _hover={{
          bg: "var(--glass-bg-hover)",
          borderColor: isSaved ? "var(--pokemon-yellow-hover)" : "var(--glass-border-hover)",
        }}
      >
        <BookmarkIcon filled={isSaved} />
      </Button>
    </Flex>
  );
};
