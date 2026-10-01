# Roadmap

Living list of candidate work. Each entry becomes a spec (`NNNN-…`) before it is
built. Ordering is a suggestion, not a commitment. Grounded in the findings of
[reports/project-review.md](../reports/project-review.md).

## 1. Wire the booking form to the quote engine

The `/book` form is presentational: it neither submits nor prices the request,
while a complete `quote()` engine already exists. Turn it into a real request
path and show a live quote as the party/options change. **Value:** highest — it
converts traffic. **Touches:** `src/app/[locale]/book`, `src/pricing`.

## 2. Programmatic long-tail hubs

Category hubs are the only landing pages today. Generate additional hub pages
from the catalogue — per pickup zone, per duration, per place (e.g. Taghazout) —
each with its own metadata and sitemap entries. **Value:** long-tail SEO.
**Touches:** `src/seo/content`, `src/app/[locale]`, `sitemap.ts`.

## 3. Social & icon metadata

Add `og:image`/`twitter:image` (per service or a branded fallback), a favicon and
a web manifest. Today `twitter:card=summary_large_image` has no image and
`/favicon.ico` is a 404. **Value:** shareability + polish. **Touches:**
`src/seo/metadata`, `src/app` (icon/manifest conventions).

## 4. Arabic (RTL) locale

`isRtlLocale`, logical CSS and `dir` are ready; ship `ar`: add `LOCALES`,
`messages/ar.json`, service copy, an Arabic-capable font, and a test that `dir`
flips. **Value:** new market. **Touches:** `src/i18n`, `messages`, `content`,
`src/app/[locale]/layout.tsx`.

## 5. Unify catalogue access

Route `src/pricing/quote.ts` through `src/seo/content.ts` so there is one owner
for publish gating and lookup. **Value:** removes the last bypass. **Touches:**
`src/pricing`, `src/seo/content`.

## 6. Guard the docs & schema in CI

Add a check that validates `SKILL.md` frontmatter and resolves relative Markdown
links, and a gate that fails if a draft reaches the sitemap or if a JSON-LD block
is missing required schema.org fields. **Value:** stops silent rot. **Touches:**
`.github/workflows`, `scripts`.

## Deferred / nice-to-have

- `metadataBase` and richer Open Graph type per product.
- Rename `middleware.ts` to the Next 16 `proxy` convention (deprecation warning).
- Remove root-level `activities.json`/`excursions.json`/`transfers.json`
  duplicates of `data/source/`.
- Refresh the README's stale "validate:data is a stub" note.
