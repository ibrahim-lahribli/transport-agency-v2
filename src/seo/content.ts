import { services as enServices, servicesById as enServicesById } from "../../content/en/index";
import { services as frServices, servicesById as frServicesById } from "../../content/fr/index";
import type { Service } from "@/schemas/service";

export type HubKey = "excursions" | "activities" | "transfers";

export const HUB_KEYS: HubKey[] = ["excursions", "activities", "transfers"];

export function getServices(locale: string): Service[] {
  return locale === "fr" ? frServices : enServices;
}

export function getServiceById(id: string, locale: string): Service | undefined {
  return locale === "fr" ? frServicesById[id] : enServicesById[id];
}

export function getServiceBySlug(slug: string, locale: string): Service | undefined {
  const list = getServices(locale);
  return list.find((s) => s.slug === slug);
}

export function findServiceByAnySlug(slug: string): { service: Service; locale: "en" | "fr" } | undefined {
  const enMatch = enServices.find((s) => s.slug === slug);
  if (enMatch) return { service: enMatch, locale: "en" };
  const frMatch = frServices.find((s) => s.slug === slug);
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
  const all = getServices(locale);
  return all.filter((s) => s.category === category);
}

export function getRelatedServices(
  currentServiceId: string,
  category: Service["category"],
  locale: string,
  limit: number = 3,
): Service[] {
  const sameCategory = getServicesByCategory(category, locale).filter(
    (s) => s.id !== currentServiceId,
  );
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  // If not enough in same category, supplement with others
  const others = getServices(locale).filter(
    (s) => s.id !== currentServiceId && !sameCategory.some((sc) => sc.id === s.id),
  );
  return [...sameCategory, ...others].slice(0, limit);
}
