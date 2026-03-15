const path = require("path");

const ROOT = path.join(__dirname, "..", "..", "..");

module.exports = {
  LOCALES_DIR: path.join(ROOT, "src", "i18n", "locales", "en"),
  EXTRACTED_DIR: path.join(ROOT, "src", "i18n", ".extracted", "en"),
  SRC_DIR: path.join(ROOT, "src"),

  NAMESPACES: ["common", "error"],

  VALIDATOR_FIELDS: [
    "first_name",
    "last_name",
    "username",
    "email",
    "password",
    "confirm_password"
  ]
};
