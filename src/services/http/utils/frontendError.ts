import type { AnyI18nKey } from "../../../i18n/keys.ts";

/** Custom error class for frontend-specific errors. */
export class FrontendError extends Error {
  frontendError = true;
  key: AnyI18nKey;
  details?: string;

  constructor(key: AnyI18nKey, message?: string) {
    super(message ?? key);
    this.key = key;
    this.details = message;
    this.name = "FrontendError";
  }
}
