const fs = require("fs");
const path = require("path");
const { appendToArray } = require("./utils.cjs");

module.exports = function updateIndex(ROOT, namespace) {
  const file = path.join(ROOT, "src/i18n/index.ts");

  let content = fs.readFileSync(file, "utf8");

  const importLine = `import ${namespace}_en from "./locales/en/${namespace}.json";`;

  if (!content.includes(importLine)) {
    content = content.replace(/(import .*;\n)+/, (m) => m + importLine + "\n");
  }

  content = content.replace(/en:\s*{([\s\S]*?)}/, (match, inner) => {
    if (inner.includes(`${namespace}:`)) return match;

    return `en: {\n${inner.trimEnd()},\n      ${namespace}: ${namespace}_en\n    }`;
  });

  content = appendToArray(content, "ns", namespace);

  fs.writeFileSync(file, content);
  console.log("✓ Updated index.ts");
};
