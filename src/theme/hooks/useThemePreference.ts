import { useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../../config';
import { storage } from '../../utils';
import type { ThemePreference } from '../types.ts';

export function useThemePreference() {
  const { colorMode, setColorMode } = useColorMode();

  const [preference, setPreference] = useState<ThemePreference>(() => {
    return storage.get<ThemePreference>(STORAGE_KEYS.THEME) || 'system';
  });

  useEffect(() => {
    storage.set(STORAGE_KEYS.THEME, preference);

    if (preference === 'system') {
      setColorMode('system');
    } else {
      setColorMode(preference);
    }
  }, [preference, setColorMode]);

  return {
    preference,
    colorMode,
    setPreference,
  };
}
