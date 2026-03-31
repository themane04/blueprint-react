const fs = require("fs");
const path = require("path");
const { capitalize } = require("./utils.cjs");

module.exports = function updateKeys(ROOT, namespace) {
  const file = path.join(ROOT, "src/i18n/keys.ts");

  let content = fs.readFileSync(file, "utf8");

  const cap = capitalize(namespace);

  const importLine = `import type ${namespace} from "./locales/en/${namespace}.json";`;

  if (!content.includes(importLine)) {
    content = content.replace(/(import type .*;\n)+/, (m) => m + importLine + "\n");
  }

  if (!content.includes(`${cap}Flat`)) {
    content += `\ntype ${cap}Flat = FlatKeys<typeof ${namespace}>;\n`;
  }

  if (!content.includes(`${cap}Key`)) {
    content += `export type ${cap}Key = \`${namespace}:\${${cap}Flat}\`;\n`;
  }

  content = content.replace(/export type AnyI18nKey\s*=\s*([^;]+);/, (match, union) => {
    if (union.includes(`${cap}Key`)) return match;
    return `export type AnyI18nKey = ${union} | ${cap}Key;`;
  });

  fs.writeFileSync(file, content);
  console.log("✓ Updated keys.ts");
};
