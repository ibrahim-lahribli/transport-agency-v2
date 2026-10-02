import { describe, expect, it } from "vitest";

import {
  runValidation,
  validateLocale,
  validateParity,
  validateTranslation,
} from "./validate-content";

/** A minimal published service, with `overrides` merged on top. */
function service(overrides: Record<string, unknown> = {}) {
  return {
    id: "svc",
    category: "excursion",
    status: "published",
    order: 1,
    slug: "svc",
    title: "Title",
    summary: "A long English summary that is clearly prose, not a label.",
    seo: { title: "Title", description: "Description" },
    primaryKeyword: "title",
    price: { currency: "EUR", unit: "person", confirmed: false },
    cancellationPolicy: "excursion",
    languages: ["en"],
    host: "driver-host",
    restrictions: ["Departures depend on the weather and the state of the sea."],
    ...overrides,
  };
}

describe("content validation", () => {
  it("passes every rule across both locales", () => {
    expect(runValidation()).toEqual([]);
  });

  it("flags a duplicate slug", () => {
    const problems = validateLocale(
      [
        {
          id: "a",
          category: "excursion",
          status: "published",
          order: 1,
          slug: "same",
          title: "A",
          summary: "s",
          seo: { title: "A", description: "d" },
          primaryKeyword: "a",
          price: { currency: "EUR", unit: "person", confirmed: false },
          cancellationPolicy: "excursion",
          languages: ["en"],
          host: "driver-host",
        },
        {
          id: "b",
          category: "excursion",
          status: "published",
          order: 2,
          slug: "same",
          title: "B",
          summary: "s",
          seo: { title: "B", description: "d" },
          primaryKeyword: "b",
          price: { currency: "EUR", unit: "person", confirmed: false },
          cancellationPolicy: "excursion",
          languages: ["en"],
          host: "driver-host",
        },
      ] as never,
      "en",
    );
    expect(problems.some((p) => p.includes("duplicate slug"))).toBe(true);
  });

  it("flags a French field that is still the English text", () => {
    const problems = validateTranslation(
      [service()] as never,
      [service({ slug: "svc-fr" })] as never,
      "fr",
    );
    expect(problems.some((p) => p.includes("summary"))).toBe(true);
    expect(problems.some((p) => p.includes("restrictions"))).toBe(true);
  });

  it("flags an editorial draft marker in shipped copy", () => {
    const problems = validateTranslation(
      [service()] as never,
      [
        service({
          summary: "Un résumé traduit en français, clair et complet. (Draft for native review.)",
          restrictions: ["Les départs dépendent de la météo et de l'état de la mer."],
        }),
      ] as never,
      "fr",
    );
    expect(problems.some((p) => p.includes("draft marker"))).toBe(true);
  });

  it("does not flag a translated field that shares a short word", () => {
    const problems = validateTranslation(
      [service({ suitableFor: ["Couples", "Families"] })] as never,
      [
        service({
          summary: "Un long résumé français qui constitue bien de la prose.",
          suitableFor: ["Couples", "Familles"],
          restrictions: ["Les départs dépendent de la météo et de l'état de la mer."],
        }),
      ] as never,
      "fr",
    );
    expect(problems).toEqual([]);
  });

  it("flags a service missing from the other locale", () => {
    const problems = validateParity(
      [
        {
          id: "only-en",
          category: "excursion",
          status: "published",
          order: 1,
          slug: "only-en",
          title: "x",
          summary: "s",
          seo: { title: "x", description: "d" },
          primaryKeyword: "x",
          price: { currency: "EUR", unit: "person", confirmed: false },
          cancellationPolicy: "excursion",
          languages: ["en"],
          host: "driver-host",
        },
      ] as never,
      [],
    );
    expect(problems.some((p) => p.includes("not FR"))).toBe(true);
  });
});
