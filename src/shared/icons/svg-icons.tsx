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

export const BookmarkIcon = ({ filled = false }: { filled?: boolean }) => (
  <Box
    as="span"
    display="inline-flex"
    flexShrink={0}
    color={filled ? "var(--pokemon-yellow)" : "var(--text-muted)"}
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      aria-hidden="true"
    >
      <path
        d="M6 4a2 2 0 012-2h8a2 2 0 012 2v16l-6-3.5L6 20V4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  </Box>
);

export const SunIcon = () => (
  <Box as="span" display="inline-flex" flexShrink={0} color="currentColor">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </Box>
);

export const ChevronDownIcon = () => (
  <Box as="span" display="inline-flex" flexShrink={0} color="var(--text-muted)">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Box>
);

export const StarFeatureIcon = () => (
  <Box as="span" display="inline-flex" flexShrink={0}>
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2.25l2.63 5.33 5.88.85-4.25 4.14 1 5.86L12 16.02l-5.26 2.41 1-5.86-4.25-4.14 5.88-.85L12 2.25z"
        fill="#ffcb05"
      />
    </svg>
  </Box>
);

export const TeamFeatureIcon = () => (
  <Box as="span" display="inline-flex" flexShrink={0}>
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="8.25" cy="7.75" r="3" fill="#3ab7ff" />
      <circle cx="16.25" cy="8.75" r="2.5" fill="#3ab7ff" />
      <path
        d="M2.75 19.25c0-2.9 2.46-5.25 5.5-5.25s5.5 2.35 5.5 5.25"
        fill="#3ab7ff"
      />
      <path
        d="M14.25 18.5c0-1.88 1.4-3.4 3.15-3.4 1.35 0 2.5.82 2.98 1.98"
        stroke="#3ab7ff"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  </Box>
);

export const EggFeatureIcon = () => (
  <Box as="span" display="inline-flex" flexShrink={0}>
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3c-3.95 0-7 4.55-7 9.25 0 3.58 3.13 6.5 7 6.5s7-2.92 7-6.5C19 7.55 15.95 3 12 3z"
        fill="#c4b5fd"
      />
      <circle cx="10" cy="11" r="1.05" fill="#7c3aed" />
      <circle cx="13.5" cy="13.25" r="0.95" fill="#7c3aed" />
      <circle cx="11.25" cy="15.5" r="0.8" fill="#7c3aed" />
      <circle cx="14.1" cy="10.35" r="0.7" fill="#7c3aed" />
    </svg>
  </Box>
);

export const PokeballOutlineIcon = () => (
  <Box as="span" display="inline-flex" flexShrink={0}>
    <svg width="62" height="62" viewBox="0 0 62 62" fill="none" aria-hidden="true">
      <circle cx="31" cy="31" r="26" stroke="#1c2c4e" strokeWidth="1.75" />
      <path d="M5 31h52" stroke="#1c2c4e" strokeWidth="1.75" />
      <circle cx="31" cy="31" r="8" stroke="#1c2c4e" strokeWidth="1.75" />
    </svg>
  </Box>
);
