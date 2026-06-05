import { Box } from "@chakra-ui/react";

export const PokeballIcon = () => (
  <Box as="span" display="inline-flex" flexShrink={0}>
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <circle cx="13" cy="13" r="12" fill="white" stroke="#1a1a2e" strokeWidth="1.5" />
      <path d="M1 13h24" stroke="#1a1a2e" strokeWidth="1.5" />
      <circle cx="13" cy="13" r="4.5" fill="#1a1a2e" stroke="white" strokeWidth="1.5" />
      <path d="M1 13a12 12 0 0 1 24 0" fill="#e53e3e" />
    </svg>
  </Box>
);

export const UserIcon = () => (
  <Box as="span" display="inline-flex" flexShrink={0}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </Box>
);
