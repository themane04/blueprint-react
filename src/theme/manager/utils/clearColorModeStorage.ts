import { localStorageManager } from "@chakra-ui/react";

import { storage, storageKeys } from "../../../utils/storage";
import { initialColorMode } from "../../config.ts";

/**
 * Clears all stored color mode preferences.
 * Called when the configured default color mode has changed
 * so stale localStorage values don't override the new default.
 */
export const clearColorModeStorage = (): void => {
  storage.remove(storageKeys.themePreference);
  storage.remove(storageKeys.colorModeVersion);
  localStorageManager.set(initialColorMode);
};
