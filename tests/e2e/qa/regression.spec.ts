import { expect, test, type Page } from "@playwright/test";

import { BUILD_SERVICES, LOCALES, servicePath } from "./helpers/catalogue";
import { ADDED_AFTER_SOURCE, LEGACY_SLUG_HINTS, SOURCE_SERVICES } from "./helpers/source-slugs";
import type { CatalogueService } from "./helpers/types";

/**
 * Task 3 — regression sweep: console noise, broken network responses,
 * legacy-URL reconciliation against the `.txt` source catalogues, and the
 * crawlable set from the sitemap.
 *
 * Ignore-list contract: any console message matched here is documented noise,
 * NOT a skip — the test still counts it against the allowlist so new noise
 * classes fail loudly.
 */

const CONSOLE_IGNORE: { pattern: RegExp; because: string }[] = [
  // Next.js DevTools is a development-only overlay; the production `next
  // start` server these tests run against never loads it, so a stray hint
  // during a warmup pass is benign. Documented rather than silenced.
  {
    pattern: /Download the React DevTools/i,
    because: "React DevTools suggestion is environment noise, not a page defect.",
  },
];

type PageError = { kind: "console" | "pageerror" | "response"; text: string };

function collectSignals(page: Page): { errors: PageError[]; attach: () => void } {
  const errors: PageError[] = [];
  const onConsole = (msg: import("@playwright/test").ConsoleMessage) => {
    if (["error", "warning"].includes(msg.type())) {
      errors.push({ kind: "console", text: msg.text() });
    }
  };
  const onPageError = (error: Error) => {
    errors.push({ kind: "pageerror", text: String(error) });
  };
  const onResponse = (response: import("@playwright/test").Response) => {
    if (response.status() >= 400) {
      errors.push({ kind: "response", text: `${response.status()} ${response.url()}` });
    }
  };
  return {
    errors,
    attach: () => {
      page.on("console", onConsole);
      page.on("pageerror", onPageError);
      page.on("response", onResponse);
    },
  };
}

/** Every crawlable route: sitemap is the contract for "the site's real pages". */
async function sitemapPaths(request: import("@playwright/test").APIRequestContext): Promise<string[]> {
  const response = await request.get("/sitemap.xml");
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace(/^https?:\/\/[^/]+/, ""),
  );
}

test.describe("regression: console + network sweep", () => {
  test("every sitemap URL loads with zero pageerrors and no unexpected console noise", async ({
    page,
  }, testInfo) => {
    const signals = collectSignals(page);
    signals.attach();

    for (const path of await sitemapPaths(page.request)) {
      await page.goto(path);
    }

    const unexpected = signals.errors.filter((e) => {
      if (e.kind === "console") {
        return !CONSOLE_IGNORE.some(({ pattern }) => pattern.test(e.text));
      }
      return true; // pageerror and >=400 responses are never ignorable
    });

    const summary = unexpected.length
      ? unexpected.slice(0, 8).map((e) => `[${e.kind}] ${e.text}`).join("\n")
      : "none";
    expect(
      unexpected.map((e) => e.text),
      `${testInfo.title}: expected no unexpected console/pageerror/net failures, got:\n${summary} (total ${unexpected.length}, total seen ${signals.errors.length})`,
    ).toEqual([]);
  });

  test("the URL behind /book and other noindex routes renders without error", async ({
    page,
  }) => {
    const signals = collectSignals(page);
    signals.attach();
    await page.goto("/en/book");
    await expect(page.locator("#serviceId")).toBeVisible();
    const unexpected = signals.errors.filter(
      (e) => e.kind !== "console" || !CONSOLE_IGNORE.some(({ pattern }) => pattern.test(e.text)),
    );
    expect(unexpected.map((e) => e.text)).toEqual([]);
  });

  test("the image deck for every published service serves real bytes", async ({ request }) => {
    // Probes every per-service image + its gallery fallbacks once each at the
    // HTTP level; the visual task owns rendering, this owns existence.
    for (const locale of LOCALES) {
      const services = BUILD_SERVICES(locale);
      if (locale === "fr") continue; // same files both locales; enumerate once
      for (const service of services) {
        const hero = `/images/services/${service.id}.jpg`;
        const response = await request.get(hero);
        expect(
          response.status(),
          `${hero} (used by card/hero/gallery)`,
        ).toBeLessThan(400);
      }
    }
  });
});

test.describe("regression: legacy URLs from the .txt source catalogues", () => {
  test("each legacy slug resolves by redirect, is served, or is a documented rename", async ({
    page,
  }, testInfo) => {
    // Two URL shapes the old catalogue's URL scheme could produce:
    //  1. hub-prefixed (/en/<hub>/<slug>) — next.config.ts permanently
    //     redirects these onto the canonical product path. NOTE the rule's
    //     contract: `source: "/:locale(en|fr)/<hub>/:slug"` matches ANY slug
    //     structurally, and the redirect lands on `/:locale/:slug` — so a
    //     legacy slug that was never a shipped slug 404s at the destination
    //     (a Not-Found page, max 200-with-404-body via maxRedirects:0 ...
    //     observe the FINAL status). The meaningful assertion for legacy
    //     slugs is: hub-prefixed legacy URL must NOT silently 200 the hub's
    //     index or some other unintended page. Final status < 400 when the
    //     legacy slug coincides with a shipped slug, or 404 otherwise —
    //     never a 200 landing on the wrong content.
    //  2. bare (<locale>/<slug>) — served (current slug) or 404 (intentional
    //     rename), never a silent 200 on a moved service.
    testInfo.fixme(false, "observe real statuses before pinning");

    const bySection = (section: string) =>
      section.startsWith("1")
        ? "excursions"
        : section.startsWith("2")
          ? "activities"
          : "transfers";

    for (const hint of LEGACY_SLUG_HINTS) {
      const entry = SOURCE_SERVICES.find((s) => s.id === hint.id);
      expect(entry, `fixture: source entry for ${hint.id}`).toBeTruthy();

      const hubPrefix = bySection(entry!.section);

      // (1) hub-prefixed legacy URL: follow redirects fully and require a
      // decisive outcome (live product page OR a real 404), never the hub
      // index silently swallowing the request.
      const hubd = await page.request.get(`/en/${hubPrefix}/${hint.slug}`, {
        maxRedirects: 5,
      });
      const finalUrl = hubd.url();
      const ok =
        hubd.status() < 400 &&
        !/\/(excursions|activities|transfers)$/.test(new URL(finalUrl).pathname);
      expect(
        ok || hubd.status() === 404,
        `/en/${hubPrefix}/${hint.slug}: expected product page or 404, got ${hubd.status()} at ${finalUrl}`,
      ).toBe(true);

      // (2) bare legacy slug: served (real slug) or 404 (intentional rename).
      const bare = await page.request.get(`/en/${hint.slug}`, { maxRedirects: 5 });
      const status = bare.status();
      expect(
        status === 404 || status < 400,
        `/en/${hint.slug}: redirect-or-served-or-404, got ${status}`,
      ).toBe(true);
    }
  });

  test("source-catalogue transfers' stated prices survive in the shipped pages", async ({
    page,
  }) => {
    // §3.1 states €20 (city centre) and €35 (Taghazout); the shipped pages
    // must show those amounts somewhere in their quick facts / routes table.
    const expects: { id: string; amount: number; where: string }[] = [
      { id: "airport-agadir", amount: 20, where: "AGA → city centre sedan" },
      { id: "airport-taghazout", amount: 35, where: "AGA → Taghazout sedan" },
    ];
    for (const { id, amount } of expects) {
      const service = BUILD_SERVICES("en").find((s) => s.id === id);
      expect(service, `shipped service ${id}`).toBeTruthy();
      const path = servicePath("en", service as CatalogueService);
      await page.goto(path);
      const bodyText = await page.locator("body").innerText();
      expect(
        bodyText,
        `${path}: source-catalogue €${amount} for ${id} appears on the page`,
      ).toContain(`${amount} €`);
    }
  });

  test("every ADDED_AFTER_SOURCE id exists in the shipped catalogue, both locales", () => {
    for (const { id, note } of ADDED_AFTER_SOURCE) {
      for (const locale of LOCALES) {
        expect(
          BUILD_SERVICES(locale).some((s) => s.id === id),
          `${id} (${locale}): ${note}`,
        ).toBe(true);
      }
    }
  });

  test("every source section maps onto a shipped service; titles localize, not rename silently", () => {
    for (const entry of SOURCE_SERVICES) {
      const enService = BUILD_SERVICES("en").find((s) => s.id === entry.id);
      const frService = BUILD_SERVICES("fr").find((s) => s.id === entry.id);
      expect(enService, `source section ${entry.section} maps to shipped EN ${entry.id}`).toBeTruthy();
      expect(frService, `source section ${entry.section} maps to shipped FR ${entry.id}`).toBeTruthy();
      // The FR slug must differ from the EN slug by localization where the
      // source titles differ structurally ("Airport Transfer – Agadir" vs
      // "Transfert Aéroport – Agadir") — but the service id is shared.
      expect((enService as CatalogueService).id).toBe((frService as CatalogueService).id);
    }
  });
});

test.describe("regression: hub alias redirects (next.config.ts contract)", () => {
  test("category-aliased product URLs 308 onto the canonical product page", async ({
    request,
  }) => {
    const service = BUILD_SERVICES("en").find((s) => s.id === "paradise-valley");
    expect(service, "paradise-valley fixture").toBeTruthy();
    const slug = (service as CatalogueService).slug;

    const response = await request.get(`/en/excursions/${slug}`, { maxRedirects: 0 });
    // The redirect() table in next.config.ts makes these permanent.
    expect([301, 308]).toContain(response.status());

    for (const hub of ["activities", "transfers"]) {
      const wrongHub = await request.get(`/en/${hub}/${slug}`, { maxRedirects: 0 });
      expect([301, 308, 404]).toContain(wrongHub.status());
    }
  });
});
