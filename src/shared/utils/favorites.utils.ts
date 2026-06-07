import {
  type FavoriteResponseDto,
  type FavoritesListResponse,
} from "@/shared/types/api/favorites.types";
import { isPaginatedData, type JSendPagination } from "@/shared/types/api/jsend.types";
import { type Pokemon } from "@/shared/types/api/models";

const EMPTY_PAGINATION: JSendPagination = {
  page: 1,
  limit: 8,
  total: 0,
  totalPages: 1,
};

const normalizePagination = (
  pagination?: Partial<JSendPagination> | null,
  fallback?: { page?: number; limit?: number; total?: number },
): JSendPagination => {
  const limit = pagination?.limit ?? fallback?.limit ?? EMPTY_PAGINATION.limit;
  const total = pagination?.total ?? fallback?.total ?? 0;
  const page = pagination?.page ?? fallback?.page ?? 1;
  const totalPages =
    pagination?.totalPages ?? (total > 0 ? Math.max(1, Math.ceil(total / limit)) : 1);

  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: pagination?.hasNext,
    hasPrev: pagination?.hasPrev,
  };
};

export const resolvePokemonId = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
};

export const normalizeFavoriteToPokemon = (favorite: FavoriteResponseDto): Pokemon | null => {
  const id = resolvePokemonId(favorite.id);

  if (id === null) {
    return null;
  }

  return {
    id,
    name: favorite.name ?? "",
    imageUrl: favorite.imageUrl ?? "",
    type: favorite.type ?? "",
    abilities: favorite.abilities ?? [],
  };
};

export const parseFavoritesListResponse = (response?: FavoritesListResponse) => {
  if (!response) {
    return {
      items: [] as FavoriteResponseDto[],
      pagination: EMPTY_PAGINATION,
    };
  }

  const metaPagination = response.meta?.pagination;

  if (Array.isArray(response.data)) {
    return {
      items: response.data,
      pagination: normalizePagination(metaPagination, {
        limit: metaPagination?.limit,
        total: metaPagination?.total ?? response.data.length,
        page: metaPagination?.page,
      }),
    };
  }

  if (isPaginatedData<FavoriteResponseDto>(response.data)) {
    return {
      items: response.data.items,
      pagination: normalizePagination(response.data.pagination ?? metaPagination, {
        limit: response.data.pagination?.limit ?? metaPagination?.limit,
        total: response.data.pagination?.total ?? metaPagination?.total ?? response.data.items.length,
        page: response.data.pagination?.page ?? metaPagination?.page,
      }),
    };
  }

  const record = response.data as { items?: FavoriteResponseDto[]; pagination?: JSendPagination };

  if (Array.isArray(record?.items)) {
    return {
      items: record.items,
      pagination: normalizePagination(record.pagination ?? metaPagination, {
        total: record.pagination?.total ?? metaPagination?.total ?? record.items.length,
      }),
    };
  }

  return {
    items: [] as FavoriteResponseDto[],
    pagination: normalizePagination(metaPagination),
  };
};

export const getFavoritePokeapiIds = (response?: FavoritesListResponse): Set<number> => {
  const { items } = parseFavoritesListResponse(response);

  return new Set(
    items
      .map((favorite) => resolvePokemonId(favorite.id))
      .filter((id): id is number => id !== null),
  );
};
