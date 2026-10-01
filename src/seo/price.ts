import type { PriceOption, PriceUnit, Service } from "@/schemas/service";

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

/** Units that describe a bookable base product (as opposed to an add-on). */
const BASE_UNITS: ReadonlySet<PriceUnit> = new Set(["person", "vehicle", "quad", "buggy"]);

/** Label hints that mark a price option as an add-on / supplement, never a base. */
const ADD_ON_HINTS = ["add-on", "addon", "extra", "supplement", "waiting", "overtime", "surcharge"];

function isAddOn(option: PriceOption): boolean {
  const label = option.label.toLowerCase();
  return ADD_ON_HINTS.some((hint) => label.includes(hint));
}

function cheapest(options: PriceOption[]): PriceOption {
  return options.reduce((min, cur) => (cur.amount < min.amount ? cur : min), options[0]);
}

/**
 * Pick the base bookable option for a service that prices per option.
 *
 * Priority:
 *  1. an option explicitly flagged `isBase` (authoritative, added in content);
 *  2. an adult option, if present;
 *  3. the cheapest option with a base unit that is not an add-on;
 *  4. the cheapest positive option;
 *  5. the very first option.
 *
 * This prevents add-ons (e.g. "Extra waiting time", "Sandboarding add-on") from
 * masquerading as the "from" price and the JSON-LD Offer.price.
 */
function selectBaseOption(options: PriceOption[]): PriceOption | undefined {
  if (options.length === 0) return undefined;

  const flagged = options.filter((o) => o.isBase && o.amount > 0);
  if (flagged.length > 0) return cheapest(flagged);

  const adult = options.find(
    (o) =>
      (o.label.toLowerCase().includes("adult") || o.label.toLowerCase().includes("adulte")) &&
      o.amount > 0,
  );
  if (adult) return adult;

  const baseOptions = options.filter(
    (o) => o.amount > 0 && !isAddOn(o) && o.unit !== undefined && BASE_UNITS.has(o.unit),
  );
  if (baseOptions.length > 0) return cheapest(baseOptions);

  const positive = options.filter((o) => o.amount > 0);
  if (positive.length > 0) return cheapest(positive);

  return options[0];
}

/**
 * Authoritative source of truth for both visible "From" pricing in the UI
 * and the JSON-LD schema Offer.price.
 */
export function getServiceDisplayPrice(service: Service): DisplayPrice {
  let amount = 0;
  let unit: PriceUnit = service.price.unit || "person";

  // Transfer services with explicit route pricing: cheapest vehicle is the sedan.
  if (service.category === "transfer" && service.routes && service.routes.length > 0) {
    unit = "vehicle";
    amount = service.routes[0].prices.sedan;
  } else if (service.price.options && service.price.options.length > 0) {
    const base = selectBaseOption(service.price.options);
    if (base) {
      amount = base.amount;
      if (base.unit) unit = base.unit;
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
