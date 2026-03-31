const fs = require("fs");
const path = require("path");
const { appendToArray } = require("./utils.cjs");

module.exports = function updateIndex(ROOT, namespace) {
  const file = path.join(ROOT, "src/i18n/index.ts");
  let content = fs.readFileSync(file, "utf8");

  const importLine = `import ${namespace}_en from "./locales/en/${namespace}.json";`;

  if (!content.includes(importLine)) {
    content = content.replace(
      "// @i18n-imports-end",
      `${importLine}\n// @i18n-imports-end`
    );
  }

  content = content.replace(
    "// @i18n-resources-end",
    `,      ${namespace}: ${namespace}_en\n      // @i18n-resources-end`
  );

  content = appendToArray(content, "ns", namespace);

  fs.writeFileSync(file, content);
  console.log("✓ Updated index.ts");
};