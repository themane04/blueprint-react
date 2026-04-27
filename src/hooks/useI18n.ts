// eslint-disable-next-line no-restricted-imports -- this hook is the typed wrapper around useTranslation, direct import is intentional here
import { useTranslation as useBaseTranslation } from "react-i18next";

import type { TypedT } from "../i18n/hooks";

import type { UseI18nReturn } from "./types.ts";

/**
 * A custom hook that wraps the useTranslation hook from react-i18next
 * to provide a typed translation function.
 * @returns An object containing the typed translation function and other i18n utilities.
 */
export function useI18n(): UseI18nReturn {
  const { t, ...rest } = useBaseTranslation();

  const typedT: TypedT = (key, options) =>
    t(key, "", { ...(options ?? {}), returnObjects: false });

  return {
    t: typedT,
    ...rest
  };
}
