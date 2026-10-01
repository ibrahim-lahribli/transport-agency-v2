import type { Metadata } from "next";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

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
      siteName: "Agadir Tourisme",
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
            googleBot: {
              index: false,
              follow: false,
            },
          },
        }
      : {}),
  };
}
