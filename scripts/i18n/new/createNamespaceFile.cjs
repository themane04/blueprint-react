const fs = require("fs");
const path = require("path");

module.exports = function createNamespaceFile(ROOT, namespace) {
  const localesDir = path.join(ROOT, "src/i18n/locales");

  const langs = fs
    .readdirSync(localesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const lang of langs) {
    const file = path.join(localesDir, lang, `${namespace}.json`);
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, "{}\n");
      console.log(`✓ Created ${namespace}.json for '${lang}'`);
    } else {
      console.log(`⚠ ${namespace}.json already exists for '${lang}'`);
    }
  }
};