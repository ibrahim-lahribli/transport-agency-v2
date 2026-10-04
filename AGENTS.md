# AGENTS.md

Mobile-first, SEO-first booking site for an Agadir (Souss-Massa, Morocco) travel
agency: a static, typed catalogue of services across **excursions**,
**activities** and **transfers**, in English and French (Arabic planned, RTL).

Package manager: **pnpm** (via `corepack`). If pnpm is unavailable, use
`node_modules/.bin/<tool>`.

## Commands

```bash
pnpm dev          # dev server
pnpm build        # production build
pnpm lint         # eslint .
pnpm typecheck    # tsc --noEmit
pnpm test         # vitest run
pnpm test:e2e     # playwright (needs a build first)
pnpm validate:data  # content rules
pnpm lighthouse   # lighthouse ci budgets
pnpm gate         # full local gate: lint, typecheck, test, validate, docs, build, e2e
```

Leave the tree green: `lint → typecheck → test → build`. Add `test:e2e` when
routes, metadata or i18n change, and `validate:data` when content changes.

`next build` **fails closed** while `.env.example` placeholder values are set.
`SKIP_ENV_VALIDATION=true` is the documented hatch (already wired into
`playwright.config.ts` and CI); a local production build also needs the real URL:

```bash
SKIP_ENV_VALIDATION=true NEXT_PUBLIC_SITE_URL=http://localhost:3100 \
  node_modules/.bin/next build && \
  SKIP_ENV_VALIDATION=true NEXT_PUBLIC_SITE_URL=http://localhost:3100 \
  node_modules/.bin/next start -p 3100
```

## Boundaries

- ✅ Always: derive prices/durations from the shared helpers; keep pages static;
  add the key to both locales.
- ⚠️ Ask first: adding a dependency, changing the content schema, changing CI.
- 🚫 Never: commit secrets, invent a price or duration, bypass the publish gate,
  commit/push/open a PR unless asked.
- Design: the current palette/type identity is a deliberate keep — don't re-theme;
  only low-risk consistency/a11y polish is in scope unless asked.

## Non-obvious gotchas

- `src/proxy.ts` (next-intl) must keep `icon` and `apple-icon` in its matcher's
  negative lookahead: they are extensionless metadata routes, so the proxy otherwise
  307-redirects them to `/{locale}/…` and crawlers can't reach the favicon.
- Keep file-convention metadata (`opengraph-image.tsx`, …) inside the `[locale]`
  segment: the root `_not-found` route has no `metadataBase`, so a root-level route
  needing one triggers Next's `using "http://localhost:0"` build warning.
- The booking form selects a service by **id** (e.g. `paradise-valley`), not slug;
  “Book this” links must be `/book?service=<id>`.
- **React 19 resets a `<form>` after its server action runs.** That clears
  uncontrolled inputs and knocks a controlled `<select>` back to its first option
  while React state (and any quote derived from it) keeps the old value — a silent
  wrong-submit on the retry. Keep fields controlled and key the `<form>` on a
  per-attempt id the action returns (`InquiryState.attempt`), never on a value that
  changes as the visitor types.
- ESLint enforces `react-hooks/set-state-in-effect`: don't bump a remount key from
  an effect — derive it from the action state during render.
- Server actions (`src/booking/actions.ts`) import `next/headers`/`getTranslations`
  and can't be unit-tested directly; keep their pure logic in sibling modules
  (`src/booking/selection.ts`) so Vitest can import it.
- Whether a service shows a variant selector, a route+vehicle selector, or just a
  party size is decided by `usesTieredPricing()` in `src/pricing/quote.ts`, shared
  with the quote engine so the form and the engine can't disagree.
- A Vitest test that reads a repo file must anchor the path to `process.cwd()`
  (`resolve(process.cwd(), "messages", ...)`); `new URL(..., import.meta.url)`
  resolves to the drive root here (e.g. `C:\messages\fr.json`).
- The locale layout templates `<title>` as `%s | Agadir Tourisme`, but that
  template does **not** touch `og:title`/`twitter:title`. A title that already
  ends with the brand must pass `titleAbsolute: true` to `buildPageMetadata`
  (`/book` does) — stripping the brand from the message instead fixes `<title>`
  but silently drops it from the share card.
- `src/app/sitemap.ts` carries `lastModified` **only** on guide URLs (the guide's
  own ISO `date`); every other URL omits it. Never reintroduce a build-time
  `new Date()` stamp.
- Cancellation windows are fixed by `data/source/services-report.md` §3.6
  (transfer 12 h; excursion/adventure 24 h). `product.*Cancellation` and the FAQ
  answer must agree across both locales, pinned by `src/i18n/messages.test.ts`.

## Where things live

- `content/{en,fr}/` — typed service catalogue. `messages/{en,fr}.json` — UI copy.
- `config/` — env-validated business profile and site settings.
- `src/` — schemas, catalogue access, pricing, SEO engine, components and routes.
- `data/source/` — the original catalogue material (not read at runtime). Its
  `*.json` is bilingual (`{en, fr}`) **only** for `title`, `summary`, `seo`,
  `primaryKeyword` and `highlights`; every other field is English-only, so FR body
  copy (itinerary, bring, restrictions, FAQ…) has no source to translate from.
- `docs/` — the knowledge base. `specs/` — specs and the roadmap. `reports/` — review
  output; it is outside `scripts/check-docs.mjs`'s `SCAN_DIRS`, so reports never break
  the docs guard.

## Deeper context

- Architecture and ownership: [docs/architecture.md](docs/architecture.md)
- Conventions (types, CSS, commits): [docs/conventions.md](docs/conventions.md)
- Content model and publishing: [docs/content-model.md](docs/content-model.md)
- SEO invariants: [docs/seo.md](docs/seo.md)
- Pricing rules: [docs/pricing.md](docs/pricing.md)
- Internationalization: [docs/i18n.md](docs/i18n.md)
- Testing and CI: [docs/testing.md](docs/testing.md)
- How this AI context layer fits together: [docs/ai-context.md](docs/ai-context.md)
- Planned work: [specs/roadmap.md](specs/roadmap.md) · current spec:
  [specs/0001-build-plan.md](specs/0001-build-plan.md)
