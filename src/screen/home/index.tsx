"use client";

import { Box, Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useState } from "react";

import { PokemonGrid } from "@/screen/home/components/PokemonGrid";
import { Footer } from "@/shared/components/footer";
import { NavbarSkeleton } from "@/shared/components/navbar-skeleton";
import { Searcher } from "@/shared/components/searcher/search";

const Navbar = dynamic(
  () => import("@/shared/components/navbar").then((mod) => ({ default: mod.Navbar })),
  { ssr: false, loading: () => <NavbarSkeleton /> },
);

export const HomePage = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
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
          gap={{ base: 8, lg: 12 }}
          direction={{ base: "column", lg: "row" }}
          align={{ base: "stretch", lg: "center" }}
          overflow="hidden"
        >
          <Box flex={{ base: "0 0 auto", lg: "1" }} minW={0} w="full">
            <Searcher selectedType={selectedType} onTypeChange={setSelectedType} />
          </Box>

          <Box
            flex="1"
            minH={0}
            minW={0}
            w="full"
            maxH={{ base: "none", lg: "100%" }}
            display="flex"
            flexDirection="column"
          >
            <PokemonGrid selectedType={selectedType} />
          </Box>
        </Flex>
      </Box>

      <Footer />
    </Flex>
  );
};
