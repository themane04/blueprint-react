const fs = require("fs");
const path = require("path");
const { SRC_DIR, VALIDATOR_FIELDS } = require("./config.cjs");

function walk(dir, cb) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) walk(full, cb);
    else if (full.endsWith(".ts") || full.endsWith(".tsx")) cb(full);
  }
}

module.exports = function collectSourceData() {
  const literalKeys = new Set();
  const dynamicKeys = new Set();

  const literalRgx = /['"`]([a-z]+:[A-Za-z0-9_.]+)['"`]/g;
  const dynamicRgx =
    /(['"`])(.*?:[A-Za-z0-9_.]+)\.\$\{([A-Za-z0-9_]+)\}(\.[A-Za-z0-9_]+)\1/g;

  walk(SRC_DIR, (file) => {
    const src = fs.readFileSync(file, "utf8");

    let m;
    while ((m = literalRgx.exec(src)) !== null) literalKeys.add(m[1]);

    while ((m = dynamicRgx.exec(src)) !== null) {
      const namespacePath = m[2];
      const suffix = m[4];

      const [ns, base] = namespacePath.split(":");

      for (const field of VALIDATOR_FIELDS) {
        dynamicKeys.add(`${ns}:${base}.${field}${suffix}`);
      }
    }
  });

  return { literalKeys, dynamicKeys };
};
