"use client";

import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { type FC } from "react";

import { PokeballIcon } from "@/shared/icons/svg-icons";

import loginBackdrop from "../../../../public/login_back5.jpg";
import { FormMode } from "./form-mode";

type AuthModalHeaderProps = {
  mode: FormMode;
  title: string;
  description: string;
};

export const AuthModalHeader: FC<AuthModalHeaderProps> = ({ mode, title, description }) => (
  <Box position="relative" overflow="hidden" borderRadius="18px" isolation="isolate">
    <Image
      src={loginBackdrop.src}
      alt=""
      position="absolute"
      inset={0}
      w="full"
      h="full"
      objectFit="cover"
      objectPosition="center 40%"
      filter="brightness(0.72) saturate(0.9)"
      aria-hidden
      pointerEvents="none"
    />
    <Box
      position="absolute"
      inset={0}
      bg="linear-gradient(135deg, rgba(30, 18, 58, 0.55) 0%, rgba(7, 30, 48, 0.82) 100%)"
      aria-hidden
      pointerEvents="none"
    />

    <VStack align="stretch" gap={2.5} position="relative" zIndex={1} p={{ base: 4, md: 5 }}>
      <HStack justify="space-between" align="flex-start" gap={3}>
        <HStack gap={2.5} minW={0}>
          <Box flexShrink={0} transform="scale(1.05)">
            <PokeballIcon />
          </Box>
          <Box
            px={2.5}
            py={1}
            borderRadius="999px"
            bg="rgba(124, 58, 237, 0.22)"
            border="1px solid rgba(167, 139, 250, 0.35)"
            color="#e9d5ff"
            fontSize="10px"
            fontWeight="700"
            letterSpacing="0.12em"
            textTransform="uppercase"
            whiteSpace="nowrap"
          >
            {mode === FormMode.LOGIN ? "Acceso" : "Registro"}
          </Box>
        </HStack>
      </HStack>

      <VStack align="flex-start" gap={1.5}>
        <Text
          color="var(--text-primary)"
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="800"
          lineHeight="1.15"
          letterSpacing="-0.02em"
        >
          {title}
        </Text>
        <Text color="rgba(255, 255, 255, 0.72)" fontSize={{ base: "sm", md: "md" }} lineHeight="1.5">
          {description}
        </Text>
      </VStack>
    </VStack>
  </Box>
);
