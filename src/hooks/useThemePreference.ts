import { useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { storage, storageKeys } from "../utils/storage";

import type { ThemePreference, UseThemePreferenceReturn } from "./types.ts";

/**
 * Custom hook to manage user's theme preference (light, dark, system).
 * This hook synchronizes the user's theme preference with local storage
 * and listens for system color scheme changes when the preference is set to 'system'.
 * @returns An object containing the current theme preference, color mode, and a setter function.
 */
export function useThemePreference(): UseThemePreferenceReturn {
  const { colorMode, setColorMode } = useColorMode();
  const storageKey = storageKeys.themePreference;

  const [preference, setPreference] = useState<ThemePreference>(() => {
    return storage.get<ThemePreference>(storageKey) || "system";
  });

  useEffect(() => {
    storage.set(storageKey, preference);

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
