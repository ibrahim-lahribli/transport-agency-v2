import { test, expect } from "@playwright/test";

interface JsonLd {
  "@type"?: string;
  duration?: string;
  offers?: {
    "@type"?: string;
    priceCurrency?: string;
    price?: number;
  };
  [key: string]: unknown;
}

test.describe("SEO Requirements Suite", () => {
  let sitemapUrls: string[] = [];

  test.beforeAll(async ({ request }) => {
    // 1. Fetch and parse sitemap.xml
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);

    const sitemapText = await response.text();
    const locMatches = sitemapText.match(/<loc>(.*?)<\/loc>/g) || [];
    sitemapUrls = locMatches.map((m) => m.replace(/<\/?loc>/g, ""));

    // Expected URLs: 2 home + 6 hubs (3x2) + 30 product pages (15x2) = 38
    expect(sitemapUrls.length).toBe(38);

    // Book page must NOT appear in sitemap
    for (const url of sitemapUrls) {
      expect(url).not.toContain("/book");
    }
  });

  test("robots.txt is valid, disallows /book, and references sitemap.xml", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);

    const text = await response.text();
    expect(text).toContain("Disallow: /book");
    expect(text).toContain("Disallow: /*/book");
    expect(text).toContain("/sitemap.xml");
  });

  test("booking pages have noindex robots metadata and exactly one h1", async ({ page }) => {
    for (const locale of ["en", "fr"]) {
      await page.goto(`/${locale}/book`);

      // Exactly one h1
      await expect(page.locator("h1")).toHaveCount(1);

      // Meta robots contains noindex
      const robotsMeta = page.locator('meta[name="robots"], meta[name="googlebot"]');
      const count = await robotsMeta.count();
      expect(count).toBeGreaterThan(0);
      const content = await robotsMeta.first().getAttribute("content");
      expect(content).toContain("noindex");
    }
  });

  test("all sitemap pages satisfy: single h1, single canonical, reciprocal hreflangs, valid JSON-LD", async ({
    page,
    request,
  }) => {
    // If sitemapUrls was not populated in beforeAll in current worker, re-fetch
    if (sitemapUrls.length === 0) {
      const response = await request.get("/sitemap.xml");
      const sitemapText = await response.text();
      const locMatches = sitemapText.match(/<loc>(.*?)<\/loc>/g) || [];
      sitemapUrls = locMatches.map((m) => m.replace(/<\/?loc>/g, ""));
    }

    expect(sitemapUrls.length).toBe(38);

    for (const fullUrl of sitemapUrls) {
      const url = new URL(fullUrl);
      const path = url.pathname;

      await page.goto(path);

      // 1. Exactly one H1
      const h1Count = await page.locator("h1").count();
      expect(h1Count, `Expected exactly one H1 on ${path}`).toBe(1);

      // 2. Exactly one canonical link tag
      const canonical = page.locator('link[rel="canonical"]');
      expect(await canonical.count(), `Expected exactly one canonical link on ${path}`).toBe(1);
      const canonicalHref = await canonical.getAttribute("href");
      expect(canonicalHref).toBeTruthy();
      expect(canonicalHref).toContain(path);

      // 3. Reciprocal hreflang tags: en, fr, x-default
      const alternateEn = page.locator('link[rel="alternate"][hreflang="en"]');
      const alternateFr = page.locator('link[rel="alternate"][hreflang="fr"]');
      const alternateXDefault = page.locator('link[rel="alternate"][hreflang="x-default"]');

      expect(await alternateEn.count(), `Missing hreflang="en" on ${path}`).toBe(1);
      expect(await alternateFr.count(), `Missing hreflang="fr" on ${path}`).toBe(1);
      expect(await alternateXDefault.count(), `Missing hreflang="x-default" on ${path}`).toBe(1);

      const enHref = await alternateEn.getAttribute("href");
      const frHref = await alternateFr.getAttribute("href");
      const xDefaultHref = await alternateXDefault.getAttribute("href");

      expect(enHref).toBeTruthy();
      expect(frHref).toBeTruthy();
      expect(xDefaultHref).toBeTruthy();
      expect(xDefaultHref).toBe(enHref); // x-default matches English version

      // 4. Valid JSON-LD scripts
      const jsonLdScripts = page.locator('script[type="application/ld+json"]');
      const jsonLdCount = await jsonLdScripts.count();
      expect(jsonLdCount, `Expected at least one JSON-LD script on ${path}`).toBeGreaterThanOrEqual(1);

      const parsedSchemas: JsonLd[] = [];
      for (let i = 0; i < jsonLdCount; i++) {
        const raw = await jsonLdScripts.nth(i).textContent();
        expect(raw).toBeTruthy();
        let parsed: JsonLd = {};
        expect(() => {
          parsed = JSON.parse(raw!);
        }, `Invalid JSON-LD on ${path}: ${raw}`).not.toThrow();
        parsedSchemas.push(parsed);
      }

      // Every page has TravelAgency and BreadcrumbList
      const hasTravelAgency = parsedSchemas.some((s) => s["@type"] === "TravelAgency");
      const hasBreadcrumb = parsedSchemas.some((s) => s["@type"] === "BreadcrumbList");
      expect(hasTravelAgency, `TravelAgency JSON-LD missing on ${path}`).toBe(true);
      expect(hasBreadcrumb, `BreadcrumbList JSON-LD missing on ${path}`).toBe(true);

      // 5. Product pages: TouristTrip with Offer and ISO 8601 duration
      const isProductPage =
        !path.endsWith("/en") &&
        !path.endsWith("/fr") &&
        !path.endsWith("/excursions") &&
        !path.endsWith("/activities") &&
        !path.endsWith("/transfers");

      if (isProductPage) {
        const touristTrip = parsedSchemas.find((s) => s["@type"] === "TouristTrip");
        expect(touristTrip, `TouristTrip JSON-LD missing on product page ${path}`).toBeTruthy();

        // ISO 8601 duration is only present on timed products (never transfers).
        // When present it must be a valid, normalized ISO 8601 duration.
        if (touristTrip!.duration !== undefined) {
          expect(touristTrip!.duration).toMatch(/^PT(\d+H)?(\d+M)?$/);
          expect(touristTrip!.duration).not.toMatch(/60M/);
        }

        // Offer check
        const offers = touristTrip!.offers;
        expect(offers).toBeTruthy();
        expect(offers!["@type"]).toBe("Offer");
        expect(offers!.priceCurrency).toBe("EUR");
        expect(typeof offers!.price).toBe("number");
        expect(offers!.price).toBeGreaterThan(0);

        // RULE: Visible price matches JSON-LD price as a whole number token
        // (a plain substring check would let 5 pass against 250).
        const visiblePriceEl = page.locator('[data-testid="quick-facts-price"]');
        await expect(visiblePriceEl).toBeVisible();
        const visiblePriceText = (await visiblePriceEl.textContent()) ?? "";
        const pricePattern = new RegExp(`(^|\\D)${offers!.price}(\\D|$)`);
        expect(
          visiblePriceText,
          `Visible price "${visiblePriceText}" does not contain ${offers!.price} on ${path}`,
        ).toMatch(pricePattern);
      }
    }
  });

  test("FAQ accordions exist in the DOM with <details> and <summary>", async ({ page }) => {
    // Test on one product page with FAQs
    await page.goto("/en/agadir-boat-cruise-fishing-bbq-lunch");

    const detailsCount = await page.locator("details").count();
    expect(detailsCount).toBeGreaterThan(0);

    const firstSummary = page.locator("details summary").first();
    await expect(firstSummary).toBeVisible();
  });
});
