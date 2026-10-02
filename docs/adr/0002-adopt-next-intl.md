# 0002. Adopt next-intl for UI copy

- Status: accepted
- Date: 2026-10-02

## Context

The site ships English and French now, with Arabic (RTL) planned. Locale-prefixed
URLs, reciprocal `hreflang` and static rendering all matter for SEO. Copy was
previously held in inline `isFr ? … : …` ternaries.

## Decision

Use **next-intl** for UI chrome: messages in `messages/{en,fr}.json`, read with
`getTranslations`/`useTranslations`, locale-aware `Link`/`usePathname`, and
`localePrefix: "always"` with detection off.

## Consequences

- One place for every user-visible string; adding a locale is mechanical.
- Static rendering is preserved by calling `setRequestLocale(locale)`.
- Per-service copy stays in `content/*` (it is data, not UI chrome).
- Adds one runtime dependency; accepted because it is small and purpose-built.

## Alternatives considered

- Hand-rolled dictionary — rejected: re-implements routing, interpolation and
  type-safety we would rather not maintain.
- Inline ternaries — rejected: unscalable and untestable across three locales.
