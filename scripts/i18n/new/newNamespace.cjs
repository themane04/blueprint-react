const fs = require("fs");
const path = require("path");

const namespace = process.argv[2];

if (!namespace) {
  console.error("❌ Missing namespace.\nUsage: npm run i18n:new <namespace>");
  process.exit(1);
}

const ROOT = path.join(__dirname, "..", "..", "..");
const LOCALES_DIR = path.join(ROOT, "src/i18n/locales/en");
const PARSER_CONFIG = path.join(ROOT, "i18next-parser.config.cjs");
const I18N_INDEX = path.join(ROOT, "src/i18n/index.ts");
const KEYS_FILE = path.join(ROOT, "src/i18n/keys.ts");
const CHECK_SCRIPT = path.join(ROOT, "scripts/i18n/check/index.cjs");

console.log(`\n🚀 Creating namespace: ${namespace}\n`);

const namespaceFile = path.join(LOCALES_DIR, `${namespace}.json`);
if (!fs.existsSync(namespaceFile)) {
  fs.writeFileSync(namespaceFile, "{}\n");
  console.log(`✓ Created ${namespaceFile}`);
} else {
  console.log(`⚠ File already exists: ${namespaceFile}`);
}

let parserConfig = fs.readFileSync(PARSER_CONFIG, "utf8");
if (!parserConfig.includes(`'${namespace}'`)) {
  parserConfig = parserConfig.replace(
    /ns:\s*\[(.*?)\]/s,
    (m, inner) => `ns: [${inner.trim()}, '${namespace}']`
  );
  fs.writeFileSync(PARSER_CONFIG, parserConfig);
  console.log("✓ Added to i18next-parser.config.cjs");
} else {
  console.log("⚠ Already exists in i18next-parser.config.cjs");
}

let indexTs = fs.readFileSync(I18N_INDEX, "utf8");

if (!indexTs.includes(`./locales/en/${namespace}.json`)) {
  indexTs = indexTs.replace(
    /import video_en from '\.\/locales\/en\/video\.json';/,
    (m) => `${m}\nimport ${namespace}_en from './locales/en/${namespace}.json';`
  );
}

if (!indexTs.includes(`${namespace}:`)) {
  indexTs = indexTs.replace(/en:\s*{\s*([\s\S]*?)\n\s*},/, (match, inner) => {
    return `en: {\n${inner}      ${namespace}: ${namespace}_en,\n    },`;
  });
}

if (!indexTs.includes(`'${namespace}'`)) {
  indexTs = indexTs.replace(
    /ns:\s*\[(.*?)\]/s,
    (m, inner) => `ns: [${inner.trim()}, '${namespace}']`
  );
}

fs.writeFileSync(I18N_INDEX, indexTs);
console.log("✓ Updated src/i18n/index.ts");

let keysTs = fs.readFileSync(KEYS_FILE, "utf8");

if (!keysTs.includes(`import ${namespace}`)) {
  keysTs = keysTs.replace(
    /import video from '\.\/locales\/en\/video\.json';/,
    `import video from './locales/en/video.json';
import ${namespace} from './locales/en/${namespace}.json';`
  );
}

if (!keysTs.includes(`type ${capitalize(namespace)}Flat`)) {
  keysTs = keysTs.replace(
    /type VideoFlat = FlatKeys<typeof video>;/,
    `type VideoFlat = FlatKeys<typeof video>;
type ${capitalize(namespace)}Flat = FlatKeys<typeof ${namespace}>;`
  );
}

if (!keysTs.includes(`export type ${capitalize(namespace)}Key`)) {
  keysTs = keysTs.replace(
    /export type VideoKey = `video:\${VideoFlat}`;/,
    `export type VideoKey = \`video:\${VideoFlat}\`;
export type ${capitalize(namespace)}Key = \`${namespace}:\${${capitalize(
      namespace
    )}Flat}\`;`
  );
}

const unionMatch = keysTs.match(/export type AnyI18nKey\s*=\s*([\s\S]*?);/);

if (unionMatch && !unionMatch[1].includes(`${capitalize(namespace)}Key`)) {
  keysTs = keysTs.replace(
    /(export type AnyI18nKey\s*=\s*)([\s\S]*?);/,
    (match, start, unionBlock) => {
      const cleaned = unionBlock.trim().replace(/\s+/g, " ");
      const parts = cleaned.split("|").map((s) => s.trim());
      const newKey = `${capitalize(namespace)}Key`;
      parts.push(newKey);
      return `${start}${parts.join(" | ")};`;
    }
  );
}

fs.writeFileSync(KEYS_FILE, keysTs);
console.log("✓ Updated keys.ts");

let checkScript = fs.readFileSync(CHECK_SCRIPT, "utf8");
if (!checkScript.includes(`'${namespace}'`)) {
  checkScript = checkScript.replace(
    /const NAMESPACES = \[(.*?)\];/s,
    (m, inner) => `const NAMESPACES = [${inner.trim()}, '${namespace}'];`
  );
  fs.writeFileSync(CHECK_SCRIPT, checkScript);
  console.log("✓ Updated i18n-check script");
} else {
  console.log("⚠ Already in i18n-check script");
}

console.log(`\n🎉 Namespace '${namespace}' added everywhere successfully!\n`);

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
