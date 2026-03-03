const fs = require("fs");
const path = require("path");

const lang = process.argv[2];

if (!lang) {
  console.error("❌ Missing language.\nUsage: npm run i18n:add-lang <langCode>");
  process.exit(1);
}

const ROOT = path.join(__dirname, "..", "..", "..");
const EN_DIR = path.join(ROOT, "src/i18n/locales/en");
const NEW_LANG_DIR = path.join(ROOT, `src/i18n/locales/${lang}`);
const INDEX_TS = path.join(ROOT, "src/i18n/index.ts");
const PARSER_CONFIG = path.join(ROOT, "i18next-parser.config.cjs");

console.log(`\n🌍 Adding new language: ${lang}\n`);

/* --------------------------------------------------
 * 1. Create folder
 * -------------------------------------------------- */
if (!fs.existsSync(NEW_LANG_DIR)) {
  fs.mkdirSync(NEW_LANG_DIR, { recursive: true });
  console.log(`✓ Created folder: ${NEW_LANG_DIR}`);
} else {
  console.log(`⚠ Folder already exists: ${NEW_LANG_DIR}`);
}

/* --------------------------------------------------
 * 2. Copy namespaces from EN
 * -------------------------------------------------- */
const namespaces = fs.readdirSync(EN_DIR).filter((file) => file.endsWith(".json"));

namespaces.forEach((file) => {
  const dest = path.join(NEW_LANG_DIR, file);
  if (!fs.existsSync(dest)) {
    fs.copyFileSync(path.join(EN_DIR, file), dest);
    console.log(`✓ Copied ${file}`);
  } else {
    console.log(`⚠ File exists: ${file}`);
  }
});

/* --------------------------------------------------
 * 3. Update i18n/index.ts
 * -------------------------------------------------- */
let indexTs = fs.readFileSync(INDEX_TS, "utf8");

// Insert imports
namespaces.forEach((file) => {
  const ns = file.replace(".json", "");
  const importLine = `import ${ns}_${lang} from './locales/${lang}/${ns}.json';`;

  if (!indexTs.includes(importLine)) {
    indexTs = importLine + "\n" + indexTs;
  }
});

// Add to resources
// Add to resources (NOT nested under en)
const resourcesRegex = /resources:\s*{([\s\S]*?)\n\s*},\s*\n\s*lng:/m;

indexTs = indexTs.replace(resourcesRegex, (match, inner) => {
  if (inner.includes(`${lang}:`)) return match;

  let langBlock = `  ${lang}: {\n`;
  namespaces.forEach((file) => {
    const ns = file.replace(".json", "");
    langBlock += `    ${ns}: ${ns}_${lang},\n`;
  });
  langBlock += `  },\n`;

  return `resources: {\n${inner}${langBlock}},\n  lng:`;
});

fs.writeFileSync(INDEX_TS, indexTs);
console.log("✓ Updated src/i18n/index.ts");

/* --------------------------------------------------
 * 4. Update i18next-parser config
 * -------------------------------------------------- */
let parser = fs.readFileSync(PARSER_CONFIG, "utf8");
if (!parser.includes(`'${lang}'`)) {
  parser = parser.replace(
    /locales:\s*\[(.*?)\]/s,
    (m, inner) => `locales: [${inner.trim()}, '${lang}']`
  );
  fs.writeFileSync(PARSER_CONFIG, parser);
  console.log("✓ Added to i18next-parser.config.cjs");
} else {
  console.log("⚠ Already exists in i18next-parser.config.cjs");
}

console.log(`\n🎉 Language '${lang}' added successfully!\n`);
