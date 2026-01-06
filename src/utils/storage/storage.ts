import { getStorage } from './helpers.ts';
import type { StorageDriver } from './types.ts';

/**
 * Wrapper around localStorage and sessionStorage
 * with JSON serialization/deserialization.
 */
export const storage = {
  get<T>(key: string, driver: StorageDriver = 'local'): T | null {
    try {
      const raw = getStorage(driver).getItem(key);
      if (!raw) return null;
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T, driver: StorageDriver = 'local') {
    getStorage(driver).setItem(key, JSON.stringify(value));
  },

  remove(key: string, driver: StorageDriver = 'local') {
    getStorage(driver).removeItem(key);
  },
};
