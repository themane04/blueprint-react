import { localStorageManager } from "@chakra-ui/react";

import { storage, storageKeys } from "../../utils/storage";
import { initialColorMode } from "../config.ts";
import type { StorageManager } from "../types";

import { clearColorModeStorage, isColorModeVersionValid } from "./utils";

/**
 * A custom color mode manager that prioritizes user preferences
 * stored in a custom storage solution before falling back to
 * Chakra UI's localStorageManager.
 */
export const customColorModeManager: StorageManager = {
  type: "localStorage",

  /**
   * Gets the current theme preference. It first checks the custom storage
   * for a user-defined preference ('light' or 'dark'). If none is found,
   * it falls back to the localStorageManager's value.
   * @returns The current theme preference ('light' or 'dark').
   */
  get: () => {
    if (!isColorModeVersionValid()) {
      clearColorModeStorage();
      storage.set(storageKeys.colorModeVersion, initialColorMode);
      return initialColorMode;
    }

    const pref = storage.get(storageKeys.themePreference);

    if (pref === "light" || pref === "dark") return pref;

    if (typeof pref === "string" && pref !== "system") {
      storage.set(storageKeys.themePreference, "system");
    }

    const chakraValue = localStorageManager.get();
    if (chakraValue === "light" || chakraValue === "dark") return chakraValue;

    localStorageManager.set(initialColorMode);
    return initialColorMode;
  },

  /**
   * Sets the theme preference. If the value is 'system', it does nothing,
   * allowing the system preference to take precedence. For 'light' or 'dark',
   * it delegates to the localStorageManager to persist the choice.
   * @param value - The theme preference to set ('light', 'dark', or 'system').
   */
  set: (value) => {
    if (value === "system") return;
    storage.set(storageKeys.colorModeVersion, initialColorMode);
    localStorageManager.set(value);
  }
};
