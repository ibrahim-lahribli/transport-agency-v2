#!/usr/bin/env node
/**
 * validate:data — content validation entry point.
 *
 * Validates catalogue content against:
 * 1. Duplicate slugs
 * 2. Missing FR fields
 * 3. SEO title > 60 chars or description > 160 chars
 * 4. Primary keyword missing from the SEO title
 * 5. Unknown policy/host/private-rate key
 * 6. Any price without a unit
 * 7. Word "Sahara" anywhere in copy
 */

import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

async function main() {
  const customDir = process.argv[2] || process.env.CONTENT_DIR;
  const contentDir = customDir
    ? path.resolve(process.cwd(), customDir)
    : path.join(rootDir, "content");

  console.log(`[validate:data] Checking catalogue content in: ${contentDir}`);

  // Dynamic import of validator
  const { validateContent } = await import("../src/validation/validate-content.ts");

  const result = await validateContent({ contentDir });

  if (result.valid) {
    console.log(
      `✓ [validate:data] PASSED: All services in EN and FR are valid according to catalogue schemas and business report rules.`,
    );
    process.exit(0);
  } else {
    console.error(`✗ [validate:data] FAILED: Found ${result.errors.length} validation errors:`);
    for (const err of result.errors) {
      console.error(`  - ${err}`);
    }
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(`[validate:data] Unexpected fatal error:`, err);
  process.exit(1);
});
