import { describe, expect, it } from "vitest";

import { getServiceById } from "@/catalogue";
import type { Service } from "@/schemas/service";

import { quote, transferToolQuote, usesTieredPricing, vehicleForParty } from "./quote";

function service(id: string, locale = "en"): Service {
  const found = getServiceById(id, locale);
  if (!found) throw new Error(`missing service ${id} (${locale})`);
  return found;
}

function reorderOptions(source: Service): Service {
  return {
    ...source,
    price: { ...source.price, options: [...(source.price.options ?? [])].reverse() },
  };
}

describe("vehicleForParty", () => {
  it("maps party size to the seat ladder", () => {
    expect(vehicleForParty(2)).toBe("sedan");
    expect(vehicleForParty(3)).toBe("sedan");
    expect(vehicleForParty(4)).toBe("van");
    expect(vehicleForParty(7)).toBe("van");
    expect(vehicleForParty(8)).toBe("minibus");
  });
});

describe("quote", () => {
  it("prices a per-person tour per adult", () => {
    const result = quote(service("paradise-valley"), { adults: 2, children: 0 });
    expect(result.valid).toBe(true);
    expect(result.totalEur).toBe(60);
  });

  it("applies the child rate when a child option exists", () => {
    const result = quote(service("boat-cruise"), { adults: 2, children: 1 });
    expect(result.totalEur).toBe(2 * 35 + 18);
  });

  it("still applies the child rate when the options are reordered", () => {
    const result = quote(reorderOptions(service("boat-cruise")), { adults: 2, children: 1 });
    expect(result.totalEur).toBe(2 * 35 + 18);
  });

  it("uses the rounded adult look-alike option for city tour", () => {
    const result = quote(service("agadir-city-tour"), { adults: 1, children: 1 });
    expect(result.totalEur).toBe(20 + 10);
  });

  it("picks a transfer vehicle by party size", () => {
    expect(quote(service("airport-agadir"), { adults: 2, children: 0 }).totalEur).toBe(20);
    expect(quote(service("airport-agadir"), { adults: 5, children: 0 }).totalEur).toBe(30);
    expect(quote(service("airport-agadir"), { adults: 9, children: 0 }).totalEur).toBe(50);
  });

  it("converts to an indicative MAD total", () => {
    const result = quote(service("paradise-valley"), { adults: 2, children: 0 });
    expect(result.indicativeMad).toBeCloseTo(result.totalEur * result.exchangeRate, 2);
  });

  it("rejects an empty party", () => {
    const result = quote(service("paradise-valley"), { adults: 0, children: 0 });
    expect(result.valid).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it("rejects children without an adult", () => {
    const result = quote(service("paradise-valley"), { adults: 0, children: 2 });
    expect(result.valid).toBe(false);
  });

  it("uses an explicit option selection when given", () => {
    const result = quote(service("quad-buggy-forest"), { adults: 1, children: 0 }, {
      optionLabel: "Buggy, 2 seats",
    });
    expect(result.valid).toBe(true);
    expect(result.totalEur).toBe(80);
  });
});

describe("transferToolQuote", () => {
  it("recommends the seat-correct vehicle and prices the cheapest route for a small party", () => {
    // 2 passengers → sedan; the airport→city sedan price is 20 (catalogue).
    const result = transferToolQuote({ routes: service("airport-agadir").routes ?? [], adults: 2, children: 0 });
    expect(result.valid).toBe(true);
    expect(result.routeIndex).toBe(0);
    expect(result.vehicleClass).toBe("sedan");
    expect(result.recommendedVehicle).toBe(true);
    expect(result.totalEur).toBe(20);
  });

  it("prices airport→Taghazout (35 € sedan) and flags estimate-basis routes", () => {
    // The tool aggregates the transfer routes across the catalogue; airport-
    // Taghazout comes from the airport-taghazout service at 35 € (sedan).
    const routes = [
      ...(service("airport-agadir").routes ?? []),
      ...(service("airport-taghazout").routes ?? []),
      ...(service("private-transfers-tourist-transport").routes ?? []),
    ];
    const index = routes.findIndex((r) => r.to.includes("Taghazout"));
    expect(index).toBeGreaterThanOrEqual(0);

    const result = transferToolQuote({ routes, adults: 2, children: 0, routeIndex: index });
    expect(result.vehicleClass).toBe("sedan");
    expect(result.totalEur).toBe(35);
    // The airport→Taghazout route declares `basis: "catalogue"` in the content
    // source; the tool must report the route's own basis, not hardcode one.
    expect(result.basis).toBe("catalogue");
  });

  it("steps up to a van at 4 passengers and a minibus at 8, re-quoting the same route", () => {
    const routes = service("airport-agadir").routes ?? [];
    expect(transferToolQuote({ routes, adults: 4, children: 0 }).totalEur).toBe(30);
    expect(transferToolQuote({ routes, adults: 8, children: 0 }).totalEur).toBe(50);
    expect(transferToolQuote({ routes, adults: 4, children: 0, routeIndex: 1 }).totalEur).toBe(35);
  });

  it("respects an explicit vehicle override and reports recommendedVehicle=false", () => {
    const routes = service("airport-agadir").routes ?? [];
    const result = transferToolQuote({ routes, adults: 2, children: 0, vehicle: "minibus" });
    expect(result.vehicleClass).toBe("minibus");
    expect(result.recommendedVehicle).toBe(false);
    expect(result.totalEur).toBe(50);
  });

  it("carries the catalogue basis when the route price is confirmed", () => {
    const routes = service("airport-agadir").routes ?? [];
    // Route 0 is basis: "catalogue" in the content source.
    expect(transferToolQuote({ routes, adults: 2, children: 0 }).basis).toBe("catalogue");
  });

  it("rejects an empty party", () => {
    const result = transferToolQuote({ routes: service("airport-agadir").routes ?? [], adults: 0, children: 0 });
    expect(result.valid).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it("converts to an indicative MAD total", () => {
    const result = transferToolQuote({ routes: service("airport-agadir").routes ?? [], adults: 2, children: 0 });
    expect(result.indicativeMad).toBeCloseTo(result.totalEur * result.exchangeRate, 2);
  });
});

describe("usesTieredPricing", () => {
  it("treats adult/child services as party-priced in both locales", () => {
    expect(usesTieredPricing(service("boat-cruise"))).toBe(true);
    expect(usesTieredPricing(service("boat-cruise", "fr"))).toBe(true);
    expect(usesTieredPricing(service("agadir-city-tour"))).toBe(true);
  });

  it("treats mutually exclusive variant services as not tiered", () => {
    expect(usesTieredPricing(service("quad-buggy-forest"))).toBe(false);
    expect(usesTieredPricing(service("timlalin-dunes"))).toBe(false);
    expect(usesTieredPricing(service("crocoparc"))).toBe(false);
  });

  it("is false for transfers, which are priced by route and vehicle", () => {
    expect(usesTieredPricing(service("airport-agadir"))).toBe(false);
  });
});

describe("child option selection", () => {
  it("bills the paid child rate under the French labels", () => {
    // FR free option is "Enfant de moins de 4 ans" and the paid one is
    // "Enfant 4 à 11 ans"; only the latter must be charged.
    const result = quote(service("boat-cruise", "fr"), { adults: 2, children: 1 });
    expect(result.valid).toBe(true);
    expect(result.totalEur).toBe(2 * 35 + 18);

    const childLine = result.breakdown.find((line) => /enfant/i.test(line.label));
    expect(childLine?.unitAmount).toBe(18);
    expect(childLine?.label).not.toMatch(/moins de/i);
  });

  it("ignores option order", () => {
    const straight = quote(service("boat-cruise", "fr"), { adults: 2, children: 1 });
    const reversed = quote(reorderOptions(service("boat-cruise", "fr")), {
      adults: 2,
      children: 1,
    });
    expect(reversed.totalEur).toBe(straight.totalEur);

    const childLine = reversed.breakdown.find((line) => /enfant/i.test(line.label));
    expect(childLine?.unitAmount).toBe(18);
  });

  it("never charges the zero-amount infant rate for a child", () => {
    const result = quote(service("paradise-valley", "fr"), { adults: 1, children: 2 });
    expect(result.totalEur).toBe(30 + 2 * 15);

    const childLine = result.breakdown.find((line) => /enfant/i.test(line.label));
    expect(childLine?.unitAmount).toBeGreaterThan(0);
  });
});
