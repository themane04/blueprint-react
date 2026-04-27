import type { AnyI18nKey } from "../../i18n/keys.ts";

export type FrontendError = {
  frontendError: true;
  key: AnyI18nKey;
};

export type BackendMessageMapState = Record<string, AnyI18nKey>;
