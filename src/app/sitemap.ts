import type { MetadataRoute } from "next";
import { services as enServices } from "../../content/en/index";
import { servicesById as frServicesById } from "../../content/fr/index";
import { SITE_URL } from "@/seo/metadata";
import { HUB_KEYS } from "@/seo/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // 1. Home Pages (EN & FR)
  const homeEn = `${SITE_URL}/en`;
  const homeFr = `${SITE_URL}/fr`;

  entries.push({
    url: homeEn,
    lastModified,
    changeFrequency: "weekly",
    priority: 1.0,
    alternates: {
      languages: {
        en: homeEn,
        fr: homeFr,
        "x-default": homeEn,
      },
    },
  });

  entries.push({
    url: homeFr,
    lastModified,
    changeFrequency: "weekly",
    priority: 1.0,
    alternates: {
      languages: {
        en: homeEn,
        fr: homeFr,
        "x-default": homeEn,
      },
    },
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
      alternates: {
        languages: {
          en: hubEn,
          fr: hubFr,
          "x-default": hubEn,
        },
      },
    });

    entries.push({
      url: hubFr,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: hubEn,
          fr: hubFr,
          "x-default": hubEn,
        },
      },
    });
  }

  // 3. Product Pages (15 services x 2 locales)
  for (const enService of enServices) {
    const frService = frServicesById[enService.id];
    const enUrl = `${SITE_URL}/en/${enService.slug}`;
    const frUrl = `${SITE_URL}/fr/${frService ? frService.slug : enService.slug}`;

    // EN product entry
    entries.push({
      url: enUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          en: enUrl,
          fr: frUrl,
          "x-default": enUrl,
        },
      },
    });

    // FR product entry
    entries.push({
      url: frUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          en: enUrl,
          fr: frUrl,
          "x-default": enUrl,
        },
      },
    });
  }

  return entries;
}
