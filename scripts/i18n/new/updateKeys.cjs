const fs = require("fs");
const path = require("path");
const { capitalize } = require("./utils.cjs");

module.exports = function updateKeys(ROOT, namespace) {
  const file = path.join(ROOT, "src/i18n/keys.ts");
  let content = fs.readFileSync(file, "utf8");

  const cap = capitalize(namespace);

  const importLine = `import type ${namespace} from "./locales/en/${namespace}.json";`;
  const flatLine = `type ${cap}Flat = FlatKeys<typeof ${namespace}>;`;
  const keyLine = `export type ${cap}Key = \`${namespace}:\${${cap}Flat}\`;`;

  if (!content.includes(importLine)) {
    content = content.replace(
      "// @i18n-types-imports-end",
      `${importLine}\n// @i18n-types-imports-end`
    );
  }

  if (!content.includes(flatLine)) {
    content = content.replace("// @i18n-types-end", `${flatLine}\n// @i18n-types-end`);
  }

  if (!content.includes(keyLine)) {
    content = content.replace("// @i18n-keys-end", `${keyLine}\n// @i18n-keys-end`);
  }

  content = content.replace(/export type AnyI18nKey\s*=\s*([^;]+);?/, (match, union) => {
    let clean = union.trim();

    clean = clean.replace(/\|\s*$/, "");

    const parts = clean
      .split("|")
      .map((p) => p.trim())
      .filter(Boolean);

    if (!parts.includes(`${cap}Key`)) {
      parts.push(`${cap}Key`);
    }

    return `export type AnyI18nKey = ${parts.join(" | ")};`;
  });

  fs.writeFileSync(file, content);
  console.log("✓ Updated keys.ts");
};
