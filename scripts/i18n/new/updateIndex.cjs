const fs = require("fs");
const path = require("path");
const { appendToArray } = require("./utils.cjs");

module.exports = function updateIndex(ROOT, namespace) {
  const file = path.join(ROOT, "src/i18n/index.ts");
  let content = fs.readFileSync(file, "utf8");

  const localesDir = path.join(ROOT, "src/i18n/locales");
  const langs = fs
    .readdirSync(localesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const lang of langs) {
    // 1. Add import
    const importLine = `import ${namespace}_${lang} from "./locales/${lang}/${namespace}.json";`;
    if (!content.includes(importLine)) {
      content = content.replace(
        "// @i18n-imports-end",
        `${importLine}\n// @i18n-imports-end`
      );
    }

    // 2. Inject resource entry into the correct language block
    const resourceEntry = `${namespace}: ${namespace}_${lang},`;
    if (content.includes(resourceEntry)) continue;

    if (lang === "en") {
      // en block has // @i18n-resources-end inside it.
      // Fix missing trailing comma on whatever was the last entry before we insert.
      content = content.replace(
        /([ \t]+\w+:\s*\w+)([ \t]*\n[ \t]*\/\/ @i18n-resources-end)/,
        (_, lastEntry, rest) => {
          const fixed = lastEntry.trimEnd().endsWith(",") ? lastEntry : `${lastEntry},`;
          return `${fixed}\n      ${resourceEntry}${rest}`;
        }
      );
    } else {
      // Other lang blocks: find `lang: { ... }` and append inside the closing brace
      const langBlockRegex = new RegExp(
        `(${lang}:\\s*\\{[^}]*?)(\\s*\\})`,
        "s"
      );
      content = content.replace(langBlockRegex, (_, body, closing) => {
        // Fix missing trailing comma on last entry in this block too
        const fixedBody = body.trimEnd().endsWith(",") ? body : `${body},`;
        return `${fixedBody}\n      ${resourceEntry}${closing}`;
      });
    }
  }

  content = appendToArray(content, "ns", namespace);

  fs.writeFileSync(file, content);
  console.log("✓ Updated index.ts");
};