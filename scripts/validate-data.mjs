#!/usr/bin/env node
/**
 * Content rules gate. Imports the TypeScript validation module directly using
 * Node's type stripping plus a small `@/` resolve hook — no build step.
 *
 * Exits non-zero when any rule fails, so CI stops a bad catalogue.
 */
import { register } from "node:module";

register("./loader.mjs", import.meta.url);

const { runValidation } = await import("../src/validation/validate-content.ts");
const problems = runValidation();

if (problems.length > 0) {
  console.error(`Content validation failed with ${problems.length} problem(s):\n`);
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

console.log("Content validation passed.");
