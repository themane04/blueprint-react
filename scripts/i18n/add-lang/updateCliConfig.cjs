const fs = require("fs");
const path = require("path");

/**
 * Adds the new locale code to the locales array in i18next.config.ts.
 */
module.exports = function updateCliConfig(ROOT, lang) {
  const file = path.join(ROOT, "i18next.config.ts");
  let content = fs.readFileSync(file, "utf8");

  if (content.includes(`"${lang}"`)) {
    console.log(`⚠ Language '${lang}' already present in i18next.config.ts`);
    return;
  }

  content = content.replace(/locales:\s*\[([^\]]*)\]/, (match, inner) => {
    const items = inner
      .split(",")
      .map((i) => i.trim().replace(/['"]/g, ""))
      .filter(Boolean);
    if (!items.includes(lang)) items.push(lang);
    return `locales: [${items.map((i) => `"${i}"`).join(", ")}]`;
  });

  fs.writeFileSync(file, content);
  console.log("✓ Updated i18next.config.ts");
};
