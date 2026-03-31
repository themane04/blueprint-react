const fs = require("fs");
const path = require("path");
const { appendToArray } = require("./utils.cjs");

module.exports = function updateCheckConfig(ROOT, namespace) {
  const file = path.join(ROOT, "scripts/i18n/check/config.cjs");

  let content = fs.readFileSync(file, "utf8");
  const updated = appendToArray(content, "NAMESPACES", namespace);

  fs.writeFileSync(file, updated);
  console.log("✓ Updated check config");
};
