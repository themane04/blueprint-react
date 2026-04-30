import { defineConfig } from "i18next-cli";

export default defineConfig({
  locales: ["en"],

  extract: {
    input: ["src/**/*.{ts,tsx}"],
    output: "src/i18n/locales/{{language}}/{{namespace}}.json",
    defaultNS: "common",
    keySeparator: ".",
    nsSeparator: ":",
    removeUnusedKeys: true,
    functions: [
      "t",
      "i18n.t",
      "showSuccess",
      "showError",
      "showWarning",
      "showInfo",
      "FrontendError"
    ]
  }
});