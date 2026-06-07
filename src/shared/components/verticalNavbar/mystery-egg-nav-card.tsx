"use client";

import { Box, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { type FC } from "react";

import pokemonEgg from "../../../../public/pokemonEgg.png";

type MysteryEggNavCardProps = {
  isActive: boolean;
  onClick: () => void;
};

const SparkleIcon = ({ size = 12 }: { size?: number }) => (
  <Box as="span" display="inline-flex" flexShrink={0} aria-hidden>
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M6 0.5L6.9 4.6L11 5.5L6.9 6.4L6 10.5L5.1 6.4L1 5.5L5.1 4.6L6 0.5Z" fill="#facc15" />
    </svg>
  </Box>
);

export const MysteryEggNavCard: FC<MysteryEggNavCardProps> = ({ isActive, onClick }) => (
  <Box
    as="button"
    w="full"
    textAlign="left"
    borderRadius="16px"
    p={{ base: 3.5, md: 4 }}
    bg={
      isActive
        ? "linear-gradient(135deg, rgba(30, 18, 58, 0.95) 0%, rgba(18, 12, 42, 0.98) 100%)"
        : "linear-gradient(135deg, rgba(22, 14, 48, 0.92) 0%, rgba(12, 10, 32, 0.96) 100%)"
    }
    border="1px solid"
    borderColor={isActive ? "rgba(124, 58, 237, 0.72)" : "rgba(124, 58, 237, 0.34)"}
    boxShadow={
      isActive
        ? "0 0 28px rgba(124, 58, 237, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.06)"
        : "0 0 16px rgba(124, 58, 237, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.04)"
    }
    cursor="pointer"
    transition="all 0.2s ease"
    onClick={onClick}
    _hover={{
      borderColor: "rgba(124, 58, 237, 0.62)",
      boxShadow: "0 0 24px rgba(124, 58, 237, 0.36), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
      transform: "translateY(-1px)",
    }}
    _active={{ transform: "translateY(0)" }}
    _focusVisible={{
      outline: "2px solid rgba(167, 139, 250, 0.8)",
      outlineOffset: "2px",
    }}
  >
    <HStack align="center" gap={{ base: 3, md: 3.5 }}>
      <Flex
        align="center"
        justify="center"
        position="relative"
        flexShrink={0}
        w={{ base: "78px", md: "88px" }}
        h={{ base: "78px", md: "88px" }}
      >
        <Box position="absolute" top="4%" left="8%" className="mystery-egg-nav-sparkle">
          <SparkleIcon size={11} />
        </Box>
        <Box position="absolute" top="18%" right="4%" className="mystery-egg-nav-sparkle-delayed">
          <SparkleIcon size={9} />
        </Box>
        <Box position="absolute" bottom="14%" left="2%" className="mystery-egg-nav-sparkle">
          <SparkleIcon size={10} />
        </Box>
        <Box
          position="absolute"
          bottom="8%"
          right="10%"
          className="mystery-egg-nav-sparkle-delayed"
        >
          <SparkleIcon size={8} />
        </Box>

        <Image
          src={pokemonEgg.src}
          alt=""
          w="full"
          h="full"
          objectFit="contain"
          draggable={false}
          aria-hidden
        />
      </Flex>

      <VStack align="flex-start" gap={2.5} flex={1} minW={0}>
        <VStack align="flex-start" gap={1} w="full">
          <Text
            color="var(--text-primary)"
            fontSize={{ base: "13px", md: "14px" }}
            fontWeight="800"
            lineHeight="1.2"
            letterSpacing="0.04em"
            textTransform="uppercase"
          >
            ¡Huevo misterioso!
          </Text>
          <Text
            color="rgba(255, 255, 255, 0.68)"
            fontSize={{ base: "12px", md: "13px" }}
            fontWeight="500"
            lineHeight="1.4"
          >
            Descubre un Pokémon sorpresa
          </Text>
        </VStack>

        <Box
          as="span"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          h="36px"
          px={4}
          borderRadius="10px"
          bg={isActive ? "var(--accent-purple-hover)" : "var(--accent-purple)"}
          color="var(--text-primary)"
          fontSize="13px"
          fontWeight="700"
          boxShadow="0 4px 14px rgba(124, 58, 237, 0.35)"
          whiteSpace="nowrap"
        >
          Abrir huevo
        </Box>
      </VStack>
    </HStack>
  </Box>
);
