import type { MetadataRoute } from "next";

import { HUB_KEYS, getServices } from "@/catalogue";
import { guides } from "@/content/guides";
import { places } from "@/content/places";
import { SITE_URL } from "@/seo/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  const alternates = (en: string, fr: string) => ({
    languages: { en, fr, "x-default": en },
  });

  // Home.
  const homeEn = `${SITE_URL}/en`;
  const homeFr = `${SITE_URL}/fr`;
  entries.push({
    url: homeEn,
    changeFrequency: "weekly",
    priority: 1,
    alternates: alternates(homeEn, homeFr),
  });
  entries.push({
    url: homeFr,
    changeFrequency: "weekly",
    priority: 1,
    alternates: alternates(homeEn, homeFr),
  });

  // Hubs (slugs are identical across locales).
  for (const hub of HUB_KEYS) {
    const hubEn = `${SITE_URL}/en/${hub}`;
    const hubFr = `${SITE_URL}/fr/${hub}`;
    entries.push({
      url: hubEn,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: alternates(hubEn, hubFr),
    });
    entries.push({
      url: hubFr,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: alternates(hubEn, hubFr),
    });
  }

  // Place hubs (long-tail landing pages), slugs localized per place.
  const placesEn = `${SITE_URL}/en/places`;
  const placesFr = `${SITE_URL}/fr/places`;
  entries.push({
    url: placesEn,
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: alternates(placesEn, placesFr),
  });
  entries.push({
    url: placesFr,
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: alternates(placesEn, placesFr),
  });
  for (const place of places) {
    const placeEn = `${SITE_URL}/en/places/${place.slug.en}`;
    const placeFr = `${SITE_URL}/fr/places/${place.slug.fr}`;
    entries.push({
      url: placeEn,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: alternates(placeEn, placeFr),
    });
    entries.push({
      url: placeFr,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: alternates(placeEn, placeFr),
    });
  }

  // Editorial guides. The guide's own ISO `date` is the only real content date
  // available, so it is the only URL class that carries `lastModified`; every
  // other page omits it rather than claim the whole site changed on each build.
  const guidesEn = `${SITE_URL}/en/guides`;
  const guidesFr = `${SITE_URL}/fr/guides`;
  entries.push({
    url: guidesEn,
    changeFrequency: "weekly",
    priority: 0.7,
    alternates: alternates(guidesEn, guidesFr),
  });
  entries.push({
    url: guidesFr,
    changeFrequency: "weekly",
    priority: 0.7,
    alternates: alternates(guidesEn, guidesFr),
  });
  for (const guide of guides) {
    const guideEn = `${SITE_URL}/en/guides/${guide.slug.en}`;
    const guideFr = `${SITE_URL}/fr/guides/${guide.slug.fr}`;
    entries.push({
      url: guideEn,
      lastModified: new Date(guide.date),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: alternates(guideEn, guideFr),
    });
    entries.push({
      url: guideFr,
      lastModified: new Date(guide.date),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: alternates(guideEn, guideFr),
    });
  }

  // Product pages (published services x 2 locales), paired by service id.
  const enServices = getServices("en");
  const frById = new Map(getServices("fr").map((s) => [s.id, s]));

  for (const enService of enServices) {
    const frService = frById.get(enService.id);
    const enUrl = `${SITE_URL}/en/${enService.slug}`;
    const frUrl = `${SITE_URL}/fr/${frService ? frService.slug : enService.slug}`;

    entries.push({
      url: enUrl,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: alternates(enUrl, frUrl),
    });
    entries.push({
      url: frUrl,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: alternates(enUrl, frUrl),
    });
  }

  return entries;
}
