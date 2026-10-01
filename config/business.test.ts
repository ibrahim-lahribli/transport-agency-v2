import { describe, expect, it } from "vitest";
import {
  BASE_CURRENCY,
  convertEurToMad,
  EUR_TO_MAD_RATE,
  INDICATIVE_CURRENCY,
  isPlaceholder,
  TIMEZONE,
  validateBusinessConfig,
} from "./business";

describe("Business configuration", () => {
  it("uses Africa/Casablanca timezone and EUR as base currency", () => {
    expect(TIMEZONE).toBe("Africa/Casablanca");
    expect(BASE_CURRENCY).toBe("EUR");
    expect(INDICATIVE_CURRENCY).toBe("MAD");
    expect(typeof EUR_TO_MAD_RATE).toBe("number");
  });

  it("calculates indicative MAD from EUR using config rate", () => {
    const rate = 10.8;
    expect(convertEurToMad(35, rate)).toBe(378);
    expect(convertEurToMad(20, rate)).toBe(216);
  });

  describe("isPlaceholder", () => {
    it("identifies (T), empty, todo, and placeholder markers as placeholders", () => {
      expect(isPlaceholder("(T)")).toBe(true);
      expect(isPlaceholder("(T) per vehicle")).toBe(true);
      expect(isPlaceholder("")).toBe(true);
      expect(isPlaceholder("   ")).toBe(true);
      expect(isPlaceholder(undefined)).toBe(true);
      expect(isPlaceholder(null)).toBe(true);
      expect(isPlaceholder("TODO: add ICE")).toBe(true);
      expect(isPlaceholder("placeholder")).toBe(true);
      expect(isPlaceholder("TO_PROVIDE")).toBe(true);
      expect(isPlaceholder("unknown")).toBe(true);
    });

    it("accepts valid non-placeholder strings", () => {
      expect(isPlaceholder("Agadir Tourisme SARL")).toBe(false);
      expect(isPlaceholder("002938475000082")).toBe(false);
      expect(isPlaceholder("+212600123456")).toBe(false);
      expect(isPlaceholder("contact@example.com")).toBe(false);
    });
  });

  describe("validateBusinessConfig", () => {
    it("fails when any (T) field is a placeholder", () => {
      const mockEnv = {
        BUSINESS_LEGAL_NAME: "(T)",
        BUSINESS_ICE: "002938475000082",
        BUSINESS_LICENCE: "LIC-2026",
        BUSINESS_INSURANCE: "RC Pro",
        BUSINESS_WHATSAPP: "+212600123456",
        BUSINESS_EMAIL: "contact@example.com",
        BUSINESS_ADDRESS: "Agadir",
      };

      const result = validateBusinessConfig(mockEnv);
      expect(result.valid).toBe(false);
      expect(result.missingFields).toContain("legalName");
    });

    it("succeeds when all (T) fields are valid non-placeholders", () => {
      const mockEnv = {
        BUSINESS_LEGAL_NAME: "Agadir Tourisme SARL",
        BUSINESS_ICE: "002938475000082",
        BUSINESS_LICENCE: "LIC-2026-SOUSS",
        BUSINESS_INSURANCE: "RC Pro Tourisme",
        BUSINESS_WHATSAPP: "+212600123456",
        BUSINESS_EMAIL: "contact@example.com",
        BUSINESS_ADDRESS: "Avenue Mohammed V, Agadir",
      };

      const result = validateBusinessConfig(mockEnv);
      expect(result.valid).toBe(true);
      expect(result.missingFields).toHaveLength(0);
    });
  });
});
