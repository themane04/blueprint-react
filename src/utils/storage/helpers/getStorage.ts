import type { StorageDriver } from "../types.ts";

/**
 * Get the appropriate storage object based on the driver.
 * @param driver - The storage driver ('local' or 'session').
 * @returns The corresponding Storage object.
 */
export function getStorage(driver: StorageDriver): Storage {
  return driver === "session" ? sessionStorage : localStorage;
}
