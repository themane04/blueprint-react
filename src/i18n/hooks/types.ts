import type { AnyI18nKey } from "../keys.ts";

export type I18nToastProps = {
  showError: (key: AnyI18nKey) => void;
  showSuccess: (key: AnyI18nKey) => void;
  showInfo: (key: AnyI18nKey) => void;
  showWarning: (key: AnyI18nKey) => void;
};

export type TypedT = (key: AnyI18nKey, options?: Record<string, unknown>) => string;
