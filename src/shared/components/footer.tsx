"use client";

import { Box, Flex, HStack, Link, Text } from "@chakra-ui/react";

import { GithubIcon, PokeballIcon } from "../icons/svg-icons";

const PORTFOLIO_URL = "https://agustingarrone.com";
const REPO_URL = "https://github.com/AgustinGarrone/ixpandit-front";

export const Footer = () => {
  return (
    <Box
      as="footer"
      w="full"
      flexShrink={0}
      bg="var(--bg-primary)"
      borderTop="1px solid rgba(255, 255, 255, 0.08)"
    >
      <Flex
        align="center"
        justify="space-between"
        w="full"
        maxW="1440px"
        mx="auto"
        px={{ base: 4, md: 8 }}
        h="40px"
        gap={4}
      >
        <Link
          href={PORTFOLIO_URL}
          target="_blank"
          rel="noopener noreferrer"
          _hover={{ textDecoration: "none", opacity: 0.85 }}
        >
          <HStack gap={3} minW={0}>
            <Box flexShrink={0} transform="scale(0.9)" transformOrigin="center">
              <PokeballIcon />
            </Box>
            <Text
              fontSize={{ base: "xs", md: "sm" }}
              fontWeight="500"
              color="var(--text-primary)"
              lineClamp={1}
            >
              Hecho por Agustín Garrone
            </Text>
          </HStack>
        </Link>

        <Link
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          flexShrink={0}
          _hover={{ textDecoration: "none", opacity: 0.85 }}
        >
          <HStack gap={2}>
            <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="500" color="var(--text-primary)">
              Link a mi repo
            </Text>
            <GithubIcon />
          </HStack>
        </Link>
      </Flex>
    </Box>
  );
};
