import { describe, expect, it } from "vitest";

import { runValidation, validateLocale, validateParity } from "./validate-content";

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
