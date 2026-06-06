import { Flex, Image, Stack, Text } from "@chakra-ui/react";
import { type FC } from "react";

import { typeColors } from "@/shared/constants/pokemon.constants";
import { type Ability, type Type } from "@/shared/types/api/models";

import bg from "../../../../public/pokemon_bg2.jpg";
import unknown from "../../../../public/unknown.png";

type CardProps = {
  name: string;
  image: string;
  abilities: Ability[];
  types: Type[];
};

export const PokemonCard: FC<CardProps> = ({ name, image, abilities, types }) => {
  const typesSorted = types.slice().sort((a, b) => a.id - b.id);

  const lowestTypeId = typesSorted.length > 0 ? typesSorted[0].id : null;

  const cardBackgroundColor =
    lowestTypeId !== null ? typeColors[typesSorted[0].name.toLowerCase()] : "#FFFFFF";

  const renderPokemonType = (types: Type[]) => {
    const imgs = types.map((type, index) => {
      return (
        <Image
          key={index}
          src={`/icons/${type.name.toLowerCase()}.svg`}
          alt={types[0].name}
          width="25px"
          height="25px"
          zIndex="2"
          filter="drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))"
        />
      );
    });
    return (
      <Flex alignItems="center" justifyContent="center" gap="1em">
        {imgs}
      </Flex>
    );
  };

  return (
    <Flex
      height={{
        xl: "19em",
        "2xl": "25em",
      }}
      width={{
        xl: "12em",
        "2xl": "16em",
      }}
      borderRadius="md"
      borderWidth="2px"
      direction="column"
      borderColor="gray.200"
      zIndex="100"
      alignItems="start"
      justifyContent="space-between"
      bgGradient={cardBackgroundColor}
      position="relative"
    >
      <Flex
        padding={{ xl: "2px", "2xl": "13pxpx" }}
        alignItems="center"
        w="100%"
        justifyContent="space-around"
      >
        {renderPokemonType(types)}
      </Flex>
      <Flex
        height={{
          xl: "17em",
          "2xl": "22em",
        }}
        bottom="0"
        borderTop="2px solid white"
        w="100%"
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        boxShadow="lg"
        bgGradient={cardBackgroundColor}
        p={4}
      >
        <Text fontSize="medium" fontWeight="bold" mb={2}>
          {name}
        </Text>
        <Flex
          backgroundImage={`url(${bg.src})`}
          alignItems="center"
          justifyContent="center"
          backgroundSize="cover"
          zIndex="1"
          marginTop={{ "2xl": "1em" }}
          height={{ xl: "8em", "2xl": "12em" }}
          width={{ xl: "9em", "2xl": "13em" }}
        >
          {image ? (
            <Image
              src={image}
              alt={name}
              width="80%"
              height="100%"
              zIndex="2"
              filter="drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))"
            />
          ) : (
            <Image
              src={unknown.src}
              alt={name}
              width="50%"
              height="50%"
              zIndex="2"
              filter="drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))"
            />
          )}
        </Flex>
        <Stack mt="1em" gap={1} align="center">
          {abilities.map((a) => {
            return (
              <Text fontSize="x-small" key={a.id}>
                {a.name}
              </Text>
            );
          })}
        </Stack>
      </Flex>
    </Flex>
  );
};
