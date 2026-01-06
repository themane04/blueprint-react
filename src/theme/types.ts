export type StorageManager = {
  type: 'localStorage' | 'cookie';
  get: (init?: 'light' | 'dark' | undefined) => 'light' | 'dark' | undefined;
  set: (value: ThemePreference) => void;
};

export type ThemePreference = 'light' | 'dark' | 'system';
