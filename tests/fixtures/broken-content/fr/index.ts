import type { Service } from "@/schemas/service";

export const services: Service[] = [
  // broken-service-1 has missing FR fields: empty summary, missing primaryKeyword, etc.
  {
    id: "broken-service-1",
    category: "activity",
    status: "draft",
    order: 1,
    slug: "duplicate-fr-slug",
    title: "Service cassé 1",
    summary: "", // Missing summary!
    seo: {
      title: "Titre FR",
      description: "", // Missing description!
    },
    primaryKeyword: "", // Missing primaryKeyword!
    price: {
      currency: "EUR",
      unit: "person",
      confirmed: false,
      options: [{ label: "Adulte", amount: 50, unit: "person" }],
    },
    cancellationPolicy: "adventure",
    host: "operator-team",
    languages: ["fr"],
  },
  // Note: broken-service-2 is completely missing from FR!
];

export const servicesById: Record<string, Service> = {
  "broken-service-1": services[0],
};
