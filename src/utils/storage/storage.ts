import { getStorage } from "./helpers";
import type { StorageDriver } from "./types.ts";

/** Wrapper around localStorage and sessionStorage with JSON serialization/deserialization. */
export const storage = {
  /**
   * Retrieves a value from storage and parses it from JSON.
   * @param key - Storage key
   * @param driver - Storage driver ("local" or "session"), defaults to "local"
   * @returns Parsed value or null if not found or on error
   */
  get<T>(key: string, driver: StorageDriver = "local"): T | null {
    try {
      const raw = getStorage(driver).getItem(key);
      if (!raw) return null;
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  /**
   * Sets a value in storage after serializing it to JSON.
   * @param key - Storage key
   * @param value - Value to store (will be JSON-stringified)
   * @param driver - Storage driver ("local" or "session"), defaults to "local"
   */
  set<T>(key: string, value: T, driver: StorageDriver = "local"): void {
    getStorage(driver).setItem(key, JSON.stringify(value));
  },

  /**
   * Removes an item from storage.
   * @param key - Storage key to remove
   * @param driver - Storage driver ("local" or "session"), defaults to "local"
   */
  remove(key: string, driver: StorageDriver = "local"): void {
    getStorage(driver).removeItem(key);
  }
};
