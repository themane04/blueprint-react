"use strict";

/**
 * Directories whose index.ts serves a different purpose than re-exporting
 * siblings — these are skipped entirely by the barrel check.
 */
const SKIP_DIRS = new Set([
  "node_modules",
  "dist",
  ".idea",
  "scripts",
  "public",
  "locales",
  "states",
  "environment"
]);

/**
 * Specific src-relative directory paths where the index.ts intentionally
 * does NOT re-export all siblings (e.g. type augmentation files, key registries).
 * Paths use forward slashes and are relative to src/.
 */
const IGNORE_PATHS = new Set([
  "i18n", // keys.ts and types.d.ts are not re-exported — used directly
  "router", // types.ts is internal to the router, not part of public API
  "theme", // types.ts contains Chakra augmentations, not re-exported
  "types" // chakra-icon.d.ts is a global declaration file
]);

module.exports = { SKIP_DIRS, IGNORE_PATHS };
