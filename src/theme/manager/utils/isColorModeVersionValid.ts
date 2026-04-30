import { storage, storageKeys } from "../../../utils/storage";
import { initialColorMode } from "../../config.ts";

/**
 * Returns true if the stored color mode version matches the current
 * configured default, meaning the cache is still valid.
 * @returns True if the color mode version is valid.
 */
export const isColorModeVersionValid = (): boolean => {
  return storage.get(storageKeys.colorModeVersion) === initialColorMode;
};
