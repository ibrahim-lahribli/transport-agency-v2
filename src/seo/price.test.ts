import { describe, expect, it } from "vitest";

import { getServiceById } from "@/catalogue";

import { getServiceDisplayPrice } from "./price";

function display(id: string) {
  const service = getServiceById(id, "en");
  if (!service) throw new Error(`missing service ${id}`);
  return getServiceDisplayPrice(service);
}

describe("getServiceDisplayPrice", () => {
  it("never lets an add-on become the headline price (Crocoparc)", () => {
    const price = display("crocoparc");
    expect(price.amount).toBe(25);
    expect(price.unit).toBe("vehicle");
  });

  it("uses the flagged base option (Timlalin camel, not the sandboarding add-on)", () => {
    const price = display("timlalin-dunes");
    expect(price.amount).toBe(15);
    expect(price.unit).toBe("person");
  });

  it("uses the cheapest vehicle for transfers", () => {
    expect(display("airport-agadir").amount).toBe(20);
    expect(display("airport-taghazout").amount).toBe(30);
    expect(display("private-transfers-tourist-transport").amount).toBe(95);
  });

  it("uses the adult option for per-person tours", () => {
    expect(display("boat-cruise").amount).toBe(35);
    expect(display("paradise-valley").amount).toBe(30);
  });
});
