/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Deliberately broken fixture for testing validate:data failure rules.
 * This file intentionally contains invalid data and uses `any` casts to bypass TypeScript
 * type checks, so that the runtime validator can detect all the business-rule violations.
 *
 * Violations tested:
 * 1. Duplicate EN slug ('duplicate-slug' appears twice)
 * 2. SEO title > 60 characters
 * 3. SEO description > 160 characters
 * 4. Primary keyword not in SEO title
 * 5. Unknown cancellation policy ('invalid-policy')
 * 6. Unknown host key ('unknown-host')
 * 7. Unknown private-rate key ('invalid-private-rate')
 * 8. Price option with no unit
 * 9. Word "Sahara" in title and summary
 */
import type { Service } from "@/schemas/service";

export const services: Service[] = [
  // 1. Service with duplicate slug, unknown policy, unknown host, unknown private rate, and word "Sahara"
  {
    id: "broken-service-1",
    category: "activity",
    status: "draft",
    order: 1,
    slug: "duplicate-slug",
    title: "Broken Service 1 with Sahara Desert Tour",
    summary: "Visit the Sahara dunes on this tour.",
    seo: {
      // > 60 chars — intentional to trigger SEO title length error
      title: "This SEO Title Is Definitely Far Too Long Because It Exceeds Sixty Characters Easily",
      // > 160 chars — intentional to trigger SEO description length error
      description:
        "This SEO description is written to be extremely long and excessively verbose so that its character count exceeds one hundred and sixty characters in total length for test.",
    },
    // Keyword doesn't appear in the SEO title — intentional
    primaryKeyword: "unmatched keyword not in title",
    price: {
      currency: "EUR",
      // Top-level unit intentionally absent to trigger unit-missing rule
      confirmed: false,
      options: [
        {
          label: "Adult",
          amount: 50,
          // unit intentionally absent to trigger per-option unit-missing rule
        } as any,
      ],
    } as any,
    cancellationPolicy: "invalid-policy" as any, // unknown policy
    host: "unknown-host" as any, // unknown host
    privateRate: "invalid-private-rate" as any, // unknown private-rate key
    languages: ["en"],
  },
  // 2. Service with duplicate slug (same as service 1)
  {
    id: "broken-service-2",
    category: "activity",
    status: "draft",
    order: 2,
    slug: "duplicate-slug", // duplicate — intentional
    title: "Broken Service 2",
    summary: "Summary without issue",
    seo: {
      title: "Broken Service 2", // keyword 'some keyword' not in title — intentional
      description: "Short description",
    },
    primaryKeyword: "some keyword",
    price: {
      currency: "EUR",
      unit: "person",
      confirmed: false,
      options: [{ label: "Adult", amount: 20, unit: "person" }],
    },
    cancellationPolicy: "adventure",
    host: "operator-team",
    languages: ["en"],
  },
];

export const servicesById: Record<string, Service> = {
  "broken-service-1": services[0],
  "broken-service-2": services[1],
};
