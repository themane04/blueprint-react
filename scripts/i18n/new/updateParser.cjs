const fs = require("fs");
const path = require("path");
const { appendToArray } = require("./utils.cjs");

module.exports = function updateParser(ROOT, namespace) {
  const file = path.join(ROOT, "i18next-parser.config.cjs");

  let content = fs.readFileSync(file, "utf8");
  const updated = appendToArray(content, "ns", namespace);

  fs.writeFileSync(file, updated);
  console.log("✓ Updated parser config");
};
