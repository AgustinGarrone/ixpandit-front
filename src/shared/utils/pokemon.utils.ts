import { type Ability, type Pokemon, type Type } from "@/shared/types/api/models";

export const mapPokemonTypes = (type: string): Type[] =>
  type
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean)
    .map((name, index) => ({
      id: index + 1,
      name,
    }));

export const mapPokemonAbilities = (abilities: string[]): Ability[] =>
  abilities.map((name, index) => ({
    id: index + 1,
    name,
  }));

export const mapPokemonToCardProps = (pokemon: Pokemon) => ({
  name: pokemon.name,
  image: pokemon.imageUrl,
  types: mapPokemonTypes(pokemon.type),
  abilities: mapPokemonAbilities(pokemon.abilities),
});
