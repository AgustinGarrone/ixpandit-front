"use client";

import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { type FC, type ReactNode } from "react";

import { HomeView, useHomeView } from "@/hooks/useHomeView";
import { EggFeatureIcon, SearchIcon } from "@/shared/icons/svg-icons";

type NavMenuItem = {
  view: HomeView;
  label: string;
  icon: ReactNode;
};

const NAV_ITEMS: NavMenuItem[] = [
  {
    view: HomeView.SEARCH,
    label: "Búsqueda",
    icon: (
      <Box color="currentColor">
        <SearchIcon />
      </Box>
    ),
  },
  {
    view: HomeView.MYSTERY_EGG,
    label: "Huevo Misterioso",
    icon: <EggFeatureIcon />,
  },
];

export const NavMenu: FC = () => {
  const { activeView, setActiveView } = useHomeView();

  return (
    <VStack align="stretch" gap={2}>
      {NAV_ITEMS.map(({ view, label, icon }) => {
        const isActive = activeView === view;

        return (
          <Button
            key={view}
            h="46px"
            w="full"
            justifyContent="flex-start"
            gap={3}
            px={4}
            borderRadius="12px"
            bg={isActive ? "var(--accent-purple)" : "rgba(255, 255, 255, 0.04)"}
            color="var(--text-primary)"
            border="1px solid"
            borderColor={isActive ? "var(--accent-purple)" : "rgba(255, 255, 255, 0.06)"}
            fontSize="sm"
            fontWeight="700"
            boxShadow={isActive ? "0 0 20px rgba(124, 58, 237, 0.35)" : "none"}
            onClick={() => setActiveView(view)}
            _hover={{
              bg: isActive ? "var(--accent-purple-hover)" : "rgba(255, 255, 255, 0.07)",
              borderColor: isActive ? "var(--accent-purple-hover)" : "rgba(255, 255, 255, 0.12)",
            }}
          >
            <HStack gap={3}>
              <Box flexShrink={0} display="flex" alignItems="center" justifyContent="center">
                {icon}
              </Box>
              <Text>{label}</Text>
            </HStack>
          </Button>
        );
      })}
    </VStack>
  );
};
