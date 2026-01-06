import { localStorageManager } from '@chakra-ui/react';
import { STORAGE_KEYS } from '../../config';
import { storage } from '../../utils';
import type { StorageManager } from '../types';

/**
 * A custom color mode manager that prioritizes user preferences
 * stored in a custom storage solution before falling back to
 * Chakra UI's localStorageManager.
 */
export const customColorModeManager: StorageManager = {
  type: 'localStorage',

  /**
   * Gets the current theme preference. It first checks the custom storage
   * for a user-defined preference ('light' or 'dark'). If none is found,
   * it falls back to the localStorageManager's value.
   */
  get: () => {
    const pref = storage.get(STORAGE_KEYS.THEME);

    if (pref === 'light' || pref === 'dark') {
      return pref;
    }

    if (typeof pref === 'string' && pref !== 'system') {
      storage.set(STORAGE_KEYS.THEME, 'system');
    }

    const chakraValue = localStorageManager.get();

    if (chakraValue === 'light' || chakraValue === 'dark') {
      return chakraValue;
    }

    localStorageManager.set('light');
    return 'light';
  },

  /**
   * Sets the theme preference. If the value is 'system', it does nothing,
   * allowing the system preference to take precedence. For 'light' or 'dark',
   * it delegates to the localStorageManager to persist the choice.
   * @param value - The theme preference to set ('light', 'dark', or 'system').
   */
  set: (value) => {
    if (value === 'system') {
      return;
    }

    localStorageManager.set(value);
  },
};
