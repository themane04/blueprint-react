const path = require("path");
const readJson = require("./readJson.cjs");
const flatten = require("./flatten.cjs");
const { LOCALES_DIR, NAMESPACES } = require("./config.cjs");

module.exports = function collectDefinedKeys() {
  const out = new Map();

  for (const ns of NAMESPACES) {
    const file = path.join(LOCALES_DIR, `${ns}.json`);
    const flat = flatten(readJson(file));
    const keys = new Set(Object.keys(flat).map((k) => `${ns}:${k}`));
    out.set(ns, keys);
  }

  return out;
};
