const path = require("path");

const createNamespaceFile = require("./createNamespaceFile.cjs");
const updateIndex = require("./updateIndex.cjs");
const updateKeys = require("./updateKeys.cjs");

const namespace = process.argv[2];

if (!namespace) {
  console.error("❌ Missing namespace.\nUsage: npm run i18n:new <namespace>");
  process.exit(1);
}

const ROOT = path.join(__dirname, "..", "..", "..");

console.log(`\n🚀 Creating namespace: ${namespace}\n`);

createNamespaceFile(ROOT, namespace);
updateIndex(ROOT, namespace);
updateKeys(ROOT, namespace);

console.log(`\n🎉 Namespace '${namespace}' added successfully!\n`);
