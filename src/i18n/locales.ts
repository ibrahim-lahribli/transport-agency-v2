/** Locales shipped today. Arabic is wired for RTL but has no copy yet. */
export const locales = ["en", "fr"] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "en";

/** Type guard used by layouts and pages instead of `locale as any`. */
export function isAppLocale(value: unknown): value is AppLocale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/**
 * Right-to-left locales. The layout sets `dir` from this; the CSS is written
 * with logical properties throughout, so an `ar` locale mainly needs copy,
 * a font, and this list extended.
 */
export function isRtlLocale(locale: string): boolean {
  return locale === "ar";
}
