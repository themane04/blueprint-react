// i18n imports
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// i18n namespace imports (AUTO-GENERATED)
import common_en from "./locales/en/common.json";
import error_en from "./locales/en/error.json";
// @i18n-imports-end

i18n.use(initReactI18next).init({
  resources: {
    // @i18n-resources-start
    en: {
      common: common_en,
      error: error_en
      // @i18n-resources-end
    }
    // @i18n-resources-lang-end
  },
  lng: "en",
  fallbackLng: "en",
  ns: ["common", "error"],
  defaultNS: "common"
});
