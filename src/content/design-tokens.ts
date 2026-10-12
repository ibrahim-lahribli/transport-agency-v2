/**
 * Design tokens for the agency-design-v2 identity, mirrored from
 * `src/app/globals.css` `:root`. Part of Sprint 10, Task 13
 * (specs/2026-10-11-design-reskin-sprints.md): the design-system reference
 * page needs hex values and computed WCAG contrast ratios for its swatch
 * grid, so they live in typed, unit-testable code instead of hard-coding on
 * the page.
 *
 * `colors` is intentionally explicit (not parsed from CSS): a mirror that a
 * test pins to `globals.css` line-by-line, so a token change that forgets to
 * update this file is caught in unit tests rather than silently drifting on
 * the reference page.
 */

export interface DesignColor {
  /** CSS custom property name in `:root`, sans `--`. */
  token: string;
  /** Lowercase 6-digit hex, matching `globals.css`. */
  hex: string;
}

/** Token order follows `:root` in `globals.css`. */
export const DESIGN_TOKENS: DesignColor[] = [
  { token: "canvas", hex: "#f7f2e8" },
  { token: "surface", hex: "#fffdf8" },
  { token: "surface-muted", hex: "#ece2d1" },
  { token: "ink", hex: "#1d2823" },
  { token: "ink-muted", hex: "#5e655f" },
  { token: "line", hex: "#bbb4a7" },
  { token: "accent", hex: "#ad482f" },
  { token: "accent-strong", hex: "#873520" },
  { token: "on-accent", hex: "#ffffff" },
  { token: "olive", hex: "#4f5d45" },
  { token: "error", hex: "#a83232" },
];

function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace(/^#/, "");
  // The mirror only ever carries 6-digit lowercase hex (pinned by test).
  if (!/^[0-9a-f]{6}$/.test(value)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ];
}

/** WCAG 2.x relative luminance of an sRGB color, from raw channel values. */
function relativeLuminance([r, g, b]: [number, number, number]): number {
  const channel = (raw: number): number => {
    const c = raw / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/**
 * WCAG 2.x contrast ratio (1–21, rounded to 2 decimals) between two hex
 * colors, exactly as the axe/quick evaluators compute it.
 */
export function contrastRatio(hexA: string, hexB: string): number {
  const la = relativeLuminance(hexToRgb(hexA));
  const lb = relativeLuminance(hexToRgb(hexB));
  const ratio = (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  return Math.round(ratio * 100) / 100;
}

/** Color by token name; TypeScript narrows to the declared set. */
export function tokenHex(token: string): string {
  const found = DESIGN_TOKENS.find((c) => c.token === token);
  if (!found) {
    throw new Error(`Unknown design token: ${token}`);
  }
  return found.hex;
}
