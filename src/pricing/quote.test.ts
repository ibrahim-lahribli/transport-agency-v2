import { describe, expect, it } from "vitest";

import { getServiceById } from "@/catalogue";
import type { Service } from "@/schemas/service";

import { quote, vehicleForParty } from "./quote";

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
