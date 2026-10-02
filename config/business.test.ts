import { afterEach, describe, expect, it, vi } from "vitest";

const VALID_ENV: Record<string, string> = {
  BUSINESS_LEGAL_NAME: "Atlas Tours SARL",
  BUSINESS_TRADING_NAME: "Atlas Tours",
  BUSINESS_ICE: "001122334455667",
  BUSINESS_LICENCE: "LIC-2026-AGD",
  BUSINESS_INSURANCE: "Assurance RC 12345",
  BUSINESS_WHATSAPP: "+212700000000",
  BUSINESS_EMAIL: "hello@atlastours.ma",
  BUSINESS_ADDRESS: "Rue de la Plage, Agadir",
};

function stubBusinessEnv(values: Record<string, string>) {
  for (const [key, value] of Object.entries(values)) {
    vi.stubEnv(key, value);
  }
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("isPlaceholder", () => {
  it("treats empty, sentinel and example values as placeholders", async () => {
    const { isPlaceholder } = await import("./business");
    expect(isPlaceholder("")).toBe(true);
    expect(isPlaceholder("   ")).toBe(true);
    expect(isPlaceholder("TBD")).toBe(true);
    expect(isPlaceholder("Agadir Tourisme")).toBe(true);
    expect(isPlaceholder("+212600123456")).toBe(true);
  });

  it("accepts a real value", async () => {
    const { isPlaceholder } = await import("./business");
    expect(isPlaceholder("Atlas Tours SARL")).toBe(false);
  });
});

describe("getBusinessProfile", () => {
  it("reads a valid profile from the environment", async () => {
    stubBusinessEnv(VALID_ENV);
    const { getBusinessProfile } = await import("./business");
    const profile = getBusinessProfile();
    expect(profile.tradingName).toBe("Atlas Tours");
    expect(profile.email).toBe("hello@atlastours.ma");
  });

  it("throws on an invalid email", async () => {
    stubBusinessEnv({ ...VALID_ENV, BUSINESS_EMAIL: "not-an-email" });
    const { getBusinessProfile } = await import("./business");
    expect(() => getBusinessProfile()).toThrow();
  });
});

describe("enforceProductionBusinessConfig", () => {
  it("passes with a complete profile", async () => {
    stubBusinessEnv(VALID_ENV);
    const { enforceProductionBusinessConfig } = await import("./business");
    expect(() => enforceProductionBusinessConfig()).not.toThrow();
  });

  it("throws when values are still placeholders", async () => {
    stubBusinessEnv({ ...VALID_ENV, BUSINESS_ICE: "" });
    const { enforceProductionBusinessConfig } = await import("./business");
    expect(() => enforceProductionBusinessConfig()).toThrow(/placeholder/);
  });
});
