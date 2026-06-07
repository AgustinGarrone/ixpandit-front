"use client";

import { Box, Button, Flex, HStack, Image, Separator, Text, VStack } from "@chakra-ui/react";
import { type FC } from "react";

import { LogoutIcon, PokeballOutlineIcon, StarFeatureIcon } from "@/shared/icons/svg-icons";
import { type DecodeTokenData } from "@/shared/types/api/auth.types";

import ashAvatar from "../../../../public/ash.png";

type LoggedInPanelProps = {
  userInfo: DecodeTokenData;
  onLogout: () => void;
};

export const LoggedInPanel: FC<LoggedInPanelProps> = ({ userInfo, onLogout }) => (
  <VStack
    className="glass glass-panel"
    align="stretch"
    justify="space-between"
    gap={6}
    w="full"
    h="full"
    minH={{ base: "auto", lg: "420px" }}
    p={{ base: 5, md: 6 }}
    overflow="hidden"
  >
    <VStack align="stretch" gap={5}>
      <VStack align="stretch" gap={2}>
        <Text
          color="var(--text-primary)"
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="700"
          lineHeight="1.3"
        >
          ¡Hola, {userInfo.username}!
        </Text>
        <Text color="var(--text-muted)" fontSize={{ base: "sm", md: "md" }} lineHeight="1.5">
          Tu aventura continúa. Explorá, guardá favoritos y armá tu equipo.
        </Text>
      </VStack>

      <HStack gap={4} p={4} borderRadius="14px" bg="rgba(255, 255, 255, 0.04)">
        <Box
          w="52px"
          h="52px"
          borderRadius="full"
          overflow="hidden"
          border="2px solid rgba(255, 255, 255, 0.16)"
          flexShrink={0}
        >
          <Image
            src={ashAvatar.src}
            alt={userInfo.username}
            w="full"
            h="full"
            objectFit="cover"
          />
        </Box>

        <VStack align="flex-start" gap={0.5} minW={0}>
          <Text color="var(--text-primary)" fontSize="md" fontWeight="700" truncate w="full">
            {userInfo.username.toUpperCase()}
          </Text>
          <Text color="var(--text-muted)" fontSize="xs">
            Entrenador Pokémon
          </Text>
        </VStack>
      </HStack>

      <Separator borderColor="rgba(255, 255, 255, 0.1)" />

      <VStack align="stretch" gap={3}>
        <HStack align="center" gap={3}>
          <Flex
            align="center"
            justify="center"
            w="36px"
            h="36px"
            borderRadius="10px"
            bg="rgba(255, 255, 255, 0.04)"
            flexShrink={0}
          >
            <StarFeatureIcon />
          </Flex>
          <Text color="var(--text-secondary)" fontSize="sm" lineHeight="1.4">
            Tus favoritos y equipo te esperan en el buscador
          </Text>
        </HStack>
      </VStack>
    </VStack>

    <VStack align="stretch" gap={4}>
      <Button
        h="44px"
        w="full"
        borderRadius="12px"
        bg="transparent"
        border="1px solid rgba(255, 255, 255, 0.16)"
        color="#e53e3e"
        fontSize="sm"
        fontWeight="600"
        onClick={onLogout}
        _hover={{ bg: "rgba(229, 62, 62, 0.12)", borderColor: "rgba(229, 62, 62, 0.3)" }}
      >
        <HStack gap={2}>
          <LogoutIcon />
          <Text>Cerrar sesión</Text>
        </HStack>
      </Button>

      <Box alignSelf="center">
        <PokeballOutlineIcon />
      </Box>
    </VStack>
  </VStack>
);
