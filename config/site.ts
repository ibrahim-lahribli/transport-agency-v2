import { defaultLocale, locales } from "../src/i18n/locales";
import { EUR_TO_MAD_RATE } from "../src/pricing/rate";
import { getBusinessProfile } from "./business";

/**
 * Absolute site origin. Used for canonical URLs, Open Graph metadata and the
 * sitemap. Trailing slashes are stripped so paths concatenate cleanly.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
  /\/+$/,
  "",
);

export const SITE_NAME = "Agadir Tourisme";

export { defaultLocale, locales };

/** Affiliate/social profiles used as `sameAs` signals. Extend once real. */
export const SOCIAL_PROFILES: string[] = [];

/** EUR→MAD conversion rate for indicative display only. Never a stored price. */
export { EUR_TO_MAD_RATE };

/** Business contact helpers derived from the validated profile. */
export function getContact() {
  const profile = getBusinessProfile();
  return {
    ...profile,
    /** Dial string with digits only, for `wa.me` / `tel:` links. */
    whatsappDigits: profile.whatsapp.replace(/[^0-9]/g, ""),
  };
}
