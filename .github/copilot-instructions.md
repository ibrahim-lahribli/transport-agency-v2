# GitHub Copilot instructions

Canonical project contract: **[../AGENTS.md](../AGENTS.md)**. Knowledge base:
[../docs/README.md](../docs/README.md). Specs: [../specs/README.md](../specs/README.md).

This is a mobile-first, SEO-first Next.js 16 booking site for an Agadir travel
agency: a static catalogue of services across excursions, activities and
transfers, in English and French (Arabic planned, RTL). Next.js App Router,
React 19, TypeScript strict, next-intl, zod, Tailwind CSS v4, pnpm.

## Rules when generating code

- **SEO:** exactly one `<h1>`, one canonical and reciprocal `en`/`fr`/`x-default`
  hreflang, valid JSON-LD per indexable page. `/book` stays `noindex`.
- **Pricing/durations:** derive from the shared display-price and duration
  helpers; never hardcode or invent a value, and never let an add-on become the
  headline "From" price.
- **Publish gate:** only `status: "published"` services are exposed.
- **Copy:** UI chrome in `messages/{en,fr}.json` via next-intl; per-service copy
  in `content/{en,fr}`. Do not hardcode user-visible strings.
- **CSS:** logical properties only (`ms/me/ps/pe`, `start/end`, `text-start`).
- **Dependencies:** keep them tiny; do not add UI kits, trackers or runtime
  scripts without asking.
- **Tests:** keep lint, typecheck and unit tests green; add coverage for
  behaviour you change.

## Validation

```bash
corepack pnpm lint && corepack pnpm typecheck && corepack pnpm test && corepack pnpm build
```

Add `corepack pnpm test:e2e` for route/metadata/i18n changes, and
`corepack pnpm validate:data` for content changes.
