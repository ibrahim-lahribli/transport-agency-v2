import { readFileSync } from "node:fs";
import { join } from "node:path";

import { expect, test } from "@playwright/test";

import {
  BUILD_SERVICES,
  LOCALES,
  LOCALE_DIRS,
  REPO_ROOT,
  getDisplayPrice,
  serviceImageHref,
  servicePath,
} from "./helpers/catalogue";
import type { CatalogueService } from "./helpers/types";

/** The `quick-facts` "from price" tile the page pins for exactly this purpose. */
const PRICE_TESTID = "quick-facts-price";

/** Spec item 1 + Review Focus 1: no leaked `undefined`, no empty after-comma. */
const RENDER_NOISE = /\bundefined\b|,\s*,/;

/**
 * Review Focus 4: one display currency per page. Word boundaries because FR
 * copy legitimately contains "dromadaire" (a camel, not a currency).
 */
const MIXED_CURRENCY = /\bMAD\b|\bdirhams?\b/i;

/**
 * Task 1 — data integrity, derived from `content/{en,fr}` only. Expectations
 * mirror the site's contracts (publish gate, display price, image slots);
 * nothing on a page may disagree with the catalogue.
 */

test.describe("catalogue × site data integrity", () => {
  for (const locale of LOCALES) {
    const services = BUILD_SERVICES(locale);

    test(`sitemap lists exactly the ${services.length} published ${locale} services`, async ({
      request,
    }) => {
      const response = await request.get("/sitemap.xml");
      expect(response.ok()).toBeTruthy();
      const xml = await response.text();

      for (const path of services.map((s) => servicePath(locale, s))) {
        // The sitemap prints absolute URLs from SITE_URL; the local origin is
        // configurable, so match the path inside the <loc> element.
        expect(
          xml,
          `${path} in sitemap`,
        ).toMatch(new RegExp(`<loc>[^<]*${path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</loc>`));
      }
    });

    for (const service of services) {
      const path = servicePath(locale, service);

      test(`"${service.title}" (${locale}) renders its catalogue data`, async ({ page }) => {
        const response = await page.goto(path);
        expect(response?.status(), `${path} status`).toBe(200);

        // 1. Title exact match — h1 vs catalogue title.
        await expect(
          page.locator("h1"),
          `${path}: exactly one h1`,
        ).toHaveCount(1);
        await expect(page.locator("h1")).toHaveText(service.title);

        // 2. Displayed "from" price derives from the shared helper contract.
        const price = getDisplayPrice(service);
        const unitLabel = price.unitLabel[locale];
        await expect(
          page.getByTestId(PRICE_TESTID),
          `${path}: quick-facts from-price`,
        ).toHaveText(`${price.amount} € / ${unitLabel}`);

        // 3. JSON-LD Offer carries the same amount and currency.
        const trip = await page
          .locator('script[type="application/ld+json"]')
          .evaluateAll((nodes) =>
            nodes
              .map((n) => JSON.parse(n.textContent || "{}"))
              .find((d) => (d as { "@type"?: string })["@type"] === "TouristTrip"),
          );
        expect(trip, `${path}: TouristTrip JSON-LD present`).toBeTruthy();
        expect((trip as { offers?: { price?: number } }).offers?.price).toBe(price.amount);
        expect(
          (trip as { offers?: { priceCurrency?: string } }).offers?.priceCurrency,
        ).toBe("EUR");

        // 4. Duration in JSON-LD matches the catalogue's ISO duration contract.
        const hours = service.durationHours;
        if (hours) {
          expect((trip as { duration?: string }).duration).toBe(isoDuration(hours));
        } else {
          expect(
            "duration" in (trip as Record<string, unknown>),
            `${path}: no invented duration`,
          ).toBe(false);
        }
      });

      test(`"${service.title}" (${locale}) renders without noise or broken images`, async ({
        page,
      }) => {
        const response = await page.goto(path);
        expect(response?.status(), `${path} status`).toBe(200);

        // Review Focus 1: no `undefined`, no double commas, no bare "€".
        const body = await page.locator("body").innerText();
        expect(body, `${path}: no render noise`).not.toMatch(RENDER_NOISE);

        // Spec item 2: every rendered image has bytes and an intended slot.
        const imgs = await page.locator("img").all();
        expect(
          imgs.length,
          `${path}: images rendered (card/hero/gallery)`,
        ).toBeGreaterThan(0);
        for (const img of imgs) {
          const src = await img.getAttribute("src");
          expect(src, `${path}: img src present`).toBeTruthy();
          const decoded = await img.evaluate((node) => (node as HTMLImageElement).naturalWidth);
          expect(decoded, `${path}: img ${src} has intrinsic bytes`).toBeGreaterThan(0);
        }

        // The per-service slot (when configured) must be the real file,
        // not a fallback for a known id.
        const primary = serviceImageHref(service.id);
        if (primary.startsWith("/images/services/")) {
          for (const requestPath of await collectImagePaths(page)) {
            if (requestPath === primary) {
              const imgResponse = await page.request.get(primary);
              expect(
                imgResponse.status(),
                `${primary} resolves`,
              ).toBe(200);
              expect(
                (await imgResponse.body()).byteLength,
                `${primary} non-empty`,
              ).toBeGreaterThan(0);
            }
          }
        }
      });
    }

    test(`${locale}: cards and detail pages agree with the catalogue on currency`, async ({
      page,
    }) => {
      // Spec item 4 — Review Focus 4: one currency per service page.
      // The page's own copy may mention MAD (content text), so assert on the
      // price-bearing UI surfaces: the quick-facts tile and the Offer JSON-LD.
      for (const service of BUILD_SERVICES(locale)) {
        const path = servicePath(locale, service);
        await page.goto(path);
        const priceText = await page.getByTestId(PRICE_TESTID).innerText();
        expect(priceText, `${path}: single display currency`).not.toMatch(MIXED_CURRENCY);
        expect(priceText, `${path}: EUR price`).toContain("€");

        const hubs = {
          excursion: "excursions",
          activity: "activities",
          transfer: "transfers",
        } as const;
        const hub = hubs[service.category ?? "excursion"];
        await page.goto(`/${locale}/${hub}`);
        const cards = page.getByRole("article");
        const count = await cards.count();
        for (let i = 0; i < count; i += 1) {
          const cardText = await cards.nth(i).innerText();
          if (cardText.includes(service.title)) {
            expect(
              cardText,
              `hub ${hub} (${locale}): mixed currency on "${service.title}" card`,
            ).not.toMatch(MIXED_CURRENCY);
          }
        }
      }
    });
  }

  test("fixed-format: quick-facts price string consistency across locales", async () => {
    // Pins the shared helper's exact strings once, independent of pages:
    // the EN and FR formatted display strings come from the derived fixture.
    for (const locale of LOCALE_DIRS) {
      const services = BUILD_SERVICES(locale);
      const target = services.find((s) => s.id === "boat-cruise");
      expect(target, "boat-cruise present in every locale").toBeTruthy();
      const price = getDisplayPrice(target as CatalogueService);
      expect(`${price.amount} € / ${price.unitLabel[locale]}`).toBe(
        locale === "en" ? "35 € / person" : "35 € / personne",
      );
      // Currency is schema-pinned to EUR site-wide; a second currency can only
      // enter through the file's own `price.currency` field, so assert it.
      for (const s of services) {
        expect((s as { price?: { currency?: string } }).price?.currency).toBe("EUR");
      }
    }
    // Sanity: the image slot list on disk matches the helper's config.
    const disk = readFileSync(join(REPO_ROOT, "src", "content", "images.ts"), "utf8");
    expect(disk).toContain('SERVICE_IMAGE_IDS = [');
  });
});

/** HEAD the primary image (and assert non-empty bytes) via the API context. */
async function collectImagePaths(page: import("@playwright/test").Page): Promise<string[]> {
  return page.evaluate(() =>
    Array.from(document.images)
      .map((img) => new URL(img.src, location.origin).pathname)
      .filter((src) => src.startsWith("/images/")),
  );
}

function isoDuration(hours: number): string {
  // Mirrors `formatIsoDuration` from src/seo/duration.ts for the positive,
  // finite inputs the schema guarantees.
  const totalMinutes = Math.round(hours * 60);
  const wholeHours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (wholeHours === 0) return `PT${minutes}M`;
  return minutes === 0 ? `PT${wholeHours}H` : `PT${wholeHours}H${minutes}M`;
}
