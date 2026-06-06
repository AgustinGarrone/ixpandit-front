import { Button, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuthClient } from "@/hooks/useAuthClient";
import { useRandomPokemon } from "@/hooks/usePokemonClient";
import { emptyPokemons } from "@/shared/constants/pokemon.constants";
import { type Pokemon } from "@/shared/types/api/models";
import { errorAlert } from "@/shared/utils/alerts";
import { getApiErrorMessage } from "@/shared/utils/api-error.utils";
import { playSound, playSuccess } from "@/shared/utils/fx";
import { checkLocalStorage } from "@/shared/utils/localStorage.utils";
import { mapPokemonToCardProps } from "@/shared/utils/pokemon.utils";

import egg from "../../../../public/pokemonEgg.png";
import { PokemonCard } from "../pokemonCard";

export const Selector = () => {
  const [pokemonsAdded, setPokemonsAdded] = useState<Pokemon[]>(emptyPokemons);
  const pokemonsSelected = pokemonsAdded.every((pokemon) => pokemon.name !== "");
  const randomPokemonMutation = useRandomPokemon();
  const { setInitialMutation } = useAuthClient();
  const router = useRouter();

  const addRandom = (index: number) => {
    const excludeIds = pokemonsAdded
      .filter((pokemon) => pokemon.id > 0)
      .map((pokemon) => pokemon.id);

    randomPokemonMutation.mutate(excludeIds, {
      onSuccess: (pokemon) => {
        setPokemonsAdded((prevPokemons) => {
          const updatedPokemons = [...prevPokemons];
          updatedPokemons[index] = pokemon;
          return updatedPokemons;
        });
        playSuccess();
      },
      onError: (error) => {
        errorAlert(getApiErrorMessage(error, "No pudimos obtener un pokémon aleatorio."));
      },
    });
  };

  const handleContinueButton = () => {
    playSound();

    setInitialMutation.mutate(undefined, {
      onSuccess: () => {
        if (checkLocalStorage()) {
          localStorage.setItem("initialPokemons", "true");
        }

        router.push("/");
      },
      onError: (error) => {
        errorAlert(getApiErrorMessage(error, "No pudimos confirmar tus pokémon iniciales."));
      },
    });
  };

  return (
    <Flex w="80%" alignItems="center" justifyContent="center" gap="4em" direction="column">
      <Text>Elige tus pokemon</Text>
      <Flex w="100%" alignItems="center" justifyContent="space-around">
        {pokemonsAdded.map((pokemon, index) =>
          pokemon.name ? (
            <motion.div
              key={`${pokemon.id}-${index}`}
              initial={{ scale: 0 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <PokemonCard {...mapPokemonToCardProps(pokemon)} />
            </motion.div>
          ) : (
            <Image
              key={index}
              onClick={() => addRandom(index)}
              style={{ cursor: "pointer" }}
              height={200}
              src={egg}
              alt="pokemon egg"
            />
          ),
        )}
      </Flex>
      <Button
        disabled={!pokemonsSelected}
        loading={setInitialMutation.isPending}
        onClick={handleContinueButton}
      >
        Ingresar
      </Button>
    </Flex>
  );
};
