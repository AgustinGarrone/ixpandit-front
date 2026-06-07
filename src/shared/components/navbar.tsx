"use client";

import { Box, Button, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";

import { useAuth } from "@/hooks/useAuth";
import { useAuthModal } from "@/hooks/useAuthModal";
import { type DecodeTokenData } from "@/shared/types/api/auth.types";

import ashAvatar from "../../../public/ash.png";
import { LogoutIcon, PokeballIcon, UserIcon } from "../icons/svg-icons";

const outlineButtonStyles = {
  h: { base: "36px", md: "40px" },
  px: { base: 4, md: 5 },
  borderRadius: "999px",
  bg: "transparent",
  border: "1px solid",
  borderColor: "rgba(255, 255, 255, 0.28)",
  color: "var(--text-primary)",
  fontSize: { base: "xs", md: "sm" },
  fontWeight: "500",
  flexShrink: 0,
  _hover: { bg: "transparent", borderColor: "rgba(255, 255, 255, 0.28)" },
  _active: { bg: "transparent" },
};

export const Navbar = () => {
  const { openLogin } = useAuthModal();
  const { getUserInfo, logout, isAuthenticated } = useAuth();
  const authenticated = isAuthenticated();
  const userInfo = authenticated ? (getUserInfo() as DecodeTokenData | null) : null;

  return (
    <>
      <Box
        as="nav"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        bg="var(--bg-primary)"
        borderBottom="1px solid rgba(255, 255, 255, 0.08)"
      >
        <Flex
          align="center"
          justify="space-between"
          w="full"
          maxW="1440px"
          mx="auto"
          px={{ base: 4, md: 8 }}
          h={{ base: "64px", md: "72px" }}
          gap={4}
        >
          <HStack gap={{ base: 3, md: 4 }} minW={0}>
            <Box flexShrink={0} transform="scale(1.1)" transformOrigin="center">
              <PokeballIcon />
            </Box>

            <VStack align="flex-start" gap={0.5} minW={0}>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="700"
                letterSpacing="0.02em"
                lineHeight="1.1"
                whiteSpace="nowrap"
              >
                <Text as="span" color="var(--text-primary)">
                  POKEMON{" "}
                </Text>
                <Text as="span" color="var(--pokemon-yellow)">
                  FINDER
                </Text>
              </Text>
              <Text
                color="var(--text-muted)"
                fontSize={{ base: "xs", md: "sm" }}
                lineHeight="1.3"
                whiteSpace="nowrap"
              >
                Atrapa, entrena y conquista ⚡
              </Text>
            </VStack>
          </HStack>

          <HStack gap={{ base: 3, md: 4 }} flexShrink={0}>
            {authenticated && userInfo ? (
              <>
                <HStack gap={3}>
                  <Box
                    w={{ base: "36px", md: "40px" }}
                    h={{ base: "36px", md: "40px" }}
                    borderRadius="full"
                    overflow="hidden"
                    border="2px solid"
                    borderColor="rgba(255, 255, 255, 0.2)"
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

                  <Text
                    color="var(--text-primary)"
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="600"
                    lineHeight="1.2"
                    maxW="180px"
                    truncate
                    display={{ base: "none", sm: "block" }}
                  >
                    {userInfo.username.toUpperCase()}
                  </Text>
                </HStack>

                <Box
                  w="1px"
                  h={{ base: "32px", md: "36px" }}
                  bg="rgba(255, 255, 255, 0.12)"
                  flexShrink={0}
                />

                <Button
                  aria-label="Cerrar sesión"
                  w={{ base: "36px", md: "40px" }}
                  h={{ base: "36px", md: "40px" }}
                  minW={{ base: "36px", md: "40px" }}
                  p={0}
                  borderRadius="10px"
                  bg="transparent"
                  border="none"
                  flexShrink={0}
                  onClick={logout}
                  _hover={{ bg: "rgba(229, 62, 62, 0.12)" }}
                  _active={{ bg: "rgba(229, 62, 62, 0.16)" }}
                >
                  <LogoutIcon />
                </Button>
              </>
            ) : (
              <Button {...outlineButtonStyles} onClick={openLogin}>
                <HStack gap={2}>
                  <UserIcon />
                  <Text>Iniciar sesión</Text>
                </HStack>
              </Button>
            )}
          </HStack>
        </Flex>
      </Box>
    </>
  );
};
