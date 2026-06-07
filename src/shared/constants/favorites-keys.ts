export const favoritesKeys = {
  all: ["favorites"] as const,
  list: () => [...favoritesKeys.all, "list"] as const,
};
