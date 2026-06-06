import { Box, Flex, HStack } from "@chakra-ui/react";

const SkeletonBlock = ({
  w,
  h,
  borderRadius = "8px",
}: {
  w: string | Record<string, string>;
  h: string | Record<string, string>;
  borderRadius?: string;
}) => (
  <Box
    w={w}
    h={h}
    borderRadius={borderRadius}
    bg="var(--glass-bg-light)"
    border="1px solid"
    borderColor="var(--glass-border)"
    className="animate-pulse"
    aria-hidden
  />
);

export const NavbarSkeleton = () => (
  <Box
    as="nav"
    position="fixed"
    top={{ base: "12px", md: "16px" }}
    left="50%"
    transform="translateX(-50%)"
    zIndex={1000}
    w="calc(100% - 32px)"
    maxW="1180px"
    aria-busy="true"
    aria-label="Cargando navegación"
  >
    <Flex
      className="glass glass-bar"
      align="center"
      justify="space-between"
      px={{ base: 4, md: 6 }}
      h={{ base: "48px", md: "52px" }}
    >
      <HStack gap={3} minW={0}>
        <SkeletonBlock w="24px" h="24px" borderRadius="full" />
        <SkeletonBlock w={{ base: "88px", md: "96px" }} h={{ base: "10px", md: "12px" }} />
      </HStack>

      <SkeletonBlock w={{ base: "112px", md: "128px" }} h={{ base: "32px", md: "36px" }} />
    </Flex>
  </Box>
);
