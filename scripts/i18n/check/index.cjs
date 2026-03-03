const collectDefinedKeys = require("./definedKeys.cjs");
const collectExtractedKeys = require("./extractedKeys.cjs");
const collectSourceData = require("./sourceKeys.cjs");
const report = require("./reporter.cjs");
const { NAMESPACES } = require("./config.cjs");

function main() {
  const definedByNs = collectDefinedKeys();
  const extractedByNs = collectExtractedKeys();
  const { literalKeys, dynamicKeys } = collectSourceData();

  let hasErrors = false;

  for (const ns of NAMESPACES) {
    const defined = definedByNs.get(ns);
    const extracted = extractedByNs.get(ns);

    const used = new Set([...extracted]);

    literalKeys.forEach((k) => {
      if (k.startsWith(ns + ":")) used.add(k);
    });

    dynamicKeys.forEach((k) => {
      if (k.startsWith(ns + ":")) used.add(k);
    });

    const unusedCount = defined.size - used.size;
    if (unusedCount > 0) hasErrors = true;

    report(ns, defined, used);
  }

  if (!hasErrors) {
    console.log("\n✔ i18n check passed");
  }

  if (hasErrors) {
    process.exit(1);
  }
}

main();
