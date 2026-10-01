import type { PriceUnit, Service } from "@/schemas/service";

export interface DisplayPrice {
  amount: number;
  currency: "EUR";
  unit: PriceUnit;
  unitLabel: {
    en: string;
    fr: string;
  };
  formatted: {
    en: string;
    fr: string;
  };
}

/**
 * Authoritative source of truth for both visible "From" pricing in the UI
 * and the JSON-LD schema Offer.price.
 */
export function getServiceDisplayPrice(service: Service): DisplayPrice {
  let amount = 0;
  let unit: PriceUnit = service.price.unit || "person";

  // Transfer services with explicit route pricing
  if (service.category === "transfer" && service.routes && service.routes.length > 0) {
    unit = "vehicle";
    amount = service.routes[0].prices.sedan;
  } else if (service.price.options && service.price.options.length > 0) {
    // Prefer the adult price if specified
    const adultOpt = service.price.options.find(
      (o) =>
        (o.label.toLowerCase().includes("adult") || o.label.toLowerCase().includes("adulte")) &&
        o.amount > 0,
    );

    if (adultOpt) {
      amount = adultOpt.amount;
      if (adultOpt.unit) unit = adultOpt.unit;
    } else {
      // Otherwise pick the lowest positive option amount
      const positiveOpts = service.price.options.filter((o) => o.amount > 0);
      if (positiveOpts.length > 0) {
        const lowest = positiveOpts.reduce(
          (min, cur) => (cur.amount < min.amount ? cur : min),
          positiveOpts[0],
        );
        amount = lowest.amount;
        if (lowest.unit) unit = lowest.unit;
      } else {
        amount = service.price.options[0].amount;
      }
    }
  }

  const unitLabels: Record<PriceUnit, { en: string; fr: string }> = {
    person: { en: "person", fr: "personne" },
    vehicle: { en: "vehicle", fr: "véhicule" },
    quad: { en: "quad", fr: "quad" },
    buggy: { en: "buggy", fr: "buggy" },
    "per 30 min": { en: "per 30 min", fr: "par 30 min" },
    "30 minutes": { en: "30 minutes", fr: "30 minutes" },
  };

  const label = unitLabels[unit] || { en: unit, fr: unit };

  return {
    amount,
    currency: "EUR",
    unit,
    unitLabel: label,
    formatted: {
      en: `${amount} € / ${label.en}`,
      fr: `${amount} € / ${label.fr}`,
    },
  };
}
