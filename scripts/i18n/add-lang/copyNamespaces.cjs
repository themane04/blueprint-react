const fs = require("fs");
const path = require("path");

module.exports = function (ROOT, lang) {
  const EN_DIR = path.join(ROOT, "src/i18n/locales/en");
  const TARGET = path.join(ROOT, `src/i18n/locales/${lang}`);

  const files = fs.readdirSync(EN_DIR).filter((f) => f.endsWith(".json"));

  files.forEach((file) => {
    const dest = path.join(TARGET, file);
    if (!fs.existsSync(dest)) {
      fs.copyFileSync(path.join(EN_DIR, file), dest);
      console.log(`✓ Copied ${file}`);
    }
  });

  return files.map((f) => f.replace(".json", ""));
};
