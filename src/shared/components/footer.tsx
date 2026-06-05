"use client";

import { Box, Flex, HStack, Link, Text } from "@chakra-ui/react";

import { GithubIcon, PokeballIcon } from "../icons/svg-icons";

const PORTFOLIO_URL = "https://agustingarrone.com";
const REPO_URL = "https://github.com/AgustinGarrone/ixpandit-front";

export const Footer = () => {
  return (
    <Box
      as="footer"
      position="fixed"
      bottom={{ base: "16px", md: "24px" }}
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
        gap={4}
        px={{ base: 5, md: 8 }}
        h={{ base: "56px", md: "64px" }}
      >
        <Link
          href={PORTFOLIO_URL}
          target="_blank"
          rel="noopener noreferrer"
          _hover={{ textDecoration: "none", opacity: 0.9 }}
        >
          <HStack gap={3} minW={0}>
            <Box
              w="24px"
              h="24px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
              transform="scale(0.9)"
            >
              <PokeballIcon />
            </Box>
            <Text
              fontSize={{ base: "7px", md: "8px" }}
              color="var(--text-primary)"
              letterSpacing="0.08em"
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
          _hover={{ textDecoration: "none", opacity: 0.9 }}
        >
          <HStack gap={2}>
            <Text
              fontSize={{ base: "7px", md: "8px" }}
              color="var(--text-primary)"
              letterSpacing="0.08em"
            >
              Link a mi repo
            </Text>
            <GithubIcon />
          </HStack>
        </Link>
      </Flex>
    </Box>
  );
};
