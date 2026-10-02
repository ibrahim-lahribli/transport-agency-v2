import { describe, expect, it } from "vitest";

import { getServiceById } from "@/catalogue";
import type { Service } from "@/schemas/service";

import { quote, vehicleForParty } from "./quote";

function service(id: string): Service {
  const found = getServiceById(id, "en");
  if (!found) throw new Error(`missing service ${id}`);
  return found;
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
