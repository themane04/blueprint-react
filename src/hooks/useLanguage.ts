import { useCallback } from "react";

import { storage, storageKeys } from "../utils/storage";

import type { UseLanguageReturn } from "./types";
import { useI18n } from "./useI18n";

/**
 * A custom hook for reading and changing the active application language.
 * Persists the selected language to storage so it survives page reloads.
 * @returns The current language code, the list of available languages, and a setter.
 */
export function useLanguage(): UseLanguageReturn {
  const { i18n } = useI18n();

  const setLanguage = useCallback(
    (lang: string): void => {
      i18n
        .changeLanguage(lang)
        .then(() => {
          storage.set(storageKeys.appLang, lang);
        })
        .catch(() => {
          // silent — i18n fallback remains active
        });
    },
    [i18n]
  );

  return {
    currentLang: i18n.language,
    availableLangs: Object.keys(i18n.store.data),
    setLanguage
  };
}
