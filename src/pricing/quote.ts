import { selectBaseOption } from "@/seo/price";

import { EUR_TO_MAD_RATE } from "./rate";
import type {
  Party,
  QuoteLine,
  QuoteResult,
  QuoteSelection,
  QuoteService,
  VehicleClass,
} from "./types";

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/** Seat-based vehicle choice: sedan up to 3, van 4 to 7, minibus 8 to 15. */
export function vehicleForParty(passengers: number): VehicleClass {
  if (passengers <= 3) return "sedan";
  if (passengers <= 7) return "van";
  return "minibus";
}

function invalid(error: string): QuoteResult {
  return {
    valid: false,
    error,
    currency: "EUR",
    totalEur: 0,
    indicativeMad: 0,
    exchangeRate: EUR_TO_MAD_RATE,
    breakdown: [],
    notes: [],
  };
}

function validateParty(party: Party): string | null {
  const { adults, children } = party;
  if (![adults, children].every((n) => Number.isInteger(n) && n >= 0)) {
    return "Party sizes must be whole numbers.";
  }
  if (adults + children < 1) return "At least one traveller is required.";
  if (adults < 1) return "Children must travel with at least one adult.";
  return null;
}

function findAdultOption(options: QuoteService["price"]["options"]) {
  return options?.find((o) => /adult|adulte/i.test(o.label));
}

function findChildOption(options: QuoteService["price"]["options"]) {
  return options?.find((o) => /child|enfant/i.test(o.label) && !/under/i.test(o.label));
}

/**
 * A pure quote for a service and party, independent of React. Returns a
 * breakdown plus an indicative MAD conversion; never mutates its input.
 */
export function quote(
  service: QuoteService,
  party: Party,
  selection: QuoteSelection = {},
): QuoteResult {
  const partyError = validateParty(party);
  if (partyError) return invalid(partyError);

  const persons = party.adults + party.children;
  const breakdown: QuoteLine[] = [];
  const notes: string[] = [];

  // 1. Transfers priced per route and vehicle class.
  if (service.routes && service.routes.length > 0) {
    const index = Math.min(Math.max(selection.routeIndex ?? 0, 0), service.routes.length - 1);
    const route = service.routes[index];
    const vehicle = selection.vehicle ?? vehicleForParty(persons);
    const unitAmount = route.prices[vehicle];
    breakdown.push({
      label: `${route.from} → ${route.to} (${vehicle})`,
      quantity: 1,
      unitAmount,
      total: unitAmount,
    });
    if (!selection.vehicle) {
      notes.push(`A ${vehicle} is quoted for ${persons} passenger(s).`);
    }
  }
  // 2. Activities/tours priced per option.
  else if (service.price.options && service.price.options.length > 0) {
    const options = service.price.options;

    if (selection.optionLabel) {
      const chosen = options.find((o) => o.label === selection.optionLabel);
      if (!chosen) return invalid("Unknown price option.");
      const unit = chosen.unit ?? service.price.unit ?? "person";
      const quantity = unit === "person" ? persons : 1;
      breakdown.push({
        label: chosen.label,
        quantity,
        unitAmount: chosen.amount,
        total: round2(chosen.amount * quantity),
      });
    } else {
      const adultOption = findAdultOption(options);
      const childOption = findChildOption(options);
      const base = selectBaseOption(options);
      const baseUnit = base?.unit ?? service.price.unit ?? "person";

      if (adultOption && childOption && baseUnit === "person") {
        breakdown.push({
          label: adultOption.label,
          quantity: party.adults,
          unitAmount: adultOption.amount,
          total: round2(adultOption.amount * party.adults),
        });
        if (party.children > 0) {
          breakdown.push({
            label: childOption.label,
            quantity: party.children,
            unitAmount: childOption.amount,
            total: round2(childOption.amount * party.children),
          });
        }
      } else if (base) {
        const quantity = baseUnit === "person" ? persons : 1;
        breakdown.push({
          label: base.label,
          quantity,
          unitAmount: base.amount,
          total: round2(base.amount * quantity),
        });
        if (baseUnit !== "person") {
          notes.push("The price is per vehicle/unit; the operator confirms the final unit on booking.");
        }
      }
    }
  } else {
    return invalid("This service is priced on request.");
  }

  const totalEur = round2(breakdown.reduce((sum, line) => sum + line.total, 0));
  const indicativeMad = round2(totalEur * EUR_TO_MAD_RATE);

  return {
    valid: true,
    currency: "EUR",
    totalEur,
    indicativeMad,
    exchangeRate: EUR_TO_MAD_RATE,
    breakdown,
    notes,
  };
}
