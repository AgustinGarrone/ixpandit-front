"use client";

import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { LoginModal } from "@/shared/components/authModal";
import { type DecodeTokenData } from "@/shared/types/api/auth.types";

import { LogoutIcon, PokeballIcon, PokemonMasterIcon, UserIcon } from "../icons/svg-icons";

export const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { getUserInfo, logout, isAuthenticated } = useAuth();
  const authenticated = isAuthenticated();
  const userInfo = authenticated ? (getUserInfo() as DecodeTokenData | null) : null;

  return (
    <>
      <Box
        as="nav"
        position="fixed"
        top={{ base: "12px", md: "16px" }}
        left="50%"
        transform="translateX(-50%)"
        zIndex={1000}
        w="calc(100% - 32px)"
        maxW="1180px"
      >
        <Flex
          className="glass glass-bar glass-hover"
          align="center"
          justify="space-between"
          px={{ base: 4, md: 6 }}
          h={{ base: "48px", md: "52px" }}
        >
          <HStack gap={3} minW={0}>
            <Box
              w="24px"
              h="24px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
            >
              <PokeballIcon />
            </Box>

            <Text
              color="var(--text-primary)"
              fontSize={{ base: "8px", md: "9px" }}
              letterSpacing="0.12em"
              whiteSpace="nowrap"
            >
              IXP-POK-FRONT
            </Text>
          </HStack>

          {authenticated && userInfo ? (
            <HStack gap={2} flexShrink={0}>
              <Flex
                className="glass-hover"
                align="center"
                gap={2}
                h={{ base: "32px", md: "36px" }}
                px={{ base: 3, md: 4 }}
                borderRadius="8px"
                bg="var(--glass-bg-light)"
                border="1px solid"
                borderColor="var(--glass-border)"
              >
                <PokemonMasterIcon />
                <Text
                  color="var(--text-primary)"
                  fontSize={{ base: "7px", md: "8px" }}
                  letterSpacing="0.08em"
                  whiteSpace="nowrap"
                  maxW={{ base: "120px", md: "180px" }}
                  truncate
                >
                  Hola, {userInfo.username}
                </Text>
              </Flex>

              <Button
                className="glass-hover"
                aria-label="Cerrar sesión"
                h={{ base: "32px", md: "36px" }}
                w={{ base: "32px", md: "36px" }}
                minW={{ base: "32px", md: "36px" }}
                p={0}
                borderRadius="8px"
                bg="var(--glass-bg-light)"
                border="1px solid"
                borderColor="var(--glass-border)"
                onClick={logout}
                _hover={{
                  bg: "rgba(229, 62, 62, 0.12)",
                  borderColor: "#e53e3e",
                }}
              >
                <LogoutIcon />
              </Button>
            </HStack>
          ) : (
            <Button
              className="glass-hover"
              h={{ base: "32px", md: "36px" }}
              px={{ base: 3, md: 4 }}
              borderRadius="8px"
              bg="var(--glass-bg-light)"
              border="1px solid"
              borderColor="var(--glass-border)"
              color="var(--text-primary)"
              flexShrink={0}
              onClick={() => setIsLoginOpen(true)}
              _hover={{
                bg: "var(--glass-bg-hover)",
                borderColor: "var(--glass-border-hover)",
              }}
            >
              <HStack gap={2}>
                <UserIcon />
                <Text
                  fontSize={{ base: "7px", md: "8px" }}
                  letterSpacing="0.08em"
                  whiteSpace="nowrap"
                >
                  INICIAR SESIÓN
                </Text>
              </HStack>
            </Button>
          )}
        </Flex>
      </Box>

      <LoginModal open={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </>
  );
};
