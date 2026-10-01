import { describe, expect, it } from "vitest";
import { EUR_TO_MAD_RATE } from "../../config/business.ts";
import { quote } from "./quote.ts";

describe("Quoting Engine: quote()", () => {
  describe("All 15 services unit tests", () => {
    // 1. Boat Cruise
    it("1. quotes boat-cruise with adult, child and infant", () => {
      const res = quote("boat-cruise", { adults: 2, children: 1, infants: 1 });
      expect(res.valid).toBe(true);
      // 2 * 35 + 1 * 18 + 0 = 88 EUR
      expect(res.totalEur).toBe(88);
      expect(res.indicativeMad).toBe(Math.round(88 * EUR_TO_MAD_RATE));
      expect(res.breakdown).toHaveLength(3);
      expect(res.breakdown[0].label).toContain("Adult");
      expect(res.breakdown[0].totalPrice).toBe(70);
      expect(res.breakdown[1].totalPrice).toBe(18);
      expect(res.breakdown[2].totalPrice).toBe(0);
    });

    // 2. Timlalin Dunes
    it("2. quotes timlalin-dunes camel and combo options", () => {
      const camelRes = quote("timlalin-dunes", { adults: 2 }, { optionLabel: "camel" });
      expect(camelRes.valid).toBe(true);
      expect(camelRes.totalEur).toBe(30); // 2 * 15

      const comboRes = quote("timlalin-dunes", { adults: 2 }, { optionLabel: "combo" });
      expect(comboRes.valid).toBe(true);
      expect(comboRes.totalEur).toBe(110); // 2 * 55
    });

    // 3. Quad & Buggy Forest
    it("3. quotes quad-buggy-forest with single quads, double quads, and buggies", () => {
      const res = quote(
        "quad-buggy-forest",
        { adults: 4 },
        { quadCount: 1, quadDoubleCount: 1, buggyCount: 1 },
      );
      expect(res.valid).toBe(true);
      // 1 * 35 + 1 * 50 + 1 * 80 = 165 EUR
      expect(res.totalEur).toBe(165);
    });

    // 4. Horse Riding Souss
    it("4. quotes horse-riding-souss for 1-hour and 2-hour rides", () => {
      const res1h = quote("horse-riding-souss", { adults: 1 });
      expect(res1h.valid).toBe(true);
      expect(res1h.totalEur).toBe(25);

      const res2h = quote("horse-riding-souss", { adults: 2 }, { ridingHours: 2 });
      expect(res2h.valid).toBe(true);
      expect(res2h.totalEur).toBe(80); // 2 * 40
    });

    // 5. Crocoparc
    it("5. quotes crocoparc per-vehicle transport with extra waiting", () => {
      // 2 adults -> Sedan: 25 EUR
      const resSedan = quote("crocoparc", { adults: 2 });
      expect(resSedan.valid).toBe(true);
      expect(resSedan.totalEur).toBe(25);
      expect(resSedan.vehicleClass).toBe("sedan");

      // 5 adults -> Van: 35 EUR + 2x extra waiting (10 EUR) = 45 EUR
      const resVan = quote("crocoparc", { adults: 5 }, { extraWaiting30MinCount: 2 });
      expect(resVan.valid).toBe(true);
      expect(resVan.totalEur).toBe(45);
      expect(resVan.vehicleClass).toBe("van");
    });

    // 6. Moroccan Evening
    it("6. quotes moroccan-evening dinner and show", () => {
      const res = quote("moroccan-evening", { adults: 2, children: 2 });
      expect(res.valid).toBe(true);
      // 2 * 40 + 2 * 20 = 120 EUR
      expect(res.totalEur).toBe(120);
    });

    // 7. Paradise Valley
    it("7. quotes paradise-valley day excursion", () => {
      const res = quote("paradise-valley", { adults: 3, children: 1 });
      expect(res.valid).toBe(true);
      // 3 * 30 + 1 * 15 = 105 EUR
      expect(res.totalEur).toBe(105);
    });

    // 8. Agadir City Tour
    it("8. quotes agadir-city-tour with optional guide", () => {
      const res = quote("agadir-city-tour", { adults: 2 }, { licensedGuide: true });
      expect(res.valid).toBe(true);
      // 2 * 20 + 25 = 65 EUR
      expect(res.totalEur).toBe(65);
    });

    // 9. Massa Tiznit
    it("9. quotes massa-tiznit day trip including lunch", () => {
      const res = quote("massa-tiznit", { adults: 2, children: 1 });
      expect(res.valid).toBe(true);
      // 2 * 38 + 1 * 19 = 95 EUR
      expect(res.totalEur).toBe(95);
    });

    // 10. Essaouira
    it("10. quotes essaouira day trip", () => {
      const res = quote("essaouira", { adults: 2, children: 1 });
      expect(res.valid).toBe(true);
      // 2 * 35 + 1 * 18 = 88 EUR
      expect(res.totalEur).toBe(88);
    });

    // 11. Taroudant Tiout
    it("11. quotes taroudant-tiout day trip including lunch", () => {
      const res = quote("taroudant-tiout", { adults: 2, children: 1 });
      expect(res.valid).toBe(true);
      // 2 * 38 + 1 * 19 = 95 EUR
      expect(res.totalEur).toBe(95);
    });

    // 12. Marrakech
    it("12. quotes marrakech day trip with party of 4", () => {
      const res = quote("marrakech", { adults: 4, children: 1 });
      expect(res.valid).toBe(true);
      // 4 * 45 + 1 * 25 = 205 EUR
      expect(res.totalEur).toBe(205);
    });

    // 13. Airport Agadir Transfer
    it("13. quotes airport-agadir transfer with additional stop and waiting", () => {
      // Route 0 (airport to city): Sedan 20 EUR + 1 stop (5 EUR) + 1x waiting (5 EUR) = 30 EUR
      const res = quote(
        "airport-agadir",
        { adults: 2 },
        { additionalStops: 1, extraWaiting30MinCount: 1, childSeats: 1 },
      );
      expect(res.valid).toBe(true);
      expect(res.totalEur).toBe(30);
      expect(res.breakdown.find((b) => b.label.includes("Child seat"))?.totalPrice).toBe(0);
    });

    // 14. Airport Taghazout Transfer
    it("14. quotes airport-taghazout transfer with surfboards", () => {
      // 2 adults with 6 surfboards -> requires van (45 EUR for Taghazout route 1)
      // 4 boards free, 2 extra boards * 5 EUR = 10 EUR
      // Total = 45 + 10 = 55 EUR
      const res = quote("airport-taghazout", { adults: 2 }, { to: "Taghazout", surfboards: 6 });
      expect(res.valid).toBe(true);
      expect(res.vehicleClass).toBe("van");
      expect(res.totalEur).toBe(55);
    });

    // 15. Private Transfers & Tourist Transport
    it("15. quotes private-transfers-tourist-transport day hire and route", () => {
      // Day hire: sedan (90 EUR) + 2 hours overtime (2 * 8 EUR = 16 EUR) = 106 EUR
      const dayHireRes = quote(
        "private-transfers-tourist-transport",
        { adults: 2 },
        { dayHireOvertimeHours: 2 },
      );
      expect(dayHireRes.valid).toBe(true);
      expect(dayHireRes.totalEur).toBe(106);

      // Route: Agadir to Marrakech in van (160 EUR)
      const routeRes = quote(
        "private-transfers-tourist-transport",
        { adults: 5 },
        { to: "Marrakech" },
      );
      expect(routeRes.valid).toBe(true);
      expect(routeRes.totalEur).toBe(160);
      expect(routeRes.vehicleClass).toBe("van");
    });
  });

  describe("Edge cases", () => {
    it("Edge case 1: fails when minimum group is not met (shared tour)", () => {
      // Boat cruise requires min 2
      const res = quote("boat-cruise", { adults: 1 });
      expect(res.valid).toBe(false);
      expect(res.error).toContain("Minimum group size of 2 not met");

      // Marrakech requires min 4
      const resMarrakech = quote("marrakech", { adults: 2, children: 1 });
      expect(resMarrakech.valid).toBe(false);
      expect(resMarrakech.error).toContain("Minimum group size of 4 not met");
    });

    it("Edge case 2: Monday city tour Souk El Had closure notification", () => {
      // 2026-10-05 is a Monday
      const monday = new Date("2026-10-05T10:00:00Z");
      const resMonday = quote("agadir-city-tour", { adults: 2 }, {}, monday);
      expect(resMonday.valid).toBe(true);
      expect(resMonday.notes?.[0]).toContain("Souk El Had is closed on Mondays");
      expect(resMonday.notes?.[0]).toContain("Port of Agadir");

      // 2026-10-06 is a Tuesday (no warning)
      const tuesday = new Date("2026-10-06T10:00:00Z");
      const resTuesday = quote("agadir-city-tour", { adults: 2 }, {}, tuesday);
      expect(resTuesday.valid).toBe(true);
      expect(resTuesday.notes).toBeUndefined();
    });

    it("Edge case 3: rejects child-only party (unaccompanied minors)", () => {
      const res = quote("boat-cruise", { adults: 0, children: 2 });
      expect(res.valid).toBe(false);
      expect(res.error).toBe("Children must be accompanied by at least one adult");

      const resInfant = quote("paradise-valley", { adults: 0, infants: 1 });
      expect(resInfant.valid).toBe(false);
      expect(resInfant.error).toBe("Children must be accompanied by at least one adult");
    });

    it("Edge case 4: applies Zone 2 pickup supplement correctly", () => {
      // Paradise Valley is en route north -> 0 EUR Zone 2 supplement
      const resPV = quote("paradise-valley", { adults: 2 }, { pickupZone: "zone-2" });
      expect(resPV.valid).toBe(true);
      expect(resPV.pickupZoneSupplement).toBeUndefined();
      expect(resPV.totalEur).toBe(60); // 2 * 30
      expect(resPV.notes?.[0]).toContain("Zone 2 pickup");

      // Taroudant-Tiout is east -> +5 EUR/person Zone 2 supplement
      const resTT = quote("taroudant-tiout", { adults: 2, children: 1 }, { pickupZone: "zone-2" });
      expect(resTT.valid).toBe(true);
      expect(resTT.pickupZoneSupplement).toBe(15); // 3 persons * 5 EUR
      // 2 * 38 + 19 + 15 = 110 EUR
      expect(resTT.totalEur).toBe(110);
    });

    it("Edge case 5: private rate upgrade bypasses shared minimum group", () => {
      // Party of 1 adult requesting private tour for Paradise Valley (region-near)
      const res = quote("paradise-valley", { adults: 1 }, { private: true });
      expect(res.valid).toBe(true);
      expect(res.appliedPrivateRate).toBe("region-near");
      expect(res.vehicleClass).toBe("sedan");
      expect(res.totalEur).toBe(90); // region-near sedan rate
    });

    it("Edge case 6: transfers with surfboards <= 4 are free, > 4 are charged 5 EUR each", () => {
      // 2 adults with 3 surfboards -> free supplement, upgraded to van
      const res3 = quote("airport-taghazout", { adults: 2 }, { to: "Taghazout", surfboards: 3 });
      expect(res3.valid).toBe(true);
      expect(res3.vehicleClass).toBe("van");
      expect(res3.totalEur).toBe(45); // standard van route price

      // 2 adults with 5 surfboards -> 1 extra board = 5 EUR
      const res5 = quote("airport-taghazout", { adults: 2 }, { to: "Taghazout", surfboards: 5 });
      expect(res5.valid).toBe(true);
      expect(res5.totalEur).toBe(50); // 45 + 5
    });
  });
});
