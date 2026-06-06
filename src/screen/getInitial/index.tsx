import { Flex } from "@chakra-ui/react";

import { RandomPokemonSelector } from "@/shared/components/randomPokemonSelector";

import bgImage from "../../../public/login_back5.jpg";

export const GetInitialPokemonsPage = () => {
  return (
    <Flex
      direction="column"
      h="100vh"
      w="100vw"
      alignItems="center"
      justifyContent="flex-start"
      backgroundImage={`url(${bgImage.src})`}
    >
      <RandomPokemonSelector />
    </Flex>
  );
};
