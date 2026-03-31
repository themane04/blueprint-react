/** i18next-parser config */
module.exports = {
  input: ["src/**/*.{ts,tsx}"],
  output: "src/i18n/.extracted/$LOCALE/$NAMESPACE.json",
  locales: ["en"],
  ns: ["common", "error"],
  defaultNamespace: "common",
  keySeparator: ".",
  namespaceSeparator: ":",
  createOldCatalogs: false,
  keepRemoved: false,
  lexers: {
    tsx: [
      {
        lexer: "JsxLexer",
        attr: true,
        parseAttrValue: true,
        attrList: [
          "tHeading",
          "tSubheading",
          "tButtonText",
          "tLoadingText",
          "tLinkText",
          "tLinkActionText"
        ]
      },
      {
        lexer: "JavascriptLexer",
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
    ],
    ts: [
      {
        lexer: "JavascriptLexer",
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
    ]
  }
};
