"use client";

import { Box, Button, Flex, HStack, Separator, Text, VStack } from "@chakra-ui/react";
import { type FC } from "react";

import {
  EggFeatureIcon,
  PokeballOutlineIcon,
  StarFeatureIcon,
  UserIcon,
} from "@/shared/icons/svg-icons";

type GuestPanelProps = {
  onLoginClick: () => void;
  onRegisterClick: () => void;
};

const FEATURES = [
  { icon: <StarFeatureIcon />, label: "Guardar tus Pokémon favoritos" },
  { icon: <EggFeatureIcon />, label: "Abrir huevos y descubrir sorpresas" },
] as const;

const outlineButtonStyles = {
  h: "44px",
  w: "full",
  borderRadius: "12px",
  bg: "transparent",
  border: "1px solid",
  borderColor: "rgba(255, 255, 255, 0.28)",
  color: "var(--text-primary)",
  fontSize: "sm",
  fontWeight: "600",
  _hover: { bg: "rgba(255, 255, 255, 0.04)", borderColor: "rgba(255, 255, 255, 0.4)" },
};

export const GuestPanel: FC<GuestPanelProps> = ({ onLoginClick, onRegisterClick }) => (
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
          ¡Comienza tu aventura!
        </Text>
        <Text color="var(--text-muted)" fontSize={{ base: "sm", md: "md" }} lineHeight="1.5">
          Inicia sesión para guardar tus Pokémon y formar tu equipo.
        </Text>
      </VStack>

      <VStack align="stretch" gap={3}>
        <Button
          h="44px"
          w="full"
          borderRadius="12px"
          bg="var(--accent-purple)"
          color="var(--text-primary)"
          fontSize="sm"
          fontWeight="600"
          onClick={onLoginClick}
          _hover={{ bg: "var(--accent-purple-hover)" }}
        >
          <HStack gap={2}>
            <UserIcon />
            <Text>Iniciar sesión</Text>
          </HStack>
        </Button>

        <Button {...outlineButtonStyles} onClick={onRegisterClick}>
          Crear cuenta
        </Button>
      </VStack>

      <Separator borderColor="rgba(255, 255, 255, 0.06)" />

      <VStack align="stretch" gap={6} pt={2}>
        <Text
          color="#ffffff"
          fontSize="15px"
          fontWeight="600"
          lineHeight="1.35"
          letterSpacing="-0.01em"
        >
          Con tu cuenta podrás:
        </Text>

        <VStack align="stretch" gap={7}>
          {FEATURES.map(({ icon, label }) => (
            <HStack key={label} align="center" gap="14px">
              <Flex align="center" justify="center" w="26px" flexShrink={0}>
                {icon}
              </Flex>
              <Text
                color="#ffffff"
                fontSize="14px"
                fontWeight="400"
                lineHeight="1.5"
                letterSpacing="-0.01em"
              >
                {label}
              </Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </VStack>

    <VStack align="stretch" gap={6} pt={1}>
      <Separator borderColor="rgba(255, 255, 255, 0.06)" />

      <Box alignSelf="center" py={3}>
        <PokeballOutlineIcon />
      </Box>
    </VStack>
  </VStack>
);
