const fs = require("fs");
const path = require("path");
const readJson = require("./readJson.cjs");
const flatten = require("./flatten.cjs");
const { EXTRACTED_DIR } = require("./config.cjs");

module.exports = function collectExtractedKeys() {
  const out = new Map();

  if (!fs.existsSync(EXTRACTED_DIR)) {
    return out;
  }

  const files = fs.readdirSync(EXTRACTED_DIR).filter((f) => f.endsWith(".json"));

  for (const fileName of files) {
    const ns = path.basename(fileName, ".json");
    const file = path.join(EXTRACTED_DIR, fileName);

    const flat = flatten(readJson(file));
    const keys = new Set(Object.keys(flat).map((k) => `${ns}:${k}`));

    out.set(ns, keys);
  }

  return out;
};
