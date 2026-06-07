"use client";

import { Box, Button, Flex, HStack, Image, Popover, Text, VStack } from "@chakra-ui/react";
import { type FC } from "react";

import {
  formatPokemonId,
  typeLabels,
  typeSolidColors,
} from "@/shared/constants/pokemon.constants";
import { InfoIcon, StarSaveIcon } from "@/shared/icons/svg-icons";
import { mapPokemonTypes } from "@/shared/utils/pokemon.utils";

import unknown from "../../../../public/unknown.png";

type PokemonSearcherCardProps = {
  id: number;
  name: string;
  imageUrl: string;
  type: string;
  abilities?: string[];
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

const formatAbilityName = (value: string) =>
  value
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

const SPRITE_BOX = { base: "112px", md: "120px" } as const;

type AbilitiesPanelProps = {
  abilities: string[];
  glowColor: string;
};

const AbilitiesPanel: FC<AbilitiesPanelProps> = ({ abilities, glowColor }) => (
  <VStack align="stretch" gap={2}>
    <Text
      color="var(--text-muted)"
      fontSize="9px"
      fontWeight="700"
      letterSpacing="0.12em"
    >
      HABILIDADES
    </Text>

    {abilities.length > 0 ? (
      <VStack align="stretch" gap={1}>
        {abilities.map((ability) => (
          <HStack key={ability} align="center" gap={2}>
            <Box
              w="5px"
              h="5px"
              borderRadius="full"
              bg={glowColor}
              boxShadow={`0 0 8px ${glowColor}`}
              flexShrink={0}
            />
            <Text
              color="var(--text-primary)"
              fontSize="11px"
              fontWeight="600"
              lineHeight="1.35"
            >
              {formatAbilityName(ability)}
            </Text>
          </HStack>
        ))}
      </VStack>
    ) : (
      <Text color="var(--text-muted)" fontSize="10px" fontStyle="italic">
        Sin datos
      </Text>
    )}
  </VStack>
);

export const PokemonSearcherCard: FC<PokemonSearcherCardProps> = ({
  id,
  name,
  imageUrl,
  type,
  abilities = [],
  isSaved = false,
  onToggleSave,
}) => {
  const types = mapPokemonTypes(type);
  const primaryType = types[0]?.name.toLowerCase() ?? "unknown";
  const glowColor = typeSolidColors[primaryType] ?? typeSolidColors.unknown;
  const hasAbilities = abilities.length > 0;

  return (
    <VStack
      align="stretch"
      gap={0}
      w="full"
      minW={0}
      borderRadius="18px"
      overflow="hidden"
      border={isSaved ? "2px solid #ffcb05" : "1px solid rgba(255, 255, 255, 0.08)"}
      boxShadow={
        isSaved
          ? "0 0 24px rgba(255, 203, 5, 0.22), inset 0 1px 0 rgba(255,255,255,0.06)"
          : "0 12px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.05)"
      }
      bg="linear-gradient(180deg, rgba(10, 14, 30, 0.98) 0%, rgba(6, 10, 22, 0.99) 100%)"
      transition="transform 0.2s ease, box-shadow 0.2s ease"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: isSaved
          ? "0 0 28px rgba(255, 203, 5, 0.28), inset 0 1px 0 rgba(255,255,255,0.08)"
          : "0 16px 36px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255,255,255,0.07)",
      }}
    >
      <Box position="relative" px={3} pt={3} pb={2}>
        <Flex align="flex-start" justify="space-between" gap={2} position="relative" zIndex={2}>
          <Box
            px={2.5}
            py="3px"
            borderRadius="999px"
            bg="rgba(255, 255, 255, 0.08)"
            border="1px solid rgba(255, 255, 255, 0.1)"
            color={isSaved ? "#ffcb05" : "rgba(255, 255, 255, 0.82)"}
            fontSize="10px"
            fontWeight="700"
            letterSpacing="0.06em"
            lineHeight="1.4"
          >
            {formatPokemonId(id)}
          </Box>

          <HStack gap={1.5}>
            {hasAbilities ? (
              <Popover.Root positioning={{ placement: "top" }}>
                <Popover.Trigger asChild>
                  <Button
                    aria-label="Ver habilidades"
                    flexShrink={0}
                    w="30px"
                    h="30px"
                    minW="30px"
                    p={0}
                    borderRadius="10px"
                    bg="rgba(255, 255, 255, 0.04)"
                    border="1px solid rgba(255, 255, 255, 0.08)"
                    color="var(--text-muted)"
                    _hover={{
                      bg: "rgba(255, 255, 255, 0.1)",
                      color: glowColor,
                      borderColor: `${glowColor}88`,
                      boxShadow: `0 0 14px ${glowColor}44`,
                    }}
                  >
                    <InfoIcon />
                  </Button>
                </Popover.Trigger>
                <Popover.Positioner>
                  <Popover.Content
                    className="glass glass-panel"
                    w="180px"
                    p={3}
                    bg="rgba(8, 12, 24, 0.96)"
                    border={`1px solid ${glowColor}55`}
                    boxShadow={`0 12px 32px rgba(0,0,0,0.45), 0 0 24px ${glowColor}33`}
                    borderRadius="14px"
                    _focusVisible={{ outline: "none" }}
                  >
                    <AbilitiesPanel abilities={abilities} glowColor={glowColor} />
                  </Popover.Content>
                </Popover.Positioner>
              </Popover.Root>
            ) : null}

            <Button
              aria-label={isSaved ? "Quitar de favoritos" : "Guardar en favoritos"}
              flexShrink={0}
              w="30px"
              h="30px"
              minW="30px"
              p={0}
              borderRadius="10px"
              bg="rgba(255, 255, 255, 0.04)"
              border="1px solid rgba(255, 255, 255, 0.08)"
              onClick={onToggleSave}
              _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
            >
              <StarSaveIcon filled={isSaved} />
            </Button>
          </HStack>
        </Flex>

        <Flex
          align="flex-end"
          justify="center"
          position="relative"
          w={SPRITE_BOX}
          h={SPRITE_BOX}
          mx="auto"
          mt={2}
          css={{
            "& img": {
              transition: "transform 0.25s ease, filter 0.25s ease",
            },
          }}
          _hover={{
            "& img": {
              transform: "scale(1.06) translateY(-3px)",
              filter: `drop-shadow(0 16px 24px rgba(0, 0, 0, 0.65)) drop-shadow(0 0 32px ${glowColor})`,
            },
          }}
        >
          <Box
            position="absolute"
            inset={0}
            borderRadius="50%"
            bg={`radial-gradient(circle at 50% 62%, ${glowColor}66 0%, ${glowColor}28 34%, transparent 72%)`}
            filter="blur(10px)"
            pointerEvents="none"
          />
          <Box
            position="absolute"
            inset="12% 14%"
            borderRadius="50%"
            bg={`radial-gradient(circle at 50% 58%, ${glowColor}44 0%, transparent 68%)`}
            pointerEvents="none"
          />
          <Box
            position="absolute"
            bottom="4%"
            left="50%"
            transform="translateX(-50%)"
            w="72%"
            h="14px"
            borderRadius="50%"
            bg={`radial-gradient(ellipse, ${glowColor}aa 0%, ${glowColor}44 42%, transparent 78%)`}
            filter="blur(5px)"
            pointerEvents="none"
          />

          <Image
            src={imageUrl || unknown.src}
            alt={name}
            position="relative"
            zIndex={1}
            w="full"
            h="full"
            objectFit="contain"
            objectPosition="center bottom"
            style={{ imageRendering: "pixelated" }}
            filter={`drop-shadow(0 12px 20px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 26px ${glowColor}88)`}
          />
        </Flex>
      </Box>

      <VStack align="stretch" gap={2.5} px={3} pb={3}>
        <Text
          color="var(--text-primary)"
          fontSize={{ base: "md", md: "lg" }}
          fontWeight="800"
          lineHeight="1.1"
          textAlign="center"
          letterSpacing="-0.02em"
          truncate
        >
          {formatPokemonName(name)}
        </Text>

        <Flex justify="center" gap={1.5} flexWrap="wrap">
          {types.map((pokemonType) => {
            const typeName = pokemonType.name.toLowerCase();
            const badgeColor = typeSolidColors[typeName] ?? typeSolidColors.unknown;

            return (
              <Box
                key={pokemonType.id}
                px={3}
                py="4px"
                borderRadius="999px"
                bg={badgeColor}
                color={getTypeTextColor(typeName)}
                fontSize="10px"
                fontWeight="800"
                letterSpacing="0.06em"
                lineHeight="1.4"
                boxShadow={`0 0 16px ${badgeColor}44`}
              >
                {typeLabels[typeName] ?? pokemonType.name.toUpperCase()}
              </Box>
            );
          })}
        </Flex>
      </VStack>
    </VStack>
  );
};
