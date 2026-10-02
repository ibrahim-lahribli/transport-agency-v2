# Roadmap

Living list of candidate work. Each entry becomes a spec (`NNNN-…`) before it is
built. Ordering is a suggestion, not a commitment.

## 1. Programmatic long-tail hubs — ✅ done (place hubs)

Place landing pages at `/[locale]/places/[place]` (`src/content/places.ts`) with
per-place metadata, internal links and sitemap entries. Next: per-zone and
per-duration pages derived automatically from the catalogue. **Touches:**
`src/catalogue`, `src/app/[locale]`, `sitemap.ts`.

## 2. Editorial guides — ✅ done

An `Article`-marked hub at `/[locale]/guides` (`src/content/guides.ts`) with
first-hand, bilingual guides and internal links to services. Add more guides and
an RSS/feed if useful. **Touches:** content, `src/app/[locale]`, JSON-LD.

## 3. Real reviews

Collect and display genuine guest reviews; emit `Review`/`AggregateRating`
structured data only once they are real. **Value:** trust + rich results.
**Touches:** content, JSON-LD.

## 4. Arabic (RTL) locale

Ship `ar`: add `LOCALES`, `messages/ar.json`, service copy, an Arabic-capable
font, and a `dir="rtl"` test. **Value:** new market. **Touches:** `src/i18n`,
`messages`, `content`, layout.

## 5. Unify booking notification providers

Extract the notification adapter so email/WhatsApp providers can be swapped by
configuration. **Value:** portability. **Touches:** booking server action.

## 6. Guard docs & schema in CI

Fail the build if a draft reaches the sitemap, if a JSON-LD block is missing
required fields, or if docs links rot. **Value:** stops silent regressions.
**Touches:** `scripts`, `.github/workflows`.

## Deferred / nice-to-have

- Richer Open Graph type per product and video schema when assets exist.
- Split the sitemap into a sitemap index as the catalogue grows.
