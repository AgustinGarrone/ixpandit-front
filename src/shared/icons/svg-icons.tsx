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

export const PokemonMasterIcon = () => (
  <Box as="span" display="inline-flex" flexShrink={0}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 13.5L12 7l9 6.5"
        stroke="#e53e3e"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <ellipse cx="12" cy="13.5" rx="9" ry="3.5" fill="#e53e3e" />
      <path d="M3 13.5h18" stroke="white" strokeWidth="1.5" />
      <circle cx="12" cy="17" r="2.5" fill="#f6e05e" stroke="#1a1a2e" strokeWidth="1" />
    </svg>
  </Box>
);

export const LogoutIcon = () => (
  <Box as="span" display="inline-flex" flexShrink={0} color="#e53e3e">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 17l5-5-5-5M21 12H9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Box>
);

export const GithubIcon = () => (
  <Box as="span" display="inline-flex" flexShrink={0} color="white">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  </Box>
);

export const SearchIcon = () => (
  <Box as="span" display="inline-flex" flexShrink={0} color="var(--text-muted)">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </Box>
);
