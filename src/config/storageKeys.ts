/**
 * Storage keys used for localStorage or sessionStorage.
 */
export const STORAGE_KEYS = {
  THEME: 'theme-preference',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
