"use strict";

const RESET  = "\x1b[0m";
const GREEN  = "\x1b[32m";
const RED    = "\x1b[31m";
const YELLOW = "\x1b[33m";
const BOLD   = "\x1b[1m";
const DIM    = "\x1b[2m";

/**
 * Prints a summary of barrel check results and exits with code 1 if any
 * directory has a missing index.ts or unexported files.
 *
 * @param {import("./checkBarrel.cjs").BarrelResult[]} results
 */
function reporter(results) {
  const ok             = results.filter((r) => r.status === "ok");
  const missingIndex   = results.filter((r) => r.status === "missing_index");
  const missingExports = results.filter((r) => r.status === "missing_exports");

  const hasIssues = missingIndex.length > 0 || missingExports.length > 0;

  console.log("");
  console.log(`${BOLD}Barrel export check${RESET}`);
  console.log(`${DIM}Checking index.ts files across src/...${RESET}`);
  console.log("");

  // ── Missing index.ts ──────────────────────────────────────────────────────
  if (missingIndex.length > 0) {
    console.log(`${RED}${BOLD}✖ Missing index.ts (${missingIndex.length})${RESET}`);
    for (const r of missingIndex) {
      console.log(`  ${RED}✖${RESET}  ${r.dir}/`);
      for (const f of r.missing) {
        console.log(`       ${DIM}${f}${RESET}`);
      }
    }
    console.log("");
  }

  // ── Unexported files ──────────────────────────────────────────────────────
  if (missingExports.length > 0) {
    console.log(`${YELLOW}${BOLD}⚠ Unexported files (${missingExports.length} directories)${RESET}`);
    for (const r of missingExports) {
      console.log(`  ${YELLOW}⚠${RESET}  ${r.dir}/`);
      for (const f of r.missing) {
        console.log(`       ${DIM}${f}${RESET}`);
      }
    }
    console.log("");
  }

  // ── Summary ───────────────────────────────────────────────────────────────
  if (!hasIssues) {
    console.log(`${GREEN}${BOLD}✔ All barrels are complete (${ok.length} directories checked)${RESET}`);
    console.log("");
  } else {
    console.log(
      `${DIM}${ok.length} ok · ${missingIndex.length} missing index · ${missingExports.length} incomplete${RESET}`
    );
    console.log("");
    process.exit(1);
  }
}

module.exports = { reporter };
