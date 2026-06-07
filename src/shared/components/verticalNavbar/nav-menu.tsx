"use client";

import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { type FC } from "react";

import { HomeView, useHomeView } from "@/hooks/useHomeView";
import { SearchIcon } from "@/shared/icons/svg-icons";

import { MysteryEggNavCard } from "./mystery-egg-nav-card";

export const NavMenu: FC = () => {
  const { activeView, setActiveView } = useHomeView();
  const isSearchActive = activeView === HomeView.SEARCH;

  return (
    <VStack align="stretch" gap={3}>
      <Button
        h="46px"
        w="full"
        justifyContent="flex-start"
        gap={3}
        px={4}
        borderRadius="12px"
        bg={isSearchActive ? "var(--accent-purple)" : "rgba(255, 255, 255, 0.04)"}
        color="var(--text-primary)"
        border="1px solid"
        borderColor={isSearchActive ? "var(--accent-purple)" : "rgba(255, 255, 255, 0.06)"}
        fontSize="sm"
        fontWeight="700"
        boxShadow={isSearchActive ? "0 0 20px rgba(124, 58, 237, 0.35)" : "none"}
        onClick={() => setActiveView(HomeView.SEARCH)}
        _hover={{
          bg: isSearchActive ? "var(--accent-purple-hover)" : "rgba(255, 255, 255, 0.07)",
          borderColor: isSearchActive ? "var(--accent-purple-hover)" : "rgba(255, 255, 255, 0.12)",
        }}
      >
        <HStack gap={3}>
          <Box flexShrink={0} display="flex" alignItems="center" justifyContent="center" color="currentColor">
            <SearchIcon />
          </Box>
          <Text>Búsqueda</Text>
        </HStack>
      </Button>

      <MysteryEggNavCard
        isActive={activeView === HomeView.MYSTERY_EGG}
        onClick={() => setActiveView(HomeView.MYSTERY_EGG)}
      />
    </VStack>
  );
};
