const fs = require("fs");
const path = require("path");
const readJson = require("./readJson.cjs");
const flatten = require("./flatten.cjs");
const { EXTRACTED_DIR, NAMESPACES } = require("./config.cjs");

module.exports = function collectExtractedKeys() {
  const out = new Map();

  for (const ns of NAMESPACES) {
    const file = path.join(EXTRACTED_DIR, `${ns}.json`);
    if (!fs.existsSync(file)) {
      out.set(ns, new Set());
      continue;
    }
    const flat = flatten(readJson(file));
    const keys = new Set(Object.keys(flat).map((k) => `${ns}:${k}`));
    out.set(ns, keys);
  }

  return out;
};
