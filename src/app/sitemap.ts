import type { MetadataRoute } from "next";
import { getServices, HUB_KEYS } from "@/seo/content";
import { SITE_URL } from "@/seo/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  const alternates = (en: string, fr: string) => ({
    languages: { en, fr, "x-default": en },
  });

  // 1. Home Pages (EN & FR)
  const homeEn = `${SITE_URL}/en`;
  const homeFr = `${SITE_URL}/fr`;
  entries.push({
    url: homeEn,
    lastModified,
    changeFrequency: "weekly",
    priority: 1.0,
    alternates: alternates(homeEn, homeFr),
  });
  entries.push({
    url: homeFr,
    lastModified,
    changeFrequency: "weekly",
    priority: 1.0,
    alternates: alternates(homeEn, homeFr),
  });

  // 2. Hub Pages (Excursions, Activities, Transfers for EN & FR)
  for (const hub of HUB_KEYS) {
    const hubEn = `${SITE_URL}/en/${hub}`;
    const hubFr = `${SITE_URL}/fr/${hub}`;
    entries.push({
      url: hubEn,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: alternates(hubEn, hubFr),
    });
    entries.push({
      url: hubFr,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: alternates(hubEn, hubFr),
    });
  }

  // 3. Product Pages (published services x 2 locales), paired by service id.
  const enServices = getServices("en");
  const frById = new Map(getServices("fr").map((s) => [s.id, s]));

  for (const enService of enServices) {
    const frService = frById.get(enService.id);
    const enUrl = `${SITE_URL}/en/${enService.slug}`;
    const frUrl = `${SITE_URL}/fr/${frService ? frService.slug : enService.slug}`;

    entries.push({
      url: enUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: alternates(enUrl, frUrl),
    });
    entries.push({
      url: frUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: alternates(enUrl, frUrl),
    });
  }

  return entries;
}
