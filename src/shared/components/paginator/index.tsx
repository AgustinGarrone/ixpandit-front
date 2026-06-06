"use client";

import { Button, Flex, Text } from "@chakra-ui/react";
import { type FC } from "react";

type PaginatorProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

type PageItem = number | "ellipsis";

const getVisiblePages = (currentPage: number, totalPages: number): PageItem[] => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages: PageItem[] = [1];

  if (currentPage > 3) {
    pages.push("ellipsis");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let page = start; page <= end; page += 1) {
    if (!pages.includes(page)) {
      pages.push(page);
    }
  }

  if (currentPage < totalPages - 2) {
    pages.push("ellipsis");
  }

  if (!pages.includes(totalPages)) {
    pages.push(totalPages);
  }

  return pages;
};

const PaginatorButton: FC<{
  label: string;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}> = ({ label, isActive = false, disabled = false, onClick }) => (
  <Button
    minW={{ base: "28px", md: "32px" }}
    h={{ base: "28px", md: "32px" }}
    px={0}
    borderRadius="8px"
    bg={isActive ? "var(--pokemon-yellow)" : "var(--glass-bg-light)"}
    color={isActive ? "#0a0a0a" : "var(--text-primary)"}
    border="1px solid"
    borderColor={isActive ? "var(--pokemon-yellow)" : "var(--glass-border)"}
    fontSize={{ base: "7px", md: "8px" }}
    letterSpacing="0.06em"
    disabled={disabled}
    onClick={onClick}
    _hover={{
      bg: isActive ? "var(--pokemon-yellow-hover)" : "var(--glass-bg-hover)",
      borderColor: isActive ? "var(--pokemon-yellow-hover)" : "var(--glass-border-hover)",
    }}
    _disabled={{
      opacity: 0.4,
      cursor: "not-allowed",
    }}
  >
    {label}
  </Button>
);

export const Paginator: FC<PaginatorProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <Flex align="center" justify="center" gap={2} flexWrap="wrap">
      <PaginatorButton
        label="<"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      />

      {visiblePages.map((page, index) =>
        page === "ellipsis" ? (
          <Text
            key={`ellipsis-${index}`}
            color="var(--text-muted)"
            fontSize={{ base: "7px", md: "8px" }}
            px={1}
          >
            ...
          </Text>
        ) : (
          <PaginatorButton
            key={page}
            label={String(page)}
            isActive={page === currentPage}
            onClick={() => onPageChange(page)}
          />
        ),
      )}

      <PaginatorButton
        label=">"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </Flex>
  );
};
