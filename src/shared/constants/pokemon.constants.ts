import { type Pokemon } from "@/shared/types/api/models";

export const typeColors: { [key: string]: string } = {
  normal: "linear-gradient(to bottom, #A8A77A, #C2C1A6)",
  fighting: "linear-gradient(to bottom, #C22E28, #DFA5A4)",
  flying: "linear-gradient(to bottom, #A98FF3, #D1C0F4)",
  poison: "linear-gradient(to bottom, #A33EA1, #D6A9DC)",
  ground: "linear-gradient(to bottom, #E2BF65, #F0DCB0)",
  rock: "linear-gradient(to bottom, #B6A136, #D5CC92)",
  bug: "linear-gradient(to bottom, #A6B91A, #C8D78B)",
  ghost: "linear-gradient(to bottom, #735797, #A395C8)",
  steel: "linear-gradient(to bottom, #B7B7CE, #D9D9E6)",
  fire: "linear-gradient(to bottom, #EE8130, #F5AC78)",
  water: "linear-gradient(to bottom, #6390F0, #9DB7F5)",
  grass: "linear-gradient(to bottom, #7AC74C, #AED98B)",
  electric: "linear-gradient(to bottom, #F7D02C, #FCE788)",
  psychic: "linear-gradient(to bottom, #F95587, #FDB8C0)",
  ice: "linear-gradient(to bottom, #E6F7FF, #B3ECFF)",
  dragon: "linear-gradient(to bottom, #6F35FC, #A596F3)",
  dark: "linear-gradient(to bottom, #705746, #A29288)",
  fairy: "linear-gradient(to bottom, #D685AD, #F3C7E7)",
  stellar: "linear-gradient(to bottom, #FFAC7D, #FFD7B5)",
  unknown: "linear-gradient(to bottom, #6B6B6B, #A8A8A8)",
};

export const emptyPokemons: Pokemon[] = [
  {
    name: "",
    id: 0,
    imageUrl: "",
    type: "",
    abilities: [],
  },
  {
    name: "",
    id: 0,
    imageUrl: "",
    type: "",
    abilities: [],
  },
  {
    name: "",
    id: 0,
    imageUrl: "",
    type: "",
    abilities: [],
  },
];
