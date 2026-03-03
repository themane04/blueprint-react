import { useToast } from "@chakra-ui/react";
import i18n from "i18next";

import { AppToastOptions } from "../../components/ui/toast";
import type { AnyI18nKey } from "../keys.ts";

import type { I18nToastProps } from "./types.ts";

/**
 * A custom hook that provides internationalized toast notifications.
 * It uses Chakra UI's toast system and i18next for translations.
 * @returns An object with methods to show different types of toast notifications.
 */
export function useI18nToast(): I18nToastProps {
  const toast = useToast();

  /**
   * Safely translates a given key using i18next.
   * @param key - The i18n key to translate.
   * @param params - Optional parameters for interpolation in the translation.
   * @returns The translated string or the key itself if translation is missing.
   */
  function safeTranslate(key: AnyI18nKey, params?: Record<string, unknown>): AnyI18nKey {
    const value = i18n.t(key, {
      ...params,
      defaultValue: key,
      returnObjects: false
    });

    return typeof value === "string" && value.trim() !== "" ? value : key;
  }

  /**
   * Shows an error toast notification with the translated message.
   * @param key - The i18n key for the error message.
   */
  function showError(key: AnyI18nKey): void {
    toast({
      description: safeTranslate(key),
      status: "error",
      ...AppToastOptions
    });
  }

  /**
   * Shows a success toast notification with the translated message.
   * @param key - The i18n key for the success message.
   */
  function showSuccess(key: AnyI18nKey): void {
    toast({
      description: safeTranslate(key),
      status: "success",
      ...AppToastOptions
    });
  }

  /**
   * Shows an info toast notification with the translated message.
   * @param key - The i18n key for the info message.
   */
  function showInfo(key: AnyI18nKey): void {
    toast({
      description: safeTranslate(key),
      status: "info",
      ...AppToastOptions
    });
  }

  /**
   * Shows a warning toast notification with the translated message.
   * @param key - The i18n key for the warning message.
   */
  function showWarning(key: AnyI18nKey): void {
    toast({
      description: safeTranslate(key),
      status: "warning",
      ...AppToastOptions
    });
  }

  return { showError, showSuccess, showInfo, showWarning };
}
