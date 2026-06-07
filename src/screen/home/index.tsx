"use client";

import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { HomeView, useHomeView } from "@/hooks/useHomeView";
import { PokemonGrid } from "@/screen/home/components/PokemonGrid";
import { Footer } from "@/shared/components/footer";
import { NavbarSkeleton } from "@/shared/components/navbar-skeleton";
import { Searcher } from "@/shared/components/searcher/search";
import { VerticalNavbar } from "@/shared/components/verticalNavbar";

const Navbar = dynamic(
  () => import("@/shared/components/navbar").then((mod) => ({ default: mod.Navbar })),
  { ssr: false, loading: () => <NavbarSkeleton /> },
);

type ViewPlaceholderProps = {
  title: string;
};

const ViewPlaceholder = ({ title }: ViewPlaceholderProps) => (
  <VStack
    className="glass glass-panel"
    align="center"
    justify="center"
    flex="1"
    minH={0}
    p={8}
    gap={2}
  >
    <Text color="var(--text-primary)" fontSize="md" fontWeight="700">
      {title}
    </Text>
    <Text color="var(--text-muted)" fontSize="sm" textAlign="center">
      Esta sección estará disponible pronto.
    </Text>
  </VStack>
);

const HomeMainContent = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [nameLike, setNameLike] = useState<string | null>(null);
  const { activeView } = useHomeView();
  const { isAuthenticated } = useAuth();
  const authenticated = isAuthenticated();
  const showSearch = !authenticated || activeView === HomeView.SEARCH;

  return (
    <Flex
      flex={{ base: "1 1 auto", lg: "7 1 0" }}
      direction="column"
      gap={{ base: 4, lg: 5 }}
      minW={0}
      maxW="100%"
      minH={0}
      overflow="hidden"
    >
      {showSearch ? (
        <>
          <Box flexShrink={0} w="full" minW={0}>
            <Searcher
              selectedType={selectedType}
              nameLike={nameLike}
              onNameLikeChange={setNameLike}
              onTypeChange={setSelectedType}
            />
          </Box>

          <Box flex="1" minH={0} minW={0} display="flex" flexDirection="column">
            <PokemonGrid selectedType={selectedType} nameLike={nameLike} />
          </Box>
        </>
      ) : null}

      {authenticated && activeView === HomeView.MYSTERY_EGG ? (
        <ViewPlaceholder title="Huevo Misterioso" />
      ) : null}
    </Flex>
  );
};

export const HomePage = () => (
  <Flex direction="column" h="100%" overflow="hidden">
    <Navbar />

    <Box
      as="main"
      flex="1"
      minH={0}
      display="flex"
      flexDirection="column"
      pt={{ base: "88px", md: "104px" }}
      pb={{ base: 8, md: 12 }}
      px={{ base: 5, md: 10 }}
      overflow="hidden"
    >
      <Flex
        flex="1"
        minH={0}
        w="full"
        maxW="1280px"
        mx="auto"
        gap={{ base: 5, lg: 6 }}
        direction={{ base: "column", lg: "row" }}
        align="stretch"
        overflow="hidden"
      >
        <Box
          flex={{ base: "0 0 auto", lg: "3 1 0" }}
          minW={0}
          maxW="100%"
          minH={0}
          h={{ base: "auto", lg: "full" }}
        >
          <VerticalNavbar />
        </Box>

        <HomeMainContent />
      </Flex>
    </Box>

    <Footer />
  </Flex>
);
