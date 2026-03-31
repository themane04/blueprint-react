const fs = require("fs");
const path = require("path");

module.exports = function (ROOT, lang) {
  const file = path.join(ROOT, "i18next-parser.config.cjs");

  let content = fs.readFileSync(file, "utf8");

  content = content.replace(/locales:\s*\[([^\]]*)\]/, (match, inner) => {
    const items = inner
      .split(",")
      .map((i) => i.trim().replace(/['"]/g, ""))
      .filter(Boolean);

    if (!items.includes(lang)) items.push(lang);

    return `locales: [${items.map((i) => `"${i}"`).join(", ")}]`;
  });

  fs.writeFileSync(file, content);
  console.log("✓ Updated parser config");
};
