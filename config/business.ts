import { z } from "zod";

/**
 * The agency's legal and contact profile. These values cannot be invented, so
 * they come from the environment (see `.env.example`) and production builds
 * refuse to start while any of them is missing or still a placeholder.
 */
export interface BusinessProfile {
  legalName: string;
  tradingName: string;
  ice: string;
  licence: string;
  insurance: string;
  whatsapp: string;
  email: string;
  address: string;
}

/** Values shipped in `.env.example` that must never reach production. */
const KNOWN_PLACEHOLDERS = new Set([
  "Agadir Tourisme SARL",
  "Agadir Tourisme",
  "002938475000082",
  "LIC-2026-SOUSS-AGD",
  "RC Pro Tourisme Assurance - Police 987654",
  "+212600123456",
  "contact@agadirtourisme.ma",
  "Avenue Mohammed V, 80000 Agadir, Maroc",
]);

const PLACEHOLDER_PATTERN = /^(tbd|todo|changeme|change me|placeholder|example|n\/?a|xxx+)$/i;

export function isPlaceholder(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed === "") return true;
  if (PLACEHOLDER_PATTERN.test(trimmed)) return true;
  return KNOWN_PLACEHOLDERS.has(trimmed);
}

const BusinessSchema = z.object({
  legalName: z.string().min(1, "BUSINESS_LEGAL_NAME is required"),
  tradingName: z.string().min(1, "BUSINESS_TRADING_NAME is required"),
  ice: z.string().min(1, "BUSINESS_ICE is required"),
  licence: z.string().min(1, "BUSINESS_LICENCE is required"),
  insurance: z.string().min(1, "BUSINESS_INSURANCE is required"),
  whatsapp: z
    .string()
    .regex(/^\+?[0-9\s().-]{6,}$/, "BUSINESS_WHATSAPP must be a dialable number"),
  email: z.string().email("BUSINESS_EMAIL must be a valid email"),
  address: z.string().min(1, "BUSINESS_ADDRESS is required"),
});

function readEnv(): BusinessProfile {
  return {
    legalName: process.env.BUSINESS_LEGAL_NAME ?? "",
    tradingName: process.env.BUSINESS_TRADING_NAME ?? "",
    ice: process.env.BUSINESS_ICE ?? "",
    licence: process.env.BUSINESS_LICENCE ?? "",
    insurance: process.env.BUSINESS_INSURANCE ?? "",
    whatsapp: process.env.BUSINESS_WHATSAPP ?? "",
    email: process.env.BUSINESS_EMAIL ?? "",
    address: process.env.BUSINESS_ADDRESS ?? "",
  };
}

let cached: BusinessProfile | null = null;

/**
 * Read and validate the business profile. Throws with a readable message when
 * anything is missing or invalid, so a broken profile fails loudly rather than
 * rendering empty contact details.
 */
export function getBusinessProfile(): BusinessProfile {
  if (cached) return cached;
  const result = BusinessSchema.safeParse(readEnv());
  if (!result.success) {
    const details = result.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`);
    throw new Error(`Invalid business configuration:\n${details.join("\n")}`);
  }
  cached = result.data;
  return cached;
}

/**
 * Called from `next.config.ts` in production builds. Fails the build when any
 * required value is absent or still the placeholder shipped in `.env.example`.
 */
export function enforceProductionBusinessConfig(): void {
  const profile = readEnv();
  const placeholders = Object.entries(profile)
    .filter(([, value]) => isPlaceholder(value))
    .map(([key]) => key);

  if (placeholders.length > 0) {
    throw new Error(
      `Production build blocked: the business profile still holds placeholder or empty values: ${placeholders.join(
        ", ",
      )}. Set the real values in the environment.`,
    );
  }

  getBusinessProfile();
  console.log("[business] production business configuration validated");
}
