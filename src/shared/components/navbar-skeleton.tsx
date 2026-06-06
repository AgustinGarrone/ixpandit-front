import { Box, Flex, HStack, VStack } from "@chakra-ui/react";

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
    bg="rgba(255, 255, 255, 0.06)"
    className="animate-pulse"
    aria-hidden
  />
);

export const NavbarSkeleton = () => (
  <Box
    as="nav"
    className="navbar"
    position="fixed"
    top={0}
    left={0}
    right={0}
    zIndex={1000}
    bg="var(--bg-primary)"
    borderBottom="1px solid rgba(255, 255, 255, 0.08)"
    aria-busy="true"
    aria-label="Cargando navegación"
  >
    <Flex
      align="center"
      justify="space-between"
      w="full"
      maxW="1440px"
      mx="auto"
      px={{ base: 4, md: 8 }}
      h={{ base: "64px", md: "72px" }}
    >
      <HStack gap={{ base: 3, md: 4 }}>
        <SkeletonBlock w="28px" h="28px" borderRadius="full" />
        <VStack align="flex-start" gap={2}>
          <SkeletonBlock w={{ base: "140px", md: "160px" }} h="16px" />
          <SkeletonBlock w={{ base: "180px", md: "200px" }} h="12px" />
        </VStack>
      </HStack>

      <HStack gap={4}>
        <SkeletonBlock w={{ base: "88px", md: "96px" }} h="14px" />
        <SkeletonBlock
          w={{ base: "120px", md: "132px" }}
          h={{ base: "36px", md: "40px" }}
          borderRadius="999px"
        />
      </HStack>
    </Flex>
  </Box>
);
