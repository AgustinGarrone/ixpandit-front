"use client";

import { Box, Flex } from "@chakra-ui/react";

import { PokemonGrid } from "@/screen/home/components/PokemonGrid";
import { Footer } from "@/shared/components/footer";
import { Navbar } from "@/shared/components/navbar";
import { Searcher } from "@/shared/components/search";

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
