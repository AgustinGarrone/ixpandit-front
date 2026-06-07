"use client";

import { Box, Button, HStack, Image, Separator, Text, VStack } from "@chakra-ui/react";
import { type FC } from "react";

import { LogoutIcon, PokeballIcon, PokeballOutlineIcon } from "@/shared/icons/svg-icons";
import { type DecodeTokenData } from "@/shared/types/api/auth.types";

import ashAvatar from "../../../../public/ash.png";
import bgHome from "../../../../public/bg-home.png";
import { NavMenu } from "./nav-menu";

type LoggedInPanelProps = {
  userInfo: DecodeTokenData;
  onLogout: () => void;
};

const formatTrainerName = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

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
      <Box
        position="relative"
        overflow="hidden"
        borderRadius="16px"
        border="1px solid rgba(255, 255, 255, 0.14)"
        boxShadow="0 8px 24px rgba(0, 0, 0, 0.28)"
        isolation="isolate"
      >
        <Image
          src={bgHome.src}
          alt=""
          position="absolute"
          inset={0}
          w="full"
          h="full"
          objectFit="cover"
          objectPosition="center 35%"
          filter="brightness(0.78) saturate(0.92)"
          aria-hidden
          pointerEvents="none"
        />
        <Box
          position="absolute"
          inset={0}
          bg="linear-gradient(180deg, rgba(7, 30, 48, 0.42) 0%, rgba(6, 10, 22, 0.68) 100%)"
          aria-hidden
          pointerEvents="none"
        />

        <Box position="relative" zIndex={1} p={4}>
          <Box position="absolute" top={3} right={3} opacity={0.9} transform="scale(0.9)">
            <PokeballIcon />
          </Box>

          <HStack gap={3.5} align="center" pr={7}>
            <Box
              p="2px"
              borderRadius="full"
              flexShrink={0}
              bg="linear-gradient(135deg, #f472b6 0%, #38bdf8 100%)"
              boxShadow="0 0 16px rgba(244, 114, 182, 0.28)"
            >
              <Box
                w="52px"
                h="52px"
                borderRadius="full"
                overflow="hidden"
                border="2px solid rgba(10, 14, 30, 0.85)"
              >
                <Image
                  src={ashAvatar.src}
                  alt={userInfo.username}
                  w="full"
                  h="full"
                  objectFit="cover"
                />
              </Box>
            </Box>

            <VStack align="flex-start" gap={0.5} minW={0} flex={1}>
              <Text
                color="var(--text-primary)"
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="700"
                lineHeight="1.2"
                truncate
                w="full"
              >
                {formatTrainerName(userInfo.username)}
              </Text>
              <Text color="rgba(255, 255, 255, 0.62)" fontSize="sm" lineHeight="1.3">
                Entrenador/a
              </Text>
            </VStack>
          </HStack>
        </Box>
      </Box>

      <Separator borderColor="rgba(255, 255, 255, 0.1)" />

      <NavMenu />
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
