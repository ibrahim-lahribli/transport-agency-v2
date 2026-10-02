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

test("metadata routes are served without a locale redirect", async ({ request }) => {
  // `/icon` sits at the app root and the share image inside the locale segment;
  // neither may be 307-redirected by the intl middleware, which would leave the
  // favicon and the Open Graph image unreachable to crawlers.
  for (const path of ["/icon", "/en/opengraph-image", "/fr/opengraph-image"]) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status(), `${path} status`).toBe(200);
    expect(response.headers()["content-type"], `${path} content-type`).toContain("image/");
  }
});

test("pages ship a shareable Open Graph and Twitter image that resolves", async ({
  page,
  request,
}) => {
  await page.goto("/en");

  const ogImage = page.locator('meta[property="og:image"]');
  await expect(ogImage, "og:image count").toHaveCount(1);
  const ogUrl = await ogImage.getAttribute("content");
  expect(ogUrl, "og:image is an absolute URL").toMatch(/^https?:\/\//);

  const response = await request.get(new URL(ogUrl as string).pathname, { maxRedirects: 0 });
  expect(response.status(), "og:image resolves").toBe(200);
  expect(response.headers()["content-type"], "og:image content-type").toContain("image/");

  await expect(page.locator('meta[name="twitter:image"]'), "twitter:image count").toHaveCount(1);
});

test("French product pages ship translated body copy", async ({ page }) => {
  // The English and French slugs are deliberately different, so pair them up.
  const pairs = [
    ["/en/paradise-valley-day-trip-from-agadir", "/fr/excursion-vallee-du-paradis-depuis-agadir"],
    ["/en/marrakech-day-trip-from-agadir", "/fr/excursion-marrakech-depuis-agadir"],
  ];

  for (const [enPath, frPath] of pairs) {
    await page.goto(enPath);
    const english = await page.getByTestId("restrictions-text").innerText();

    await page.goto(frPath);
    const french = await page.getByTestId("restrictions-text").innerText();

    expect(french, `${frPath}: restrictions must not be the English text`).not.toBe(english);
    expect(french, `${frPath}: restrictions must read as French`).toMatch(/[àâçéèêëîïôûùüœ]/i);
    await expect(page.locator("body"), `${frPath}: no editorial draft marker`).not.toContainText(
      "Draft for native review",
    );
    // The itinerary is the other field that shipped English; compare it too.
    const frenchItinerary = await page.locator("ol li p").allInnerTexts();
    expect(frenchItinerary.join(" "), `${frPath}: itinerary must read as French`).toMatch(
      /[àâçéèêëîïôûùüœ]/i,
    );
  }
});

test("restrictions render once-punctuated, in both locales", async ({ page }) => {
  for (const path of [
    "/en/paradise-valley-day-trip-from-agadir",
    "/fr/excursion-vallee-du-paradis-depuis-agadir",
  ]) {
    await page.goto(path);
    const text = await page.getByTestId("restrictions-text").innerText();
    expect(text.length, `${path} restrictions rendered`).toBeGreaterThan(0);
    expect(text, `${path} restrictions punctuation`).not.toContain("..");
  }
});
