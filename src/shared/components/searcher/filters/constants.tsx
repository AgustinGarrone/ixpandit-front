import { Box, Button, Flex } from "@chakra-ui/react";
import { type FC } from "react";
import { type ReactNode } from "react";

const SKELETON_COUNT = 6;

const filterRowStyles = {
  scrollbarWidth: "thin" as const,
  scrollbarColor: "rgba(255, 255, 255, 0.2) transparent",
  "&::-webkit-scrollbar": { height: "4px" },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "999px",
  },
};

export const FilterSkeleton = () => (
  <Flex
    gap={2}
    flexWrap="nowrap"
    overflowX="auto"
    overflowY="hidden"
    pb={1}
    aria-busy="true"
    aria-label="Cargando filtros"
    css={filterRowStyles}
  >
    {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
      <Box
        key={index}
        h="36px"
        w={{ base: "72px", md: "84px" }}
        borderRadius="999px"
        bg="rgba(255, 255, 255, 0.06)"
        className="animate-pulse"
        flexShrink={0}
      />
    ))}
  </Flex>
);

type FilterPillProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

export const FilterPill: FC<FilterPillProps> = ({ label, isActive, onClick }) => (
  <Button
    h="36px"
    px={4}
    borderRadius="999px"
    fontSize="sm"
    fontWeight="500"
    flexShrink={0}
    bg={isActive ? "var(--accent-purple)" : "transparent"}
    color="var(--text-primary)"
    border="1px solid"
    borderColor={isActive ? "var(--accent-purple)" : "rgba(255, 255, 255, 0.16)"}
    onClick={onClick}
    _hover={{
      bg: isActive ? "var(--accent-purple-hover)" : "rgba(255, 255, 255, 0.04)",
      borderColor: isActive ? "var(--accent-purple-hover)" : "rgba(255, 255, 255, 0.24)",
    }}
  >
    {label}
  </Button>
);

type FilterRowProps = {
  expanded: boolean;
  children: ReactNode;
};

export const FilterRow: FC<FilterRowProps> = ({ expanded, children }) => (
  <Flex
    gap={2}
    flexWrap={expanded ? "wrap" : "nowrap"}
    overflowX={expanded ? "visible" : "auto"}
    overflowY="hidden"
    pb={expanded ? 0 : 1}
    css={expanded ? undefined : filterRowStyles}
  >
    {children}
  </Flex>
);
