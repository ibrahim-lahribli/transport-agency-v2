# SEO engine

SEO is a product requirement, not a layer bolted on at the end. These invariants
are asserted by `tests/e2e/seo.spec.ts` across every sitemap URL.

## Per-page invariants

- **Exactly one `<h1>`.**
- **Exactly one canonical** link, pointing at the page's own URL.
- **Reciprocal hreflang:** `en`, `fr` and `x-default` (English URL).
- **Valid JSON-LD** (`application/ld+json` that parses): `TravelAgency` on every
  page (from the layout) and `BreadcrumbList` on every page; product pages add
  `TouristTrip` + `Offer` and, when the service has an FAQ, `FAQPage`.
- `/book` is **`noindex`** and excluded from the sitemap.

## Where metadata comes from

`buildPageMetadata` in `src/seo/metadata.ts` is the only metadata builder. It
takes `pathname`, `enPath`, `frPath` and (optionally) `noindex`, and derives the
canonical, the `hreflang` set, Open Graph and Twitter tags. Product pages pass
the **translated** reciprocal slugs from `getReciprocalSlugs` so the French URL
never carries an English slug.

A page whose title already ends with the brand passes `titleAbsolute: true` (only
`/book` today). The locale layout templates `<title>` as `%s | Agadir Tourisme`,
so without the flag the brand is appended twice; and because the template does
**not** touch `og:title`/`twitter:title`, stripping the brand from the message
instead would silently drop it from the share card. The flag keeps all three
titles carrying the brand exactly once.

`SITE_URL` comes from `NEXT_PUBLIC_SITE_URL` (falls back to
`http://localhost:3000`). All canonical/alternate URLs are absolute.

## Structured data rules

- The `Offer.price` **must equal** the visible "From" price. Both are produced by
  `getServiceDisplayPrice`, so never display one value and emit another.
- `duration` uses `formatIsoDuration` and must be valid ISO 8601 (`PT6H`,
  `PT4H15M`). When there is no real duration — notably transfers — **omit**
  `duration` rather than inventing `PT1H`.
- JSON-LD scripts must always be present in the server-rendered DOM (FAQ answers
  use native `<details>`, so they stay in the markup).
- `Review`/`AggregateRating` are emitted **only** when genuine reviews exist.

## Sitemap, robots and AI crawlers

- `src/app/sitemap.ts` builds the sitemap from the **publish-gated** catalogue:
  home + hubs + (published services × 2) URLs, each with `xhtml:link` alternates
  (`en`, `fr`, `x-default`).
- `lastModified` is a **real content date, never a build stamp**: guide URLs use
  the guide's own ISO `date`; every other URL class **omits** `lastModified`
  rather than claim the whole site changed on each deploy.
- `src/app/robots.ts` allows crawling (including known AI crawlers), disallows
  `/book` and `/*/book`, and references the sitemap.
- `public/llms.txt` is a best-effort summary for non-Google AI agents. Google
  Search ignores it; it does not harm ranking.

## Verifying

Run the [seo-audit skill](../.agents/skills/seo-audit/SKILL.md), or:

```bash
corepack pnpm build && corepack pnpm start        # in one shell
corepack pnpm test:e2e                            # in another
```
