# SEO Content Fixes (D5, D6, D9) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the three remaining review findings by aligning the transfer cancellation policy to 12 h, removing the duplicated brand from the `/book` title, and replacing the build-time sitemap `lastmod` with real dates.

**Architecture:** All three are content/config/source edits. Two messages JSON files and one route file change; regressions are pinned by one Vitest file (fast, offline) plus three Playwright assertions in the existing SEO suite. No schema or dependency changes.

**Tech Stack:** Next.js 16 (App Router, `MetadataRoute.Sitemap`), next-intl (EN/FR messages), Vitest, Playwright.

**Spec:** [reports/2026-10-02-review-findings.md](../reports/2026-10-02-review-findings.md) (findings D5, D6, D9).

## Global Constraints

- Add/keep the key in **both** locales — `messages/en.json` and `messages/fr.json` change together.
- The **12 h** transfer window is fixed by `data/source/services-report.md` §3.6 ("Free until 12 h before pickup"). Do not invent a third value.
- No content-schema change, no new dependency, no re-theme (AGENTS.md "Ask first").
- Keep the tree green: `lint -> typecheck -> test -> build`; add `test:e2e` because metadata and sitemap behaviour changes.
- Sitemap: real dates only — guide URLs use the guide's own `date`; every other URL omits `lastModified`. No build-time stamp returns.
- Do not weaken or delete an existing assertion.

## Review Focus

- A URL with no real date silently inherits a build timestamp again — pinned by asserting non-guide entries have **no** `lastModified`.
- FR copy drifts from an EN-only edit (the D5 class of bug) — pinned by the messages test that checks both files.
- A translator re-adds the brand to `/book`'s `metaTitle` — pinned by the exact rendered-title assertion.
- A malformed guide `date` makes `new Date(guide.date)` an Invalid Date in the sitemap — pinned by asserting the guide's lastmod equals the source date.
- Removing `lastModified` breaks the sitemap shape / XML — pinned by the existing sitemap-length test and a lastmod-presence scan.

---

### Task 1: Align the transfer cancellation policy to 12 hours (D5)

**Files:**
- Modify: `messages/en.json:115`
- Modify: `messages/fr.json:115`
- Test: `src/i18n/messages.test.ts` (create)

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `messages.test.ts` with reusable `messages(locale)` and `hoursIn(text)` helpers (local to the file; later tasks add cases here).

- [ ] **Step 1: Write the failing test**

```ts
// src/i18n/messages.test.ts
import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

type Messages = {
  product: { transferCancellation: string };
  faq: { items: { q: string; a: string }[] };
};

function messages(locale: "en" | "fr"): Messages {
  return JSON.parse(
    readFileSync(new URL(`../../messages/${locale}.json`, import.meta.url), "utf8"),
  );
}

function hoursIn(text: string): number {
  const match = text.match(/(\d+)\s*(hours?|heures?)/i);
  if (!match) throw new Error(`no hour count in: ${text}`);
  return Number(match[1]);
}

describe("transfer cancellation policy", () => {
  it.each(["en", "fr"] as const)("%s states one window, matching the FAQ", (locale) => {
    const data = messages(locale);
    const faq = data.faq.items.find((item) => /transfer/i.test(item.a));
    expect(faq, `${locale} FAQ has a transfer cancellation answer`).toBeDefined();
    const productHours = hoursIn(data.product.transferCancellation);
    expect(productHours, `${locale} product policy`).toBe(12);
    expect(hoursIn(faq!.a), `${locale} FAQ policy`).toBe(productHours);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node_modules/.bin/vitest run src/i18n/messages.test.ts`
Expected: FAIL — `en product policy expected 12 but got 2` (and the same for `fr`).

- [ ] **Step 3: Edit the two message strings**

`messages/en.json:115`: `"transferCancellation": "Free cancellation up to 12 hours before scheduled pickup."`
`messages/fr.json:115`: `"transferCancellation": "Annulation sans frais jusqu'à 12 heures avant l'heure convenue."`

- [ ] **Step 4: Run the test to verify it passes**

Run: `node_modules/.bin/vitest run src/i18n/messages.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add messages/en.json messages/fr.json src/i18n/messages.test.ts
git commit -m "fix(content): align the transfer cancellation window to 12 hours"
```

---

### Task 2: Stop the `/book` title double-branding (D6)

**Files:**
- Modify: `messages/en.json:177`
- Modify: `messages/fr.json:177`
- Test: `tests/e2e/seo.spec.ts` (add a test)

**Interfaces:**
- Consumes: the layout title template `%s | Agadir Tourisme` (`src/app/[locale]/layout.tsx:27`) — unchanged.
- Produces: nothing later tasks depend on.

- [ ] **Step 1: Write the failing test**

Append to `tests/e2e/seo.spec.ts`:

```ts
test("/book title carries the brand exactly once", async ({ page }) => {
  await page.goto("/en/book");
  await expect(page).toHaveTitle("Book a Tour or Private Transfer | Agadir Tourisme");
  await page.goto("/fr/book");
  await expect(page).toHaveTitle("Réserver une excursion ou un transfert | Agadir Tourisme");
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `SKIP_ENV_VALIDATION=true NEXT_PUBLIC_SITE_URL=http://localhost:3100 node_modules/.bin/next build && PLAYWRIGHT_BASE_URL=http://localhost:3100 node_modules/.bin/playwright test tests/e2e/seo.spec.ts -g "brand exactly once"`
Expected: FAIL — title is `Book a Tour or Private Transfer | Agadir Tourisme | Agadir Tourisme`.

- [ ] **Step 3: Drop the brand from the two `book.metaTitle` strings**

`messages/en.json:177`: `"metaTitle": "Book a Tour or Private Transfer"`
`messages/fr.json:177`: `"metaTitle": "Réserver une excursion ou un transfert"`
(The layout template appends `| Agadir Tourisme`.)

- [ ] **Step 4: Rebuild and run to verify it passes**

Run: `SKIP_ENV_VALIDATION=true NEXT_PUBLIC_SITE_URL=http://localhost:3100 node_modules/.bin/next build && PLAYWRIGHT_BASE_URL=http://localhost:3100 node_modules/.bin/playwright test tests/e2e/seo.spec.ts -g "brand exactly once"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add messages/en.json messages/fr.json tests/e2e/seo.spec.ts
git commit -m "fix(seo): render the /book title with a single brand"
```

---

### Task 3: Derive sitemap `lastModified` from real dates (D9)

**Files:**
- Modify: `src/app/sitemap.ts`
- Test: `src/app/sitemap.test.ts` (create)
- Modify: `tests/e2e/seo.spec.ts` (add a lastmod scan)

**Interfaces:**
- Consumes: `guides` from `@/content/guides` (each has `date: string`, ISO) — already imported by the sitemap.
- Produces: unchanged `sitemap()` signature (default export, no params, returns `MetadataRoute.Sitemap`). Guide entries now carry `lastModified: new Date(guide.date)`; all other entries have no `lastModified`.

- [ ] **Step 1: Write the failing unit test**

```ts
// src/app/sitemap.test.ts
import { describe, expect, it } from "vitest";

import { guides } from "@/content/guides";

import sitemap from "./sitemap";

describe("sitemap lastModified", () => {
  const entries = sitemap();

  it("dates guide URLs from the guide's own date", () => {
    for (const guide of guides) {
      for (const slug of [guide.slug.en, guide.slug.fr]) {
        const entry = entries.find((e) => e.url.endsWith(`/guides/${slug}`));
        expect(entry, `entry for ${slug}`).toBeDefined();
        expect(new Date(entry!.lastModified!).toISOString()).toBe(
          new Date(guide.date).toISOString(),
        );
      }
    }
  });

  it("omits lastModified where no real date exists", () => {
    for (const entry of entries) {
      if (entry.url.includes("/guides/")) continue;
      expect(entry.lastModified, `${entry.url} must not claim a build date`).toBeUndefined();
    }
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node_modules/.bin/vitest run src/app/sitemap.test.ts`
Expected: FAIL — the first test's guide entry `lastModified` is the build time, not the guide date; the second fails because every non-guide entry currently has one.

- [ ] **Step 3: Update `src/app/sitemap.ts`**

- Delete `const lastModified = new Date();`.
- Remove the `lastModified,` line from every `entries.push(...)` **except** the per-guide loop, where the entry becomes:

```ts
entries.push({
  url: guideEn,
  lastModified: new Date(guide.date),
  changeFrequency: "monthly",
  priority: 0.6,
  alternates: alternates(guideEn, guideFr),
});
```

Apply the same `lastModified: new Date(guide.date)` to the `guideFr` entry.

- [ ] **Step 4: Run the unit test to verify it passes**

Run: `node_modules/.bin/vitest run src/app/sitemap.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 5: Add the E2E lastmod scan**

Append to `tests/e2e/seo.spec.ts`:

```ts
test("sitemap lastmod is present only where a real date exists", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const blocks = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  expect(blocks.length).toBeGreaterThan(0);
  for (const block of blocks) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? "";
    expect(/<lastmod>/.test(block), `${loc} lastmod`).toBe(loc.includes("/guides/"));
  }
});
```

- [ ] **Step 6: Commit**

```bash
git add src/app/sitemap.ts src/app/sitemap.test.ts tests/e2e/seo.spec.ts
git commit -m "fix(seo): derive sitemap lastmod from real content dates"
```

---

### Task 4: Full gate, E2E proof, and correct the record

**Files:**
- Modify: `reports/2026-10-02-review-findings.md` (status + limitation note)

**Interfaces:**
- Consumes: all prior tasks.
- Produces: a green tree and an accurate review record.

- [ ] **Step 1: Run the fast gates**

```bash
node_modules/.bin/eslint .
node_modules/.bin/tsc --noEmit
node_modules/.bin/vitest run
node scripts/validate-data.mjs
node scripts/check-docs.mjs
```
Expected: all exit 0; unit count increases by 4 tests (2 messages + 2 sitemap).

- [ ] **Step 2: Build and run the full E2E suite headlessly on a fresh server**

```bash
SKIP_ENV_VALIDATION=true NEXT_PUBLIC_SITE_URL=http://localhost:3100 node_modules/.bin/next build
SKIP_ENV_VALIDATION=true NEXT_PUBLIC_SITE_URL=http://localhost:3100 node_modules/.bin/next start -p 3100 &
PLAYWRIGHT_BASE_URL=http://localhost:3100 node_modules/.bin/playwright test
```
Expected: PASS, all tests including the three new assertions. This run **disproves** the "Playwright could not run headlessly (missing browser)" limitation: `~/AppData/Local/ms-playwright/chromium_headless_shell-1243` is present and `chromium.launch({ headless: true })` succeeds. Record that the earlier claim was wrong rather than a real limitation.

- [ ] **Step 3: Update the review report**

In `reports/2026-10-02-review-findings.md`: move D5, D6 and D9 to the fixed list in the Status update; correct the D9 entry to note the `docs/testing.md` "localized home page" line was already removed in `9ec2322` and only the sitemap stamp remained; and replace the "Playwright could not be executed headlessly" limitation with the verified result (suite runs headlessly here).

- [ ] **Step 4: Commit**

```bash
git add reports/2026-10-02-review-findings.md
git commit -m "docs(review): close D5, D6 and D9 and correct the E2E limitation note"
```

---

## Self-Review

- **Spec coverage:** D5 -> Task 1; D6 -> Task 2; D9 (sitemap) -> Task 3; D9 (docs) -> already fixed in `9ec2322`, recorded in Task 4; the Playwright limitation -> verified in Task 4. No gaps.
- **Step scan:** each step yields one action; no undefined functions or filler.
- **Type consistency:** `sitemap()` signature unchanged; `lastModified` stays `Date | string | undefined` per `MetadataRoute.Sitemap`; guide `date` is `string`.
- **Review Focus:** each line has a test in the owning task.
- **Proportion:** three small edits, two test files touched, one route file — proportional to the three findings.
