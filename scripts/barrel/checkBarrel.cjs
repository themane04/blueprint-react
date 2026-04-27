"use strict";

const fs = require("fs");
const path = require("path");

/**
 * @typedef {Object} BarrelResult
 * @property {string} dir - The directory path relative to src/.
 * @property {"ok"|"missing_index"|"missing_exports"} status
 * @property {string[]} missing - File names that are not exported from index.ts.
 */

/**
 * Checks whether a directory's index.ts exports all .ts/.tsx files in it.
 *
 * @param {string} dir - Absolute path to the directory.
 * @returns {BarrelResult}
 */
function checkBarrel(dir) {
  const SRC_ROOT = path.resolve(__dirname, "../../src");
  const relDir = path.relative(SRC_ROOT, dir);

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  // Collect all exportable source files (not index.ts itself)
  const sourceFiles = entries
    .filter(
      (e) =>
        e.isFile() &&
        (e.name.endsWith(".ts") || e.name.endsWith(".tsx")) &&
        e.name !== "index.ts"
    )
    .map((e) => e.name);

  // No index.ts at all
  const indexPath = path.join(dir, "index.ts");
  if (!fs.existsSync(indexPath)) {
    return { dir: relDir, status: "missing_index", missing: sourceFiles };
  }

  const indexContent = fs.readFileSync(indexPath, "utf8");

  // Check which files are not referenced anywhere in index.ts
  const missing = sourceFiles.filter((file) => {
    const baseName = file.replace(/\.tsx?$/, "");
    // Accept both: export ... from "./Foo" and export ... from "./Foo.tsx"
    return (
      !indexContent.includes(`"./${baseName}"`) &&
      !indexContent.includes(`'./${baseName}'`) &&
      !indexContent.includes(`"./${file}"`) &&
      !indexContent.includes(`'./${file}'`)
    );
  });

  return {
    dir: relDir,
    status: missing.length === 0 ? "ok" : "missing_exports",
    missing,
  };
}

module.exports = { checkBarrel };
