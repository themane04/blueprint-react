const path = require("path");

const createLangDir = require("./createLangDir.cjs");
const copyNamespaces = require("./copyNamespaces.cjs");
const updateParser = require("./updateParser.cjs");
const updateIndex = require("./updateIndex.cjs");

const lang = process.argv[2];

if (!lang) {
  console.error("❌ Missing language.\nUsage: npm run i18n:add-lang <langCode>");
  process.exit(1);
}

const ROOT = path.join(__dirname, "..", "..", "..");

console.log(`\n🌍 Adding language: ${lang}\n`);

createLangDir(ROOT, lang);
const namespaces = copyNamespaces(ROOT, lang);
updateParser(ROOT, lang);
updateIndex(ROOT, lang, namespaces);

console.log(`\n🎉 Language '${lang}' added successfully!\n`);