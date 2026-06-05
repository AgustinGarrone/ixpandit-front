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
      w="calc(100% - 32px)"
      maxW="720px"
      px={{ base: 2, md: 0 }}
    >
      <Flex
        align="center"
        justify="space-between"
        gap={4}
        px={{ base: 4, md: 6 }}
        py={{ base: 2.5, md: 3 }}
        borderRadius="full"
        bg="rgba(15, 20, 35, 0.55)"
        backdropFilter="blur(20px)"
        border="1px solid"
        borderColor="rgba(255, 255, 255, 0.14)"
        boxShadow="0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
      >
        <HStack gap={3} minW={0}>
          <PokeballIcon />
          <Text
            fontSize={{ base: "8px", md: "9px" }}
            color="white"
            letterSpacing="0.08em"
            lineClamp={1}
          >
            IXP-POK-FRONT
          </Text>
        </HStack>

        <Button
          variant="outline"
          size="sm"
          color="white"
          borderColor="rgba(255, 255, 255, 0.35)"
          bg="transparent"
          borderRadius="full"
          fontSize={{ base: "7px", md: "8px" }}
          letterSpacing="0.06em"
          px={{ base: 3, md: 4 }}
          h={{ base: "32px", md: "36px" }}
          flexShrink={0}
          _hover={{
            bg: "rgba(255, 255, 255, 0.08)",
            borderColor: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <HStack gap={2}>
            <UserIcon />
            <Text as="span">INICIAR SESIÓN</Text>
          </HStack>
        </Button>
      </Flex>
    </Box>
  );
};
