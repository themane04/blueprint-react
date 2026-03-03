import { useTranslation as useBaseTranslation } from "react-i18next";

import type { TypedT } from "../i18n/toast/types.ts";

import type { I18nProps } from "./types.ts";

/**
 * A custom hook that wraps the useTranslation hook from react-i18next
 * to provide a typed translation function.
 * @returns An object containing the typed translation function and other i18n utilities.
 */
export function useI18n(): I18nProps {
  const { t, ...rest } = useBaseTranslation();

  const typedT: TypedT = (key, options) =>
    t(key, "", { ...(options ?? {}), returnObjects: false });

  return {
    t: typedT,
    ...rest
  };
}
