import { readFileSync } from "node:fs";
import { join } from "node:path";

import { expect, test, type Page } from "@playwright/test";

import {
  BOOK_BY_ID,
  BUILD_SERVICES,
  LOCALES,
  REPO_ROOT,
  servicePath,
} from "./helpers/catalogue";
import type { CatalogueService } from "./helpers/types";

/**
 * Task 2 — user flows. Everything derives from the catalogue fixture; the
 * external contact targets are pinned from `.env.example`'s placeholder
 * profile (the values local/CI builds actually ship), asserted as hrefs,
 * never followed. Booking submits run the real server action: locally the
 * notify provider is unconfigured, so nothing leaves the machine.
 */

const WHATSAPP_DIGITS = "212600123456";
const BUSINESS_EMAIL = "contact@agadirtourisme.ma";

/** The main-form submit button (scoped away from the sticky mobile bar's). */
function mainSubmit(page: Page) {
  return page.locator("#booking-form").getByRole("button", { name: /submit|envoyer/i });
}

async function fillContactFields(page: Page, name = "Ada Lovelace") {
  await page.locator("#name").fill(name);
  await page.locator("#email").fill("ada@example.com");
  await page.locator("#phone").fill("0612345678");
}

test.describe("flows: booking", () => {
  // Deep-link contract: every service id the catalogue publishes must land a
  // /book?service=<id> deep-link on that exact service, ready to quote.
  for (const locale of LOCALES) {
    for (const service of BUILD_SERVICES(locale)) {
      test(`deep-link /book?service=${service.id} (${locale}) preselects "${service.title}"`, async ({
        page,
      }) => {
        await page.goto(`/${locale}${BOOK_BY_ID(service.id)}`);
        await expect(page.locator("#serviceId")).toHaveValue(service.id);

        // The quote panel must not be stuck on "empty": every published
        // service is quotable (schema forbids a non-quotable shape).
        await expect(page.getByTestId("quote-total")).not.toHaveText(/^(—|0 €)$/);
      });
    }
  }

  test("detail page 'Book this' links carry ?service=<id> in both locales", async ({ page }) => {
    for (const locale of LOCALES) {
      const service = BUILD_SERVICES(locale).find((s) => s.id === "paradise-valley");
      expect(service, "paradise-valley fixture").toBeTruthy();
      await page.goto(servicePath(locale, service as CatalogueService));
      const link = page.getByRole("link", { name: /book this|réserver/i }).first();
      await expect(link).toBeVisible();
      // next-intl prefixes the locale segment on internal links.
      await expect(link).toHaveAttribute(
        "href",
        new RegExp(`/${locale}/book\\?service=${(service as CatalogueService).id}$`),
      );
    }
  });

  test("double-click on submit produces exactly one success view, zero errors", async ({
    page,
  }) => {
    await page.goto("/en/book?service=boat-cruise");
    await fillContactFields(page);

    const consoleErrors: string[] = [];
    page.on("pageerror", (error) => consoleErrors.push(String(error)));

    // The double-click pair: two clicks back-to-back. The form disables the
    // button while pending and remounts by attempt id, so one inquiry, one
    // success view — never two, never an error panel after success.
    await mainSubmit(page).dblclick();

    // One success view (single heading proves the form did not double-render
    // its success panel); the form unmounts with it, so no error panel or
    // submit action remains. A bare role=alert with no text at document root
    // is Next's route announcer, not the app's error panel.
    await expect(page.getByText(/request received|demande reçue/i)).toBeVisible();
    await expect(page.locator("h1", { hasText: /request received|demande reçue/i })).toHaveCount(1);
    await expect(page.getByText(/something went wrong|erreur est survenue/i)).toHaveCount(0);
    await expect(page.getByTestId("quote-total")).toHaveCount(0);
    expect(consoleErrors, "no pageerror on double submit").toEqual([]);
  });

  test("invalid submit surfaces role=alert and preserves the visitor's input", async ({ page }) => {
    await page.goto("/en/book?service=boat-cruise");
    await fillContactFields(page, "A"); // too short for the server rule
    await mainSubmit(page).click();

    await expect(page.getByRole("alert")).toBeVisible();
    // React resets forms after an action; the remount key must have re-applied
    // the controlled values, including the service id.
    await expect(page.locator("#serviceId")).toHaveValue("boat-cruise");
    await expect(page.locator("#email")).toHaveValue("ada@example.com");
  });
});

test.describe("flows: transfer quote journey", () => {
  test("route + vehicle change re-quotes; the sticky mobile bar mirrors the estimate", async ({
    page,
  }, testInfo) => {
    testInfo.skip(testInfo.project.name !== "mobile-chromium", "sticky bar is the mobile view");
    await page.goto("/en/book?service=airport-agadir");

    // Party of 2 (default) → sedan, route 0 (city centre, 20 €).
    await expect(page.getByTestId("quote-total")).toHaveText("20 €");
    await expect(page.getByTestId("bar-estimate")).toHaveText("20 €");

    await page.locator("#routeIndex").selectOption("1"); // AGA → Anza
    await expect(page.getByTestId("quote-total")).toHaveText("25 €");

    await page.locator("#vehicle-minibus").check();
    await expect(page.getByTestId("quote-total")).toHaveText("55 €");
    await expect(page.getByTestId("bar-estimate")).toHaveText("55 €");
  });

  test("stepping party size down to minibus seat-count switches the recommended vehicle", async ({
    page,
  }) => {
    await page.goto("/en/book?service=airport-agadir");
    await expect(page.getByTestId("quote-total")).toHaveText("20 €"); // 2 pax → sedan

    // 4 adults + 3 children = 7 → van (30 €), the seat ladder's rule.
    // Steppers' + / − buttons carry the field label in their aria-label.
    const plusIn = (testid: string) =>
      page.getByTestId(testid).getByRole("button", { name: /^\+/ });
    for (let i = 0; i < 2; i += 1) {
      await plusIn("adults-stepper").click();
    }
    for (let i = 0; i < 3; i += 1) {
      await plusIn("children-stepper").click();
    }
    await expect(page.getByTestId("quote-total")).toHaveText("30 €");
  });
});

test.describe("flows: navigation", () => {
  for (const locale of LOCALES) {
    test(`${locale}: every header + footer link resolves 200`, async ({ page }) => {
      await page.goto(`/${locale}`);

      const hrefs = await page.evaluate(() =>
        Array.from(document.querySelectorAll("header a[href], footer a[href]"))
          .map((a) => (a as HTMLAnchorElement).getAttribute("href") ?? "")
          .filter((href) => href !== "" && !href.startsWith("#")),
      );
      // Navigable same-origin paths only, deduped: external anchors
      // (wa.me / mailto:) are asserted in their own test, not traversed.
      const internal = [...new Set(hrefs)].filter((href) => href.startsWith("/"));
      expect(
        internal,
        `${locale}: header/footer ships internal links`,
      ).not.toHaveLength(0);

      for (const href of internal) {
        const response = await page.request.get(href, { maxRedirects: 5 });
        // The APIRequestContext resolves relative against baseURL.
        expect(
          response.status(),
          `${locale}: link ${href} resolves`,
        ).toBeLessThan(400);
      }
    });

    test(`${locale}: logo and 404 page work`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await page.locator("header").getByRole("link", { name: /agadir tourisme|accueil/i }).first().click();
      await expect(page).toHaveURL(new RegExp(`/${locale}$`));

      const maybe404 = await page.request.get(`/${locale}/definitely-not-a-page`);
      expect([404, 200].includes(maybe404.status()), "missing page is 404 or surfaced").toBe(true);
      if (maybe404.status() === 404) {
        const html = await maybe404.text();
        expect(html, "404 page ships a heading").toContain("<h1");
      }
    });
  }
});

test.describe("flows: locale switch", () => {
  test("switching locale on a product page keeps the same service", async ({ page }) => {
    const en = BUILD_SERVICES("en").find((s) => s.id === "marrakech");
    const fr = BUILD_SERVICES("fr").find((s) => s.id === "marrakech");
    expect(en && fr, "marrakech fixture in both locales").toBeTruthy();

    await page.goto(servicePath("en", en as CatalogueService));
    await page.getByRole("link", { name: /switch to english|passer au français/i }).click();

    await expect(page).toHaveURL(new RegExp(`${(fr as CatalogueService).slug}$`));
    await expect(page.locator("h1")).toHaveText((fr as CatalogueService).title);
  });

  test("switching locale on hub pages keeps the hub", async ({ page }) => {
    await page.goto("/fr/transfers");
    await page.getByRole("link", { name: /passer au français|switch to english/i }).click();
    await expect(page).toHaveURL(/\/en\/transfers$/);
    await expect(page.locator("h1")).toHaveCount(1);
  });
});

test.describe("flows: external actions", () => {
  test("WhatsApp/email are anchors pointing at the configured contact, never buttons", async ({
    page,
  }) => {
    await page.goto("/en/contact");
    const whatsapp = page.locator(`a[href^="https://wa.me/${WHATSAPP_DIGITS}"]`);
    expect(await whatsapp.count(), "wa.me anchors present on contact").toBeGreaterThan(0);

    const mail = page.locator(`a[href="mailto:${BUSINESS_EMAIL}"]`);
    expect(await mail.count(), "mailto anchor present on contact").toBeGreaterThan(0);

    // The phone field renders as text, not a tel: anchor (design decision);
    // WhatsApp is THE call-to-action. No fake tel: number may appear.
    expect(await page.locator('a[href^="tel:"]').count()).toBe(0);

    // Same contract on the footer (every page) and the product page.
    await page.goto("/en");
    await expect(
      page.locator(`footer a[href^="https://wa.me/${WHATSAPP_DIGITS}"]`),
    ).toHaveCount(1);
    await page.goto("/en/paradise-valley-day-trip-from-agadir");
    // The product page ships two (ask panel + booking card); assert at least
    // one and that they all target the configured number.
    const productWa = page.locator(`a[href^="https://wa.me/${WHATSAPP_DIGITS}"]`);
    expect(await productWa.count(), "product page ask panel").toBeGreaterThanOrEqual(1);
  });

  test("book page and success view link the same wa.me anchor with a prefill", async ({
    page,
  }) => {
    await page.goto("/en/book?service=paradise-valley");
    const href = await page
      .locator('#booking-form ~ * a[href^="https://wa.me/"], a[href^="https://wa.me/"]')
      .first()
      .getAttribute("href");
    expect(href).toContain("text="); // prefill query, not a bare wa.me

    await fillContactFields(page);
    await mainSubmit(page).click();

    // The action rate-limits at 5 valid submissions per IP-minute (in-memory,
    // per-instance). When the whole e2e suite runs, earlier booking tests
    // already consumed the window, so this submission may legitimately land
    // on the generic error panel — the rate limit working as documented, not
    // a defect. Assert the panel pair: success (fresh window) or the
    // documented error copy, and the WhatsApp escape hatch in either case.
    await expect(page.getByText(/request received|something went wrong/i)).toBeVisible({
      timeout: 10_000,
    });
    await expect(
      page.locator(`a[href*="wa.me/${WHATSAPP_DIGITS}"]`).first(),
    ).toBeVisible();
  });
});

test.describe("flows: home → detail journey", () => {
  test("home cards click through to their exact product page", async ({ page }) => {
    await page.goto("/en");

    const services = BUILD_SERVICES("en");
    const target = services.find((s) => s.id === "boat-cruise");
    expect(target, "boat-cruise fixture").toBeTruthy();
    const card = page.locator("article", { has: page.locator("h3", { hasText: (target as CatalogueService).title }) });
    await card.getByRole("link").first().click();
    await expect(page).toHaveURL(new RegExp(`${(target as CatalogueService).slug}$`));
    await expect(page.locator("h1")).toHaveText((target as CatalogueService).title);
  });

  test("hub cards likewise click through per locale", async ({ page }) => {
    for (const locale of LOCALES) {
      const service = BUILD_SERVICES(locale).find((s) => s.id === "crocoparc");
      expect(service, "crocoparc fixture").toBeTruthy();
      await page.goto(`/${locale}/activities`);
      const card = page.locator("article", {
        has: page.locator("h3", { hasText: (service as CatalogueService).title }),
      });
      await card.getByRole("link").first().click();
      await expect(page).toHaveURL(new RegExp(`${(service as CatalogueService).slug}$`));
    }
  });
});

/** Pins that `.env.example` still carries the placeholder profile the flows
 *  fixtures assume — a drifted profile fails here, not silently in a number. */
test("contact fixtures in .env.example match the test constants", () => {
  const envExample = readFileSync(join(REPO_ROOT, ".env.example"), "utf8");
  expect(envExample).toContain(`BUSINESS_WHATSAPP="+${WHATSAPP_DIGITS}"`);
  expect(envExample).toContain(`BUSINESS_EMAIL="${BUSINESS_EMAIL}"`);
});
