import type { i18n as I18nInstance } from "i18next";
import { type Dispatch, type SetStateAction } from "react";

import type { TypedT } from "../i18n/hooks";

export type UseI18nReturn = {
  t: TypedT;
  i18n: I18nInstance;
};

export type UseThemePreferenceReturn = {
  preference: ThemePreference;
  colorMode: string;
  setPreference: Dispatch<SetStateAction<ThemePreference>>;
};

export type ThemePreference = "light" | "dark" | "system";
