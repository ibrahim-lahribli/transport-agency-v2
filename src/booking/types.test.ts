import { describe, expect, it } from "vitest";

import { InquirySchema } from "./types";

const base = {
  serviceId: "quad-buggy-forest",
  name: "Ada Lovelace",
  email: "ada@example.com",
  phone: "0612345678",
  adults: "2",
  children: "0",
};

describe("InquirySchema", () => {
  it("accepts an inquiry without a selection", () => {
    const parsed = InquirySchema.safeParse(base);
    expect(parsed.success).toBe(true);
  });

  it("accepts an option, route and vehicle selection", () => {
    const parsed = InquirySchema.safeParse({
      ...base,
      optionLabel: "Buggy, 2 seats",
      vehicle: "van",
      routeIndex: "1",
    });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.optionLabel).toBe("Buggy, 2 seats");
      expect(parsed.data.vehicle).toBe("van");
      expect(parsed.data.routeIndex).toBe(1);
    }
  });

  it("rejects an unknown vehicle class", () => {
    expect(InquirySchema.safeParse({ ...base, vehicle: "helicopter" }).success).toBe(false);
  });

  it("rejects a negative route index", () => {
    expect(InquirySchema.safeParse({ ...base, routeIndex: "-1" }).success).toBe(false);
  });
});
