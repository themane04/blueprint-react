const fs = require("fs");
const path = require("path");

module.exports = function (ROOT, lang) {
  const dir = path.join(ROOT, `src/i18n/locales/${lang}`);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✓ Created ${lang} folder`);
  }
};
