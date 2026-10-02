import type { Metadata } from "next";

import { SITE_NAME, SITE_URL } from "../../config/site";

export { SITE_URL };

export function createCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

export interface BuildMetadataOptions {
  title: string;
  description: string;
  locale: string;
  pathname: string;
  enPath: string;
  frPath: string;
  noindex?: boolean;
}

/**
 * The only metadata builder. Derives the canonical, the reciprocal hreflang set
 * (`en`, `fr`, `x-default`), Open Graph and Twitter tags so pages stay
 * consistent and no page can ship a mismatched alternate.
 */
export function buildPageMetadata(opts: BuildMetadataOptions): Metadata {
  const canonical = createCanonicalUrl(opts.pathname);
  const enUrl = createCanonicalUrl(opts.enPath);
  const frUrl = createCanonicalUrl(opts.frPath);
  const xDefaultUrl = createCanonicalUrl(opts.enPath);

  const ogLocale = opts.locale === "fr" ? "fr_FR" : "en_US";
  const ogAlternateLocale = opts.locale === "fr" ? ["en_US"] : ["fr_FR"];

  return {
    title: opts.title,
    description: opts.description,
    alternates: {
      canonical,
      languages: {
        en: enUrl,
        fr: frUrl,
        "x-default": xDefaultUrl,
      },
    },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: canonical,
      siteName: SITE_NAME,
      locale: ogLocale,
      alternateLocale: ogAlternateLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
    ...(opts.noindex
      ? {
          robots: {
            index: false,
            follow: false,
            googleBot: { index: false, follow: false },
          },
        }
      : {}),
  };
}
