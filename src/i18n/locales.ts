export const LOCALES = ["en", "fr"] as const;
export type AppLocale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: AppLocale = "en";

/**
 * Narrow an arbitrary string to a supported locale. Used by layouts and pages
 * instead of `locale as any`, which the lint config rejects.
 */
export function isAppLocale(locale: string): locale is AppLocale {
  return (LOCALES as readonly string[]).includes(locale);
}

export function isRtlLocale(locale: string): boolean {
  return locale === "ar";
}
