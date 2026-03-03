import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import common_en from "./locales/en/common.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: common_en
    }
  },
  lng: "en",
  fallbackLng: "en",
  ns: ["common"],
  defaultNS: "common"
});
