import { useMediaQuery } from "@chakra-ui/react";

/**
 * Hook to determine if a media query matches the current viewport.
 * @param query - The media query string to evaluate.
 * @returns A boolean indicating whether the media query matches.
 */
export function useMatch(query: string): boolean {
  const [match] = useMediaQuery(query);
  return match;
}
