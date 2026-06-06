"use client";

import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";

import { LoginModal } from "@/shared/components/authModal";

import { PokeballIcon, UserIcon } from "../icons/svg-icons";

export const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
        </Flex>
      </Box>

      <LoginModal open={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </>
  );
};
