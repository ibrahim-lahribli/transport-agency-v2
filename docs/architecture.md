# Architecture

A statically rendered Next.js App Router site. There is no database and no
runtime CMS: the catalogue is typed source code that is compiled into the site.

## Layers

```
data/source/*.json ──► scripts/build-content.mjs ──► content/{en,fr}/*.ts   (typed catalogue)
                                                        │
                                              src/seo/content.ts           (access + publish gate)
                                                        │
                    ┌───────────────────────────────────┼───────────────────────────┐
                    ▼                                   ▼                           ▼
        src/app/[locale]/** pages            src/app/sitemap.ts            src/pricing/quote.ts
        src/components/hub-page.tsx          (published only)              (still imports content directly)
```

- **content/`{en,fr}`** — the typed service catalogue, one file per service plus
  an `index.ts` exporting `services`, `servicesById` and named services.
- **`src/seo/content.ts`** — the **single entry point** for reading the
  catalogue: publish gate (`status === "published"`), `order` sorting, slug and
  reciprocal-slug resolution, hub mapping and related services.
- **`src/seo/`** — metadata builder (`metadata.ts`), display price (`price.ts`)
  and duration formatting (`duration.ts`). These are pure and reusable.
- **`src/pricing/`** — a pure quote engine (`quote()`), independent of React.
- **`src/components/`** — presentational building blocks: navigation, hub page
  view, JSON-LD, and the client locale switcher.
- **`src/app/`** — routes, layouts, `sitemap.ts` and `robots.ts`.

## Rendering

- App Router with per-locale static rendering. `setRequestLocale(locale)` is
  called in each page/layout/hub route so pages stay statically generated.
- Routes: `/[locale]` (home), `/[locale]/excursions|activities|transfers`
  (hubs), `/[locale]/[slug]` (product), `/[locale]/book` (dynamic, `noindex`),
  plus category alias redirects `/[locale]/{hub}/[slug]` → `/[locale]/[slug]`.
- `middleware.ts` (next-intl) prefixes and validates locales; `localePrefix` is
  `always` and `localeDetection` is off.

## Ownership and boundaries

- **One owner for catalogue reads:** `src/seo/content.ts`. New consumers should
  import from it, not from `content/*` directly. (`src/pricing/quote.ts` and
  historically `src/app/sitemap.ts` import content directly — the sitemap has
  been moved onto the catalog; pricing remains a known gap, see
  [roadmap](../specs/roadmap.md).)
- **One owner for prices/durations:** `src/seo/price.ts` and
  `src/seo/duration.ts`. UI and JSON-LD must both read from them.
- **One owner for copy:** `messages/{en,fr}.json` (UI) and `content/{en,fr}`
  (service copy).
- **SEO is derived, not duplicated:** pages call `buildPageMetadata`; JSON-LD
  components read from the same price/duration functions as the visible UI.

## Known gaps

- `src/pricing/quote.ts` imports the catalogue directly instead of through the
  catalog module.
- No `og:image`, favicon or web manifest yet.
- Arabic/RTL is wired but not shipped (`LOCALES` has no `ar`).
