# 0001 — Adopt next-intl with message catalogues

- **Status:** accepted
- **Date:** 2026-10-01
- **Deciders:** project maintainers

## Context

The site ships English and French today and Arabic (RTL) later. Early code
hardcoded every string as an inline `isFr ? … : …` ternary, and the next-intl
dependency was configured (routing, middleware, `messages/*.json`) but **never
consumed** — a dead layer that added weight without benefit.

Options considered:

1. **Drop next-intl** and keep explicit ternaries. Smallest dependency set, but
   does not scale to a third locale and scatters copy across components.
2. **Adopt next-intl properly** — move copy into `messages/{en,fr}.json`,
   translate via `getTranslations`/`useTranslations`, and use locale-aware typed
   navigation.

## Decision

Adopt next-intl end to end: message catalogues as the single source of UI copy,
typed `Link` from `createNavigation`, and `NextIntlClientProvider` in the locale
layout. Call `setRequestLocale(locale)` in each page to preserve static
rendering.

## Consequences

- Copy is centralized and a third locale is additive (add `messages/ar.json`,
  extend `LOCALES`).
- Pages stay static (verified: 44 pre-rendered pages).
- Every new string must be added to **both** locales; per-service copy stays in
  `content/{en,fr}` rather than messages.
- The client bundle carries the message catalogue per locale (small at current
  size); revisit if copy grows substantially.
