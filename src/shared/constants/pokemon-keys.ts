export const pokemonKeys = {
  all: ["pokemon"] as const,
  list: (query: Record<string, unknown>) => [...pokemonKeys.all, "list", query] as const,
};
