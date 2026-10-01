import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { validateContent } from "./validate-content.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../..");

describe("Content Validator: validateContent()", () => {
  it("passes validation on real catalogue data (/content)", async () => {
    const result = await validateContent({
      contentDir: path.join(rootDir, "content"),
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("fails validation on deliberately broken fixture with all required error conditions", async () => {
    const fixtureDir = path.join(rootDir, "tests/fixtures/broken-content");
    const result = await validateContent({
      contentDir: fixtureDir,
    });

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);

    const errorText = result.errors.join("\n");

    // 1. Duplicate slug
    expect(errorText).toContain("Duplicate EN slug found");
    expect(errorText).toContain("duplicate-slug");

    // 2. Missing FR fields
    expect(errorText).toContain("Missing FR field 'summary'");
    expect(errorText).toContain("Missing corresponding FR service");

    // 3. SEO title > 60 chars or description > 160 chars
    expect(errorText).toContain("SEO title exceeds 60 characters");
    expect(errorText).toContain("SEO description exceeds 160 characters");

    // 4. Primary keyword missing from SEO title
    expect(errorText).toContain(
      "Primary keyword 'unmatched keyword not in title' missing from SEO title",
    );

    // 5. Unknown policy/host/private-rate key
    expect(errorText).toContain("Unknown cancellation policy: 'invalid-policy'");
    expect(errorText).toContain("Unknown host: 'unknown-host'");
    expect(errorText).toContain("Unknown private-rate key: 'invalid-private-rate'");

    // 6. Any price without a unit
    expect(errorText).toContain("Price option 'Adult' has no unit");

    // 7. Forbidden word "Sahara" in copy
    expect(errorText).toContain("Forbidden word 'Sahara' found in title");
    expect(errorText).toContain("Forbidden word 'Sahara' found in summary");
  });
});
