import { expect, test } from "@playwright/test";

async function sitemapPaths(request: import("@playwright/test").APIRequestContext) {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBeTruthy();
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
    match[1].replace(/^https?:\/\/[^/]+/, ""),
  );
}

test("sitemap has the expected shape and excludes /book", async ({ request }) => {
  const paths = await sitemapPaths(request);
  // 2 home + 6 hubs + 15 services x2 + (2 index + 5 places x2) + (2 index + 2 guides x2).
  expect(paths).toHaveLength(2 + 6 + 15 * 2 + (2 + 5 * 2) + (2 + 2 * 2));
  expect(paths.some((p) => p.includes("/book"))).toBe(false);
});

test("every sitemap URL satisfies the SEO invariants", async ({ page, request }) => {
  const paths = await sitemapPaths(request);

  for (const path of paths) {
    await page.goto(path);

    // Exactly one h1.
    await expect(page.locator("h1"), `${path} h1 count`).toHaveCount(1);

    // Exactly one canonical, pointing at this URL.
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical, `${path} canonical count`).toHaveCount(1);
    const href = await canonical.getAttribute("href");
    expect(href, `${path} canonical href`).toContain(path);

    // Reciprocal hreflang.
    for (const lang of ["en", "fr", "x-default"]) {
      await expect(
        page.locator(`link[rel="alternate"][hreflang="${lang}"]`),
        `${path} hreflang ${lang}`,
      ).toHaveCount(1);
    }

    // Valid JSON-LD present.
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(blocks.length, `${path} json-ld blocks`).toBeGreaterThan(0);
    for (const block of blocks) {
      expect(() => JSON.parse(block), `${path} json-ld parse`).not.toThrow();
    }
  }
});

test("product pages match their visible price and omit fake durations on transfers", async ({
  page,
}) => {
  await page.goto("/en/agadir-boat-cruise-fishing-bbq-lunch");
  const visible = await page.getByTestId("quick-facts-price").innerText();
  // Independently declared expectation, not derived from the page.
  expect(visible).toBe("35 € / person");

  const trip = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((nodes) => {
      const parsed = nodes.map((n) => JSON.parse(n.textContent || "{}"));
      return parsed.find((d) => d["@type"] === "TouristTrip");
    });
  expect(trip?.offers?.price).toBe(35);
  expect(trip?.duration).toBe("PT6H");

  // Transfers must not invent a duration.
  await page.goto("/en/agadir-airport-transfer-to-agadir-hotels");
  const transferTrip = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((nodes) => {
      const parsed = nodes.map((n) => JSON.parse(n.textContent || "{}"));
      return parsed.find((d) => d["@type"] === "TouristTrip");
    });
  expect(transferTrip).toBeTruthy();
  expect("duration" in (transferTrip ?? {})).toBe(false);
});

test("/book is noindex and excluded from crawling", async ({ page, request }) => {
  await page.goto("/en/book");
  await expect(page.locator("h1")).toHaveCount(1);
  const robots = page.locator('meta[name="robots"]');
  await expect(robots).toHaveCount(1);
  await expect(robots).toHaveAttribute("content", /noindex/);

  const robotsTxt = await (await request.get("/robots.txt")).text();
  expect(robotsTxt).toContain("/book");
  expect(robotsTxt).toContain("/sitemap.xml");
});
