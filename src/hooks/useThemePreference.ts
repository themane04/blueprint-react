import { useColorMode } from "@chakra-ui/react";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

import { STORAGE_KEYS } from "../config";
import type { ThemePreference } from "../theme/types.ts";
import { storage } from "../utils";

/**
 * Custom hook to manage user's theme preference (light, dark, system).
 *
 * This hook synchronizes the user's theme preference with local storage
 * and listens for system color scheme changes when the preference is set to 'system'.
 *
 * @returns An object containing the current theme preference, color mode, and a setter function.
 */
export function useThemePreference(): {
  preference: ThemePreference;
  colorMode: string;
  setPreference: Dispatch<SetStateAction<ThemePreference>>;
} {
  const { colorMode, setColorMode } = useColorMode();

  const [preference, setPreference] = useState<ThemePreference>(() => {
    return storage.get<ThemePreference>(STORAGE_KEYS.THEME) || "system";
  });

  useEffect(() => {
    storage.set(STORAGE_KEYS.THEME, preference);

    if (preference === "system") {
      setColorMode("system");
    } else {
      setColorMode(preference);
    }
  }, [preference, setColorMode]);

  return {
    preference,
    colorMode,
    setPreference
  };
}
