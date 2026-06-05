"use client";

import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";

import { PokeballIcon, UserIcon } from "../icons/svg-icons";

export const Navbar = () => {
  return (
    <Box
      as="nav"
      position="fixed"
      top={{ base: "16px", md: "24px" }}
      left="50%"
      transform="translateX(-50%)"
      zIndex={1000}
      w="calc(100% - 48px)"
      maxW="860px"
    >
      <Flex
        className="glass glass-pill glass-hover"
        align="center"
        justify="space-between"
        px={{ base: 5, md: 8 }}
        h={{ base: "56px", md: "64px" }}
      >
        <HStack gap={4} minW={0}>
          <Box
            w="28px"
            h="28px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
          >
            <PokeballIcon />
          </Box>

          <Text
            color="var(--text-primary)"
            fontSize={{ base: "8px", md: "10px" }}
            letterSpacing="0.12em"
            whiteSpace="nowrap"
          >
            IXP-POK-FRONT
          </Text>
        </HStack>

        <Button
          className="glass-hover"
          h={{ base: "36px", md: "40px" }}
          px={{ base: 4, md: 6 }}
          borderRadius="999px"
          bg="var(--glass-bg-light)"
          border="1px solid"
          borderColor="var(--glass-border)"
          color="var(--text-primary)"
          flexShrink={0}
          _hover={{
            bg: "var(--glass-bg-hover)",
            borderColor: "var(--glass-border-hover)",
          }}
        >
          <HStack gap={2}>
            <UserIcon />
            <Text fontSize={{ base: "7px", md: "8px" }} letterSpacing="0.08em" whiteSpace="nowrap">
              INICIAR SESIÓN
            </Text>
          </HStack>
        </Button>
      </Flex>
    </Box>
  );
};
