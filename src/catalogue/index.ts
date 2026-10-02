import type { Service } from "@/schemas/service";

import {
  services as enServices,
  servicesById as enServicesById,
} from "../../content/en/index";
import {
  services as frServices,
  servicesById as frServicesById,
} from "../../content/fr/index";

export type HubKey = "excursions" | "activities" | "transfers";

export const HUB_KEYS: readonly HubKey[] = ["excursions", "activities", "transfers"];

/**
 * Publish gate: only services explicitly marked `published` are ever exposed to
 * pages, metadata, the sitemap or internal links. Drafts and archived content
 * are filtered out here, at the single entry point for catalogue reads.
 */
function isPublished(service: Service): boolean {
  return service.status === "published";
}

function byOrder(a: Service, b: Service): number {
  return a.order - b.order;
}

function sourceFor(locale: string): {
  all: Service[];
  byId: Record<string, Service>;
} {
  return locale === "fr"
    ? { all: frServices, byId: frServicesById }
    : { all: enServices, byId: enServicesById };
}

export function getServices(locale: string): Service[] {
  return sourceFor(locale).all.filter(isPublished).sort(byOrder);
}

export function getServiceById(id: string, locale: string): Service | undefined {
  const service = sourceFor(locale).byId[id];
  return service && isPublished(service) ? service : undefined;
}

export function getServiceBySlug(slug: string, locale: string): Service | undefined {
  return getServices(locale).find((s) => s.slug === slug);
}

export function findServiceByAnySlug(
  slug: string,
): { service: Service; locale: "en" | "fr" } | undefined {
  const enMatch = getServices("en").find((s) => s.slug === slug);
  if (enMatch) return { service: enMatch, locale: "en" };
  const frMatch = getServices("fr").find((s) => s.slug === slug);
  if (frMatch) return { service: frMatch, locale: "fr" };
  return undefined;
}

export function getReciprocalSlugs(serviceId: string): { enSlug: string; frSlug: string } {
  const enS = enServicesById[serviceId];
  const frS = frServicesById[serviceId];
  return {
    enSlug: enS?.slug || serviceId,
    frSlug: frS?.slug || serviceId,
  };
}

/**
 * Bidirectional slug map (EN slug <-> FR slug) for published services. Used by
 * the locale switcher so switching language keeps the visitor on the same page.
 */
export function getSlugAlternates(): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const en of getServices("en")) {
    const fr = frServicesById[en.id];
    if (fr && isPublished(fr)) {
      alternates[en.slug] = fr.slug;
      alternates[fr.slug] = en.slug;
    }
  }
  return alternates;
}

export function categoryToHub(category: Service["category"]): HubKey {
  switch (category) {
    case "activity":
      return "activities";
    case "excursion":
      return "excursions";
    case "transfer":
      return "transfers";
    default:
      return "excursions";
  }
}

export function hubToCategory(hub: string): Service["category"] | undefined {
  switch (hub) {
    case "activities":
      return "activity";
    case "excursions":
      return "excursion";
    case "transfers":
      return "transfer";
    default:
      return undefined;
  }
}

export function getServicesByCategory(category: Service["category"], locale: string): Service[] {
  return getServices(locale).filter((s) => s.category === category);
}

export function getRelatedServices(
  currentServiceId: string,
  category: Service["category"],
  locale: string,
  limit = 3,
): Service[] {
  const sameCategory = getServicesByCategory(category, locale).filter(
    (s) => s.id !== currentServiceId,
  );
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const others = getServices(locale).filter(
    (s) => s.id !== currentServiceId && !sameCategory.some((sc) => sc.id === s.id),
  );
  return [...sameCategory, ...others].slice(0, limit);
}
