"use client";

import { Box, Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";

import { PokemonGrid } from "@/screen/home/components/PokemonGrid";
import { Footer } from "@/shared/components/footer";
import { NavbarSkeleton } from "@/shared/components/navbar-skeleton";
import { Searcher } from "@/shared/components/search";

const Navbar = dynamic(
  () => import("@/shared/components/navbar").then((mod) => ({ default: mod.Navbar })),
  { ssr: false, loading: () => <NavbarSkeleton /> },
);

export const HomePage = () => {
  return (
    <>
      <Navbar />

      <Box
        as="main"
        w="full"
        minH="100vh"
        display="flex"
        justifyContent="center"
        px={4}
        pt="150px"
        pb={{ base: "72px", md: "80px" }}
      >
        <Flex
          w="full"
          maxW="1180px"
          gap={4}
          flex={1}
          direction={{ base: "column", lg: "row" }}
          align="stretch"
        >
          <Box flex="1" minW={0}>
            <Searcher />
          </Box>

          <Box flex="1" minW={0}>
            <PokemonGrid />
          </Box>
        </Flex>
      </Box>

      <Footer />
    </>
  );
};
