import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { DESIGN_TOKENS, contrastRatio, tokenHex } from "./design-tokens";

/** The exact `:root` block of src/app/globals.css, as shipped. */
const ROOT_BLOCK = readFileSync(
  join(process.cwd(), "src", "app", "globals.css"),
  "utf8",
).match(/:root \{[\s\S]*?\n\}/)![0];

describe("design-tokens mirror", () => {
  it("covers every CSS color custom property declared in :root", () => {
    const declared = [...ROOT_BLOCK.matchAll(/--([a-z-]+):\s(#[0-9a-f]{6})/g)].map(
      (m) => m[1],
    );
    const mirrored = DESIGN_TOKENS.map((c) => c.token);
    expect(mirrored).toEqual(declared);
  });

  it.each(DESIGN_TOKENS.map((c) => [c.token, c.hex] as const))(
    "pins %s to the value in globals.css",
    (token, hex) => {
      expect(ROOT_BLOCK).toContain(`--${token}: ${hex}`);
      expect(tokenHex(token)).toBe(hex);
    },
  );
});

describe("contrastRatio", () => {
  it("matches the WCAG worked example (white on #767676 ≈ 4.54)", () => {
    expect(contrastRatio("#ffffff", "#767676")).toBe(4.54);
  });

  it("is symmetric and bounded to [1, 21]", () => {
    for (const a of DESIGN_TOKENS) {
      for (const b of DESIGN_TOKENS) {
        const ratio = contrastRatio(a.hex, b.hex);
        expect(ratio).toBeGreaterThanOrEqual(1);
        expect(ratio).toBeLessThanOrEqual(21);
        expect(ratio).toBe(contrastRatio(b.hex, a.hex));
      }
    }
  });

  it("keeps the pairs actually used on chrome and buttons accessible", () => {
    // Footer cream-on-ink body copy (AGENTS.md: ≥ 7:1).
    expect(contrastRatio("#f7f2e8", "#1d2823")).toBeGreaterThanOrEqual(7);
    // accent button: white on terracotta (≥ 4.5:1 for normal text).
    expect(contrastRatio("#ffffff", "#ad482f")).toBeGreaterThanOrEqual(4.5);
    // Eyebrows: accent-strong on canvas (≥ 4.5:1).
    expect(contrastRatio("#873520", "#f7f2e8")).toBeGreaterThanOrEqual(4.5);
  });

  it("rejects malformed hex", () => {
    expect(() => contrastRatio("#12345", "#ffffff")).toThrow(/Invalid hex/);
    expect(() => tokenHex("~missing~")).toThrow(/Unknown design token/);
  });
});
