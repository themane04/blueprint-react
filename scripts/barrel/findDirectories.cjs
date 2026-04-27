"use strict";

const fs = require("fs");
const path = require("path");
const { SKIP_DIRS, IGNORE_PATHS } = require("./config.cjs");

const SRC_ROOT = path.resolve(__dirname, "../../src");

/**
 * Recursively collects all directories under the given root
 * that contain at least one .ts or .tsx file and are not in IGNORE_PATHS.
 *
 * @param {string} root - Absolute path to start walking from.
 * @returns {string[]} Absolute paths of qualifying directories.
 */
function findDirectories(root) {
  const result = [];
  walk(root, result);
  return result;
}

function walk(dir, result) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }

  const hasSourceFile = entries.some(
    (e) =>
      e.isFile() &&
      (e.name.endsWith(".ts") || e.name.endsWith(".tsx")) &&
      e.name !== "index.ts"
  );

  if (hasSourceFile) {
    const relDir = path.relative(SRC_ROOT, dir).replace(/\\/g, "/");
    if (!IGNORE_PATHS.has(relDir)) {
      result.push(dir);
    }
  }

  for (const entry of entries) {
    if (entry.isDirectory() && !SKIP_DIRS.has(entry.name)) {
      walk(path.join(dir, entry.name), result);
    }
  }
}

module.exports = { findDirectories };
