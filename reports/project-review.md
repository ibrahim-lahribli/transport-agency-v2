# Project Review — Agadir SEO-first Tourism Booking Site

Scope: the whole `master` worktree, with emphasis on the last milestone
(Routing, i18n and SEO engine) which was reported as unfinished.
Method: read the code, reproduce behaviour against a running production
server on `:3000`, and run the project's own checks.

## Verdict

The foundation is solid: 44 pages build statically, canonical + reciprocal
`hreflang` are correct, `/book` is `noindex`, JSON-LD parses, and both the unit
and E2E suites pass. But the SEO engine was **not finished in a way its own tests
can see**, and **CI is red** because `pnpm lint` fails. The most dangerous defect
is a pricing bug that silently publishes misleading "from" prices and a matching
`Offer.price` in structured data.

## Verification evidence

| Check              | Command                          | Result                           |
| ------------------ | -------------------------------- | -------------------------------- |
| Types              | `tsc --noEmit`                   | pass (exit 0)                    |
| Unit tests         | `vitest run`                     | 31/31 pass                       |
| Production build   | `next build`                     | 44 static pages, exit 0          |
| E2E (mobile 375px) | `playwright test`                | 5/5 pass                         |
| **Lint**           | `eslint .`                       | **FAIL — 5 errors / 4 warnings** |
| Content validator  | `node scripts/validate-data.mjs` | pass                             |

Live output confirmed:

- canonical `http://localhost:3000/en/...`
- reciprocal `hreflang` (`en` ↔ `fr`, `x-default` = EN) on product pages
- `robots.txt` disallows `/book` and references `/sitemap.xml`
- sitemap has 38 `<loc>` entries with `xhtml:link` alternates
- `/` → 307 → `/en`; `/en/excursions/<slug>` → 308 → `/en/<slug>`
- no console errors on the product page

## Blocking defects (P0)

### 1. `pnpm lint` fails → CI is red

CI runs lint before typecheck/test/build, so the pipeline is currently red.

- `src/app/[locale]/layout.tsx:33` — `locale as any`
- `src/app/[locale]/page.tsx:44` — `locale as any`
- `src/app/[locale]/not-found.tsx:10` — unescaped `'`
- `tests/e2e/seo.spec.ts:104,108` — `any`
- warnings: unused `Metadata`, `React`, `AppLocale`; stale `eslint-disable`

### 2. "From" price + JSON-LD `Offer.price` are wrong for two services

`getServiceDisplayPrice` falls back to the lowest positive option when there is
no "adult" option. Reproduced live:

- Crocoparc → `5 € / per 30 min` (the extra-waiting add-on; real base is
  25 € car / 35 € van)
- Timlalin Dunes → `10 € / person` (the sandboarding add-on, not bookable alone)

Both values also flow into `TouristTrip.offers.price`. The E2E test only asserts
visible == JSON-LD, so it passes while both are wrong.

### 3. Fabricated / invalid durations in structured data

Transfer pages emit `"duration":"PT1H"` because `formatIsoDuration` returns
`PT1H` for missing input. Rounding is off at the boundary:

```
formatIsoDuration(3.995)  => PT3H60M   (invalid ISO 8601)
formatIsoDuration(5.999)  => PT5H60M   (invalid ISO 8601)
formatIsoDuration(undefined) => PT1H   (invented)
```

### 4. The language switcher always goes to the other locale's homepage

`Header` never receives `currentPath`, so every page links to `/${other}`. On
`/en/excursions` and on `/en/agadir-boat-cruise-fishing-bbq-lunch` the FR link is
`href="/fr"`. Users lose their place when switching language.

### 5. All 15 services are `status:"draft"` yet published and in the sitemap

Nothing filters `.status`, so there is no publish gate.

## High-impact defects (P1)

- **The i18n layer is dead code.** `messages/*.json` are loaded but never
  consumed (no `useTranslations`/`getTranslations`); every string is an inline
  `isFr ? … : …`. `Link/redirect/usePathname/useRouter/getPathname` from
  `i18n/routing.ts` are imported nowhere, and the `pathnames` map omits the
  product `[slug]` route.
- **Three parallel ways to read content.** `seo/content.ts` is bypassed by
  `src/app/sitemap.ts` and `src/pricing/quote.ts`, which import `content/*`
  directly.
- **Social/SEO holes.** `twitter:card = summary_large_image` with no
  `og:image`/`twitter:image`; `/favicon.ico` → 404; no manifest/icons;
  `metadataBase` absent.
- **Localized 404 is English-only**, and its CTAs drop the locale.
- **Next 16 deprecation:** the `middleware` convention should migrate to `proxy`.
- **Dead surface:** `getServiceById`, `findServiceByAnySlug`, `isRtlLocale`
  (never matches, since `LOCALES` has no `ar`); the `order` field is unused.
- **Hygiene:** root-level `activities.json`/`excursions.json`/`transfers.json`
  duplicate `data/source/`; the README is stale.

## Architecture assessment

```
data/source/*.json ─► scripts/build-content.mjs ─► content/{en,fr}/*.ts
                                                       ├─► src/seo/content.ts ─► pages
                                                       ├─► src/app/sitemap.ts   (direct)
                                                       └─► src/pricing/quote.ts (direct)
UI copy: messages/*.json (loaded, unused)  ∥  inline isFr ternaries per page
```

One **catalog** concern should own content loading, publish gating and ordering,
slug ↔ alternate resolution, and the price _selection policy_; `seo/` consumes it
for metadata/JSON-LD, and pages, sitemap and pricing consume it too. The "from"
rule must be explicit — the cheapest **base** unit, never an add-on.

## Roadmap (reported, not done here)

- A build/fail publish gate so a `draft` can never reach the sitemap.
- A schema/rich-result CI gate asserting `Offer.price` against the computed
  quote, not just the visible string.
- Programmatic long-tail hubs (per pickup zone, per duration, per place).
- An internal-linking graph from shared keywords/zones, not just category.
- `og:image` + favicon + manifest.
- Arabic/RTL as a real milestone with a `dir="rtl"` layout test.

## Remediation status (fixed in this pass)

- **CI green:** `eslint .` → 0 errors / 0 warnings (was 5 errors / 4 warnings).
- **Pricing:** `getServiceDisplayPrice` now selects an explicit base option
  (`isBase`) / adult option / non-add-on base unit. Crocoparc `25 € / vehicle`
  (was `5 € / per 30 min`), Timlalin `15 € / person` (was `10 €`). JSON-LD
  `Offer.price` matches.
- **Durations:** `formatIsoDuration` normalizes (carries `60M` into hours) and
  returns `null` for missing input; transfers no longer emit a fabricated
  `PT1H`.
- **Language switcher:** preserves the current page and resolves the translated
  product slug (e.g. `/en/agadir-boat-cruise-fishing-bbq-lunch` ↔
  `/fr/sortie-bateau-agadir-peche-barbecue`); the 404 is localized and
  locale-prefixed.
- **Publish gate:** reads are filtered to `status: "published"` in
  `seo/content.ts`; the 15 validated services were marked published and the
  sitemap now goes through the catalog.
- **next-intl adopted:** copy moved to `messages/{en,fr}.json` and consumed via
  `getTranslations`/`useTranslations`; typed locale-aware `Link` with the
  product route in `pathnames`; `NextIntlClientProvider` in the layout. Pages
  remain statically generated (44 pages).

Still open (out of scope here): `og:image`/favicon/manifest, the `middleware`
→ `proxy` migration, catalogue unification, and the programmatic-hub roadmap.
A production build, `tsc`, `eslint`, 31 unit tests and 5 E2E tests all pass.
