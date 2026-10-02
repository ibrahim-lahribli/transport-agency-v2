# Architecture

A statically rendered Next.js App Router site. There is no database and no
runtime CMS: the catalogue is typed source code compiled into the site.

## Layers

```
content/{en,fr}/*.ts ──► src/catalogue/*            (ONLY reader of content/*)
                              │  publish gate, ordering, lookup,
                              │  slug <-> slug, hub + related helpers
        ┌──────────────────────┼────────────────────┬─────────────────────┐
        ▼                      ▼                    ▼                     ▼
  src/app/[locale]/**   src/seo/metadata.ts   src/app/sitemap.ts   src/pricing/quote.ts
  (pages, static)       + src/seo/json-ld     src/app/robots.ts    (pure engine)
                        + src/seo/price.ts    public/llms.txt      │
                        + src/seo/duration.ts                      ▼
                                                        /book live quote + inquiry
config/business.ts (zod-validated env: legal + NAP)   config/site.ts (origin, locales, hubs)
```

- **`content/{en,fr}`** — the typed service catalogue, one file per service plus
  an `index.ts` exporting `services`, `servicesById` and named services.
- **`src/catalogue`** — the **single entry point** for reading the catalogue:
  publish gate (`status === "published"`), `order` sorting, slug and
  reciprocal-slug resolution, hub mapping and related services. New consumers
  import from here, never from `content/*` directly.
- **`src/seo`** — metadata builder (`metadata.ts`), JSON-LD builders
  (`json-ld.tsx`), display price (`price.ts`) and duration formatting
  (`duration.ts`). These are pure and reusable.
- **`src/pricing`** — a pure quote engine (`quote.ts`), independent of React.
- **`src/components`** — presentational building blocks: navigation, hub view,
  JSON-LD, locale switcher, booking form.
- **`src/content`** — hand-curated long-tail content: `places.ts` (place hubs)
  and `guides.ts` (editorial guides). Both reference service ids that the
  content validator checks.
- **`src/app`** — routes, layouts, `sitemap.ts`, `robots.ts`, `llms.txt`.
- **`config`** — business profile (env-validated) and site settings.

## Rendering

- App Router with per-locale static rendering. `setRequestLocale(locale)` is
  called in each page/layout/hub route so pages stay statically generated.
- Routes: `/[locale]` (home); `/[locale]/excursions|activities|transfers`
  (hubs); `/[locale]/[slug]` (product); `/[locale]/book` (dynamic, `noindex`);
  `/[locale]/places` + `/[locale]/places/[place]` (long-tail place hubs, from
  `src/content/places.ts`); `/[locale]/guides` + `/[locale]/guides/[guide]`
  (editorial `Article` hub, from `src/content/guides.ts`); `about`, `contact`,
  `faq`; category alias redirects `/[locale]/{hub}/[slug]` → `/[locale]/[slug]`.
- `src/proxy.ts` (next-intl; the Next 16 `middleware` successor) prefixes and
  validates locales; `localePrefix` is `always` and `localeDetection` is off.

## Ownership and boundaries

- **One owner for catalogue reads:** `src/catalogue`.
- **One owner for prices/durations:** `src/seo/price.ts` and
  `src/seo/duration.ts`. UI and JSON-LD both read from them.
- **One owner for copy:** `messages/{en,fr}.json` (UI) and `content/{en,fr}`
  (service copy).
- **SEO is derived, not duplicated:** pages call `buildPageMetadata`; JSON-LD
  components read from the same price/duration functions as the visible UI.
