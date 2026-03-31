const fs = require("fs");
const path = require("path");

module.exports = function createNamespaceFile(ROOT, namespace) {
  const file = path.join(ROOT, "src/i18n/locales/en", `${namespace}.json`);

  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, "{}\n");
    console.log(`✓ Created ${namespace}.json`);
  } else {
    console.log(`⚠ ${namespace}.json already exists`);
  }
};
