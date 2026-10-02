import { describe, expect, it } from "vitest";

import { getServiceById } from "@/catalogue";
import type { Service } from "@/schemas/service";

import { resolveSelection } from "./selection";

function service(id: string, locale = "en"): Service {
  const found = getServiceById(id, locale);
  if (!found) throw new Error(`missing service ${id} (${locale})`);
  return found;
}

describe("resolveSelection", () => {
  it("accepts an empty selection", () => {
    const result = resolveSelection(service("boat-cruise"), {});
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.selection).toEqual({});
  });

  it("accepts a known variant option label, in the service's own locale", () => {
    expect(resolveSelection(service("quad-buggy-forest"), { optionLabel: "Buggy, 2 seats" }).ok).toBe(
      true,
    );
    // French services carry translated labels, so the FR catalogue has its own.
    expect(
      resolveSelection(service("quad-buggy-forest", "fr"), { optionLabel: "Buggy, 2 places" }).ok,
    ).toBe(true);
  });

  it("rejects an unknown option label", () => {
    const result = resolveSelection(service("quad-buggy-forest"), {
      optionLabel: "Free helicopter ride",
    });
    expect(result).toEqual({ ok: false, field: "optionLabel" });
  });

  it("resolves a transfer route to a from → to label", () => {
    const result = resolveSelection(service("airport-agadir"), { routeIndex: 1 });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.selection.routeLabel).toContain("→");
  });

  it("rejects an out-of-range route index", () => {
    const result = resolveSelection(service("airport-agadir"), { routeIndex: 99 });
    expect(result).toEqual({ ok: false, field: "routeIndex" });
  });

  it("accepts a vehicle the transfer runs", () => {
    const result = resolveSelection(service("airport-agadir"), { vehicle: "minibus" });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.selection.vehicle).toBe("minibus");
  });

  it("rejects a vehicle the transfer does not run", () => {
    const result = resolveSelection(service("airport-agadir"), { vehicle: "helicopter" });
    expect(result).toEqual({ ok: false, field: "vehicle" });
  });

  it("rejects a vehicle on a service with no routes", () => {
    const result = resolveSelection(service("boat-cruise"), { vehicle: "van" });
    expect(result).toEqual({ ok: false, field: "vehicle" });
  });
});
