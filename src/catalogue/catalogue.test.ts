import { describe, expect, it } from "vitest";

import {
  getReciprocalSlugs,
  getRelatedServices,
  getServiceBySlug,
  getServices,
  getSlugAlternates,
  HUB_KEYS,
} from "./index";

describe("catalogue", () => {
  it("exposes 15 published services per locale", () => {
    expect(getServices("en")).toHaveLength(15);
    expect(getServices("fr")).toHaveLength(15);
  });

  it("only returns published services sorted by order", () => {
    const services = getServices("en");
    expect(services.every((s) => s.status === "published")).toBe(true);
    const orders = services.map((s) => s.order);
    expect([...orders]).toEqual([...orders].sort((a, b) => a - b));
  });

  it("resolves a service by its localized slug", () => {
    const service = getServiceBySlug("agadir-boat-cruise-fishing-bbq-lunch", "en");
    expect(service?.id).toBe("boat-cruise");
    expect(getServiceBySlug("nope", "en")).toBeUndefined();
  });

  it("returns translated reciprocal slugs", () => {
    const { enSlug, frSlug } = getReciprocalSlugs("boat-cruise");
    expect(enSlug).toBe("agadir-boat-cruise-fishing-bbq-lunch");
    expect(frSlug).toBe("sortie-bateau-agadir-peche-barbecue");
  });

  it("builds a symmetric slug-alternates map", () => {
    const alternates = getSlugAlternates();
    expect(alternates["agadir-boat-cruise-fishing-bbq-lunch"]).toBe(
      "sortie-bateau-agadir-peche-barbecue",
    );
    expect(alternates["sortie-bateau-agadir-peche-barbecue"]).toBe(
      "agadir-boat-cruise-fishing-bbq-lunch",
    );
  });

  it("never includes the current service in related results", () => {
    const service = getServices("en")[0];
    const related = getRelatedServices(service.id, service.category, "en", 3);
    expect(related).toHaveLength(3);
    expect(related.some((r) => r.id === service.id)).toBe(false);
  });

  it("exposes the three hub keys", () => {
    expect(HUB_KEYS).toEqual(["excursions", "activities", "transfers"]);
  });
});
