import type { i18n as I18nInstance } from "i18next";

import type { TypedT } from "../i18n/toast/types.ts";

export type I18nProps = {
  t: TypedT;
  i18n: I18nInstance;
};
