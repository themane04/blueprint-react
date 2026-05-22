// i18n imports
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { data } from "../config";
import { storage, storageKeys } from "../utils/storage";

// i18n namespace imports (AUTO-GENERATED)
import common_de from "./locales/de/common.json";
import error_de from "./locales/de/error.json";
import common_en from "./locales/en/common.json";
import error_en from "./locales/en/error.json";
// @i18n-imports-end

const savedLang = storage.get<string>(storageKeys.appLang) || data.defaultAppLang;

i18n.use(initReactI18next).init({
  resources: {
    // @i18n-resources-start
    en: {
      common: common_en,
      error: error_en
      // @i18n-resources-end
    },
    de: {
      common: common_de,
      error: error_de
    }
    // @i18n-resources-lang-end
  },
  lng: savedLang,
  fallbackLng: data.defaultAppLang,
  ns: ["common", "error"],
  defaultNS: "common"
});
