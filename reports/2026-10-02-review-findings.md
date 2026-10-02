# Review findings — SEO travel booking site

**Date:** 2026-10-02
**Scope:** the uncommitted session work on thread `f4d27aa3` ("SEO-Optimized Travel
Booking Website Architecture") — the full static, SEO-first rebuild of the Agadir
travel agency site.
**Method:** adversarial code review (trace paths, run the real checks, drive the live
page) plus a functional test pass, a frontend-design review and a visual end-to-end
test against the production server.
**Environment:** Node 24, Next.js 16.3.8, production build served on `:3100`,
`SKIP_ENV_VALIDATION=true` (the local/CI escape hatch for the business-config guard).

This document records the state of the work as reviewed.

## Status update

- **D1, D2, D3 — fixed** in `e8ce860` ("fix(seo): ship a resolvable share card
  and clean product punctuation"), with E2E assertions added.
- **D4 — fixed.** Every French catalogue field is translated, the draft marker is
  gone, `validateTranslation` now fails the build on English-in-a-French-field or
  a shipped editorial marker, and an E2E test proves FR copy is not the EN text.
- **D5–D9 — still open.** See §2 and §6.

The defect descriptions below are kept as written at review time.

---

## 1. Gates

Every documented gate passes on the reviewed work.

| Gate          | Command                     | Result                                       |
| ------------- | --------------------------- | -------------------------------------------- |
| Typecheck     | `node_modules/.bin/tsc --noEmit` | exit 0                                   |
| Lint          | `node_modules/.bin/eslint .`     | exit 0                                   |
| Unit          | `node_modules/.bin/vitest run`   | **34 passed** across 6 files             |
| Content rules | `node scripts/validate-data.mjs` | `Content validation passed.`             |
| Docs guard    | `node scripts/check-docs.mjs`    | `Docs check passed (32 files).`          |
| Build         | `next build`                     | **72 static pages**, 0 errors             |
| End-to-end    | `playwright test` (vs `:3100`)   | **6 passed**, all 56 sitemap URLs         |

A production build **fails closed** while `.env.example` placeholder values are in
place:

```
Production build blocked: the business profile still holds placeholder or empty
values: legalName, tradingName, ice, licence, insurance, whatsapp, email, address.
```

That is by design ([config/business.ts](../config/business.ts)). `SKIP_ENV_VALIDATION`
is the documented hatch and is wired into both `playwright.config.ts` and CI.

> The green suite is the weakest evidence here, not the strongest: the unit and E2E
> tests pass while the defects in §2 ship. None of them assert on `og:image`,
> translation completeness, or the punctuation of the rendered restrictions.

---

## 2. Open defects

### D1 — Double period in "Restrictions" on every product page · **P1**

- **Area:** rendering / content
- **Location:** `src/app/[locale]/[slug]/page.tsx:283`
- **Evidence:** rendered text on `/en/agadir-boat-cruise-fishing-bbq-lunch`:

  > Departures depend on weather, sea conditions and boat availability**..** The swim
  > stop happens only when conditions allow**..** Guests who cannot swim should stay
  > on board or use a float; confirm with the crew.

- **Cause:** the page joins with `service.restrictions.join(". ")`, but every entry in
  `content/{en,fr}/*.ts` already ends with a period. Affects every service that
  declares `restrictions` (currently all of them), in both locales.
- **Impact:** visible typographic defect on the highest-revenue pages.
- **Fix:** join with `" "` (or strip trailing periods per entry). Add an E2E assertion
  that the rendered restrictions contain no `..`.

### D2 — No `og:image` or `twitter:image` on any page · **P1**

- **Area:** SEO / social
- **Location:** `src/seo/metadata.ts:47` (`openGraph`) and `:56` (`twitter`);
  `src/app/opengraph-image.tsx` (the file convention that never takes effect)
- **Evidence:** raw HTML across `/en`, `/en/excursions`, a product page, `/en/about`,
  `/fr` and `/en/guides` emits **no** `og:image` and **no** `twitter:image`, while
  `twitter:card` is `summary_large_image`. The build also warns, three times:

  ```
  ⚠ metadataBase property in metadata export is not set for resolving social open
    graph or twitter images, using "http://localhost:0".
  ```

- **Cause:** `buildPageMetadata` returns explicit `openGraph`/`twitter` objects with no
  `images`, which replaces the file-convention image; and because there is **no root
  `src/app/layout.tsx`**, `metadataBase` (set in `src/app/[locale]/layout.tsx:26`) is
  undefined for the top-level metadata routes.
- **Impact:** link previews on WhatsApp, Facebook, X and Slack render as bare text.
  For an agency whose whole funnel is shared links and WhatsApp, this is a
  conversion defect, not a cosmetic one.
- **Fix:** add explicit `openGraph.images` and `twitter.images` (absolute, via
  `SITE_URL`) in `buildPageMetadata`, and make `metadataBase` available where the
  file conventions resolve it. Cover with an E2E assertion that `og:image` exists and
  returns `200` with an image content type.

### D3 — `/icon` and `/opengraph-image` are 307-redirected · **P1**

- **Area:** routing / crawl
- **Location:** `src/proxy.ts:9` — `matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"]`
- **Evidence:**

  ```
  /opengraph-image -> HTTP/1.1 307 Temporary Redirect  location: /en/opengraph-image
  /icon            -> HTTP/1.1 307 Temporary Redirect  location: /en/icon
  ```

- **Cause:** the matcher excludes paths containing a dot (asset files) and the known
  namespaces, but `/icon` and `/opengraph-image` are extensionless, so the next-intl
  proxy locale-prefixes them. The favicon `<link rel="icon" href="/icon…">` and any OG
  image URL therefore resolve through a redirect; social scrapers commonly do not
  follow it.
- **Impact:** brittle favicon and (once D2 is fixed) brittle OG image fetches.
- **Fix:** add the metadata routes to the matcher's negative lookahead
  (`icon`, `opengraph-image`, `apple-icon`, `manifest.webmanifest`, `robots.txt`,
  `sitemap.xml`, `llms.txt`).

### D4 — The French catalogue is only half-translated · **P1**

- **Area:** i18n / content / SEO
- **Location:** `content/fr/*.ts` — e.g. `content/fr/boat-cruise.ts:47` (`itinerary`),
  `:75` (`bring`), `:76` (`suitableFor`), `:77` (`restrictions`)
- **Evidence:** on `/fr/sortie-bateau-agadir-peche-barbecue` (which correctly reports
  `lang="fr"` and a French `<h1>`), the itinerary, what-to-bring, suitable-for and
  restrictions blocks render **English**. The French `summary` also still carries the
  editorial marker **"(Draft for native review.)"** in shipped copy.
- **Impact:** French pages are mixed-language, which weakens the locale's SEO value and
  reads as unfinished to a French visitor. The validator's `validateParity` rule
  checks field *presence*, never language, so nothing catches it.
- **Note:** the content files are unchanged by this session (committed in the earlier
  "clean project" commit); the defect is pre-existing but it directly undermines the
  session's i18n objective.
- **Fix:** complete the translations and strip the draft marker; add a validator rule
  that fails a non-English locale containing an editorial marker or a field
  byte-identical to its English counterpart.

### D5 — Cancellation window contradicts itself · **P2**

- **Area:** content consistency
- **Location:** `messages/en.json:115` vs `messages/en.json:234`
- **Evidence:**

  > `transferCancellation`: "Free cancellation up to **2 hours** before scheduled pickup."

  > FAQ "Can I cancel?": "Transfers are free to cancel up to **12 hours** before pickup…"

- **Impact:** a customer-facing policy conflict that invites disputes and refund
  arguments; also an E-E-A-T negative.
- **Fix:** pick one policy, align both strings (and the FR messages), and prefer a
  single source for the policy text.

### D6 — `/book` title double-brands · **P3**

- **Area:** SEO
- **Location:** `messages/en.json:161` + `src/app/[locale]/layout.tsx:27`
- **Evidence:** `document.title` on `/en/book` is
  `Book a Tour or Private Transfer | Agadir Tourisme | Agadir Tourisme`.
- **Cause:** `book.metaTitle` already ends with the brand, and the layout's
  `template: "%s | Agadir Tourisme"` appends it again. Only `/book` includes the brand
  in its own title, so only `/book` is affected.
- **Impact:** low (the page is `noindex`), but it is a defect.
- **Fix:** drop the brand from the message, or exempt it from the template.

### D7 — Free-child detection is English-only and order-dependent · **P2**

- **Area:** pricing logic (latent)
- **Location:** `src/pricing/quote.ts:51` (`findChildOption`)
- **Evidence:** the exclusion is `!/under/i.test(o.label)`. The French free option is
  labelled "Enfant de **moins de** 4 ans", which the regex does not match; it is
  excluded today only because "Enfant 4 à 11 ans" happens to come first in the
  options array.
- **Impact:** reordering a service's price options (or adding a French label) silently
  uses the infant rate as the paid child rate, producing a wrong quote and a wrong
  `Offer.price`.
- **Fix:** make the rule label- and locale-agnostic — exclude zero-amount options and
  match both `under`/`moins de`, ideally by flagging options explicitly.

### D8 — The booking form cannot select options, and hides field errors · **P2**

- **Area:** booking UX
- **Location:** `src/components/book-form.tsx` (form fields); `:70` (error render);
  `src/booking/actions.ts` (builds `fieldErrors`)
- **Evidence:** the quote engine supports `optionLabel`, `vehicle` and `routeIndex`,
  but the form collects only service, party size, date, hotel and notes, so variants
  (sunset departure, quad vs buggy, private boat, transfer route) always quote the
  default. Separately, the server action returns `fieldErrors` per field, but the
  form renders only the generic `state.message`.
- **Impact:** the live estimate can be wrong for any variant service, and validation
  feedback is not actionable.
- **Fix:** expose the option/route/vehicle selectors for services that have them, and
  render `fieldErrors` next to each field.

### D9 — Sitemap `lastmod` and a doc overstatement · **P3**

- **Area:** SEO hygiene / docs
- **Location:** `src/app/sitemap.ts:9` — `const lastModified = new Date();`;
  `docs/testing.md` (suite table)
- **Evidence:** every build stamps all 56 URLs with the build time, so `lastmod` claims
  the whole site changed on every deploy and carries no signal. `docs/testing.md`
  also lists "localized home page" as unit-test coverage, but no such test file exists
  (the unit suite is `business`, `catalogue`, `price`, `quote`, `duration`,
  `validate-content`).
- **Impact:** `lastmod` is not a ranking factor but is a crawl-scheduling hint; a
  useless one is worse than none. The doc error misleads future contributors.
- **Fix:** derive `lastmod` from real content dates, and correct the docs table.

---

## 3. Design review (frontend-design)

**What holds up.** Mobile-first is genuinely implemented, not claimed: a 375 px
baseline, single-column layouts that scale to 2/3 columns, ≥44 px touch targets,
safe-area insets, a sticky quote aside on desktop, a skip link, visible focus rings,
`prefers-reduced-motion` handling, semantic landmarks, and logical CSS properties
throughout (so an RTL Arabic pass is mostly copy work). Measured against the brief —
*clean, modern, mobile first, simple to use* — it passes. Nothing here needs a
structural rework.

**Where it reads as default.** The visual language is the well-known generated-design
cluster rather than a choice made for this subject:

- a warm cream canvas (`#fbf7f2`) with a terracotta accent (`#c2410c`);
- a tracked-out ALL-CAPS eyebrow above every section ("LOCAL SOUSS-MASSA TOUR
  OPERATOR", "8 HOURS", "WHAT'S INCLUDED", "ACTIVITIES & ADVENTURES IN AGADIR");
- `→` appended to every link ("View all →", "Details →", "Read guide →", "View
  place →");
- a middle-dot meta string on product pages ("• agadir boat trip");
- uniform rounded cards with one border radius and one soft border.

Each is legitimate on its own; in aggregate they make an owner-led Souss-Massa agency
look like any other generated travel page, and none of them encode information.

**Decision.** The look is **kept as-is** (the client's call). Only low-risk
consistency and accessibility polish is therefore in scope; this is recorded, not
raised as a defect. If the identity is revisited later, the highest-leverage move is a
subject-specific palette (Atlantic teal / sun-bleached sand with a single signal
colour) plus a type pairing with North-African character, replacing the caps eyebrows
and arrow suffix with structural devices — thin rules, and a numbered itinerary used
only where the content truly is a sequence.

---

## 4. Behaviour verified by hand (webapp-testing)

Driven against the production build on `:3100`:

- **Live quote arithmetic is correct.** Boat cruise, 2 adults × 35 € + 2 children
  × 18 € = **106 €**, rendered as ≈1,144.8 MAD at the 10.8 rate. The adult/child
  lines and totals update live as party size changes.
- **The locale switcher keeps the page.** Clicking FR on
  `/en/agadir-boat-cruise-fishing-bbq-lunch` lands on
  `/fr/sortie-bateau-agadir-peche-barbecue` with `lang="fr"` and `<html dir="ltr">`.
- **Booking works end to end.** The form POSTs to the server action, returns `200`
  and renders the success panel with the WhatsApp CTA. Console and page errors: none.
- **Routing.** `/` → 307 `/en`; alias `/{locale}/{hub}/{slug}` → 308
  `/{locale}/{slug}` for both excursions and activities; unknown slug, unknown place
  and unknown guide all return 404 (`dynamicParams = false`); `/llms.txt` returns 200.
- **Per-URL SEO invariants** (from the E2E suite): exactly one `<h1>`, one
  self-canonical, reciprocal `en`/`fr`/`x-default`, valid JSON-LD, and `Offer.price`
  equal to the independently declared visible price on every sitemap URL.

Two false alarms chased and dismissed, so they are not mistaken for defects:

- `/de` returns 307 to `/en/de` (a redirect into a 404) rather than a direct 404. It
  is next-intl prefixing an unrecognised segment; harmless, no fix warranted.
- A full-page screenshot appeared to repeat the hero several times; that is the
  stitching artefact of a long lazy-loaded page, not a layout bug. Viewport captures
  show a single correct hero.

---

## 5. Deferred / out of scope

- **Client-supplied values.** Real legal/contact data (ICE, licence, insurance,
  WhatsApp, address) and real photography are still absent; the build guard prevents
  shipping placeholders.
- **Arabic.** Wired (RTL helper, logical properties, `dir` from locale) but has no
  copy; per-zone place hubs and real reviews remain on the roadmap.
- **Lighthouse budgets** were not run in this pass (`lhci` needs its own server
  lifecycle); CI runs them.
- **Design refresh.** Deliberately out of scope per the decision in §3.

---

## 6. Recommended order for the fix pass

1. D1 (punctuation), D5 (policy), D6 (title) — small, self-contained.
2. D2 + D3 together (they are the same "metadata routes are not served correctly"
   problem) with E2E assertions added.
3. D7 (pricing robustness) with a unit test that pins the French option ordering.
4. D4 (French content) plus the new validator rule that makes it unrepeatable.
5. D8 (form option selection and field errors).
6. D9 (sitemap dates and doc correction).
