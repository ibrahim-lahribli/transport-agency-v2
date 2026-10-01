/**
 * Business configuration and (T) profile values.
 * Defined in /data/source/services-report.md Section 2.
 *
 * All values tagged (T) are required and read from environment variables.
 * In a production build, if any (T) value is still a placeholder or empty,
 * the build must fail.
 */

export interface BusinessProfile {
  legalName: string;
  ice: string;
  licence: string;
  insurance: string;
  whatsapp: string;
  email: string;
  address: string;
  tradingName?: string;
}

export const TIMEZONE = "Africa/Casablanca";
export const BASE_CURRENCY = "EUR";
export const INDICATIVE_CURRENCY = "MAD";

/**
 * Indicative exchange rate from config / env, never hard-coded in quote calculation.
 */
export const EUR_TO_MAD_RATE = Number(
  process.env.EUR_TO_MAD_RATE || process.env.NEXT_PUBLIC_EUR_TO_MAD_RATE || 10.8,
);

/**
 * Convert EUR amount to indicative MAD using config rate.
 */
export function convertEurToMad(eurAmount: number, rate: number = EUR_TO_MAD_RATE): number {
  return Math.round(eurAmount * rate);
}

/**
 * Check whether a string value is considered a placeholder or empty.
 */
export function isPlaceholder(val: string | undefined | null): boolean {
  if (!val || typeof val !== "string" || val.trim().length === 0) {
    return true;
  }
  const clean = val.trim().toLowerCase();
  return (
    clean === "(t)" ||
    clean.startsWith("(t)") ||
    clean.includes("placeholder") ||
    clean.includes("todo") ||
    clean.includes("to_provide") ||
    clean.includes("to-provide") ||
    clean === "unknown"
  );
}

/**
 * Validates business config environment variables.
 */
export function validateBusinessConfig(env: Record<string, string | undefined> = process.env): {
  valid: boolean;
  missingFields: string[];
} {
  const fields = [
    { key: "legalName", val: env.BUSINESS_LEGAL_NAME || env.NEXT_PUBLIC_BUSINESS_LEGAL_NAME },
    { key: "ice", val: env.BUSINESS_ICE || env.NEXT_PUBLIC_BUSINESS_ICE },
    { key: "licence", val: env.BUSINESS_LICENCE || env.NEXT_PUBLIC_BUSINESS_LICENCE },
    { key: "insurance", val: env.BUSINESS_INSURANCE || env.NEXT_PUBLIC_BUSINESS_INSURANCE },
    { key: "whatsapp", val: env.BUSINESS_WHATSAPP || env.NEXT_PUBLIC_BUSINESS_WHATSAPP },
    { key: "email", val: env.BUSINESS_EMAIL || env.NEXT_PUBLIC_BUSINESS_EMAIL },
    { key: "address", val: env.BUSINESS_ADDRESS || env.NEXT_PUBLIC_BUSINESS_ADDRESS },
  ];

  const missingFields = fields.filter((f) => isPlaceholder(f.val)).map((f) => f.key);

  return {
    valid: missingFields.length === 0,
    missingFields,
  };
}

/**
 * Ensure business configuration is valid for production.
 * Throws an explicit error if any (T) value is missing or a placeholder.
 */
export function enforceProductionBusinessConfig(
  env: Record<string, string | undefined> = process.env,
): void {
  const { valid, missingFields } = validateBusinessConfig(env);
  if (!valid) {
    throw new Error(
      `Production build failed: Business config (T) fields cannot be placeholders: ${missingFields.join(", ")}`,
    );
  }
}

// In production runtime / build (outside of Vitest test environment), enforce valid config
if (
  process.env.NODE_ENV === "production" &&
  !process.env.VITEST &&
  process.env.SKIP_ENV_VALIDATION !== "true"
) {
  enforceProductionBusinessConfig();
}

/**
 * Export current active business profile.
 */
export const businessProfile: BusinessProfile = {
  legalName:
    process.env.BUSINESS_LEGAL_NAME ||
    process.env.NEXT_PUBLIC_BUSINESS_LEGAL_NAME ||
    "Agadir Tourisme SARL",
  ice: process.env.BUSINESS_ICE || process.env.NEXT_PUBLIC_BUSINESS_ICE || "000000000000000",
  licence:
    process.env.BUSINESS_LICENCE || process.env.NEXT_PUBLIC_BUSINESS_LICENCE || "LIC-2026-SOUSS",
  insurance:
    process.env.BUSINESS_INSURANCE ||
    process.env.NEXT_PUBLIC_BUSINESS_INSURANCE ||
    "RC Pro Tourisme Assurance",
  whatsapp:
    process.env.BUSINESS_WHATSAPP ||
    process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP ||
    "+212 600 000 000",
  email:
    process.env.BUSINESS_EMAIL ||
    process.env.NEXT_PUBLIC_BUSINESS_EMAIL ||
    "contact@agence-agadir.example.com",
  address:
    process.env.BUSINESS_ADDRESS ||
    process.env.NEXT_PUBLIC_BUSINESS_ADDRESS ||
    "Boulevard Mohammed V, Agadir, Maroc",
  tradingName: process.env.BUSINESS_TRADING_NAME || process.env.NEXT_PUBLIC_BUSINESS_TRADING_NAME,
};
