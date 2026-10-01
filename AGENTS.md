# AGENTS.md

Canonical, tool-agnostic context for AI coding agents working in this repository.
Humans should start at [README.md](README.md). Deeper detail lives in
[docs/](docs/README.md); planned work lives in [specs/](specs/README.md).

> Nested `AGENTS.md` files (if added later) take precedence for files under their
> directory. An explicit instruction in the chat always overrides this file.

## Project

A mobile-first, SEO-first booking website for a licensed travel agency in Agadir
(Souss-Massa, Morocco). It is a static catalogue of **15 services** across three
hubs — excursions, activities and transfers — in **English and French** (Arabic
is planned, with RTL). The design is deliberately minimalist: no UI kit, no
animation library, and no third-party runtime scripts, analytics, chat widgets or
map embeds.

## Stack

| Area       | Choice                                                                          |
| ---------- | ------------------------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack), React 19, TypeScript strict                 |
| i18n       | next-intl 4 (`en`, `fr`)                                                        |
| Validation | zod 4                                                                           |
| Styling    | Tailwind CSS v4, CSS-first config in [src/app/globals.css](src/app/globals.css) |
| Runtime    | Node >= 20.9, pnpm 12.8.1                                                       |
| Tests      | Vitest + Testing Library; Playwright (375px); Lighthouse CI                     |

## Commands

| Command              | What it does                                           |
| -------------------- | ------------------------------------------------------ |
| `pnpm dev`           | Start the dev server.                                  |
| `pnpm build`         | Production build (static-renders the catalogue).       |
| `pnpm start`         | Serve the production build.                            |
| `pnpm lint`          | ESLint over the repo. **Must be clean.**               |
| `pnpm typecheck`     | `tsc --noEmit`.                                        |
| `pnpm test`          | Vitest unit/component tests (single run).              |
| `pnpm test:e2e`      | Playwright smoke + SEO tests (run `pnpm build` first). |
| `pnpm validate:data` | Validate catalogue content against the content rules.  |
| `pnpm lighthouse`    | Lighthouse CI against a locally started server.        |
| `pnpm format`        | Prettier write. `pnpm format:check` is the CI variant. |

Use pnpm through Corepack (`corepack pnpm …`). If pnpm is not on `PATH`, call the
project binaries directly, e.g. `node_modules/.bin/tsc --noEmit`.

## Non-negotiable rules

1. **SEO is a product requirement.** Every indexable page must have exactly one
   `<h1>`, one canonical link, reciprocal `hreflang` (`en`, `fr`, `x-default`)
   and valid JSON-LD. `/book` is `noindex`. See [docs/seo.md](docs/seo.md).
2. **Never invent a price or a duration.** The visible "From" price and the
   JSON-LD `Offer.price` both come from `getServiceDisplayPrice`; durations come
   from `formatIsoDuration`. An add-on must never become the headline price.
3. **Respect the publish gate.** Only services with `status: "published"` reach
   pages, metadata, the sitemap or internal links. Never bypass it.
4. **User-visible copy is translated.** Store UI copy in
   `messages/{en,fr}.json` and read it through next-intl; do not hardcode strings
   in components. Per-service copy lives in `content/{en,fr}`.
5. **CSS logical properties only.** Use `ms/me/ps/pe`, `start/end`,
   `inset-bs/be` and `text-start/end`. Never `ml/mr/pl/pr`, `left/right` or
   `text-left/right` (so the RTL locale needs no rewrite).
6. **Keep dependencies tiny.** No UI kit, animation library, tracker or
   third-party runtime script. Ask before adding any dependency.
7. **Leave the tree green.** Lint, typecheck and unit tests must pass, and tests
   should cover behaviour you change.
8. **Git is explicit.** Do not commit, push, open or merge PRs, or change git
   configuration unless the user asks.

## Where things live

```
content/{en,fr}/      Typed service catalogue, one file per service (+ index.ts)
messages/{en,fr}.json UI copy consumed through next-intl
config/business.ts    Business profile + env validation (fails prod builds on placeholders)
data/source/          Source JSON + the services report; not read at runtime
src/app/[locale]/     App Router: layout, home, hubs, product, book, 404
src/app/{sitemap,robots}.ts  SEO routes
src/components/       navigation, hub-page, json-ld, locale-switcher
src/i18n/             locales, routing/pathnames, request config
src/pricing/          Pure quote engine (quote.ts, types.ts)
src/schemas/          zod schemas (service.ts)
src/seo/              content access + publish gate, metadata, price, duration
src/validation/       Content validator used by pnpm validate:data
tests/e2e/            Playwright specs
scripts/              build-content.mjs, validate-data.mjs
docs/                 Knowledge base (see docs/README.md)
docs/adr/             Architecture decision records
specs/                Feature specifications
.agents/skills/       Reusable SKILL.md workflows
```

## Common tasks → skills

| Task                               | Skill                                                             |
| ---------------------------------- | ----------------------------------------------------------------- |
| Adversarially review a change      | [.agents/skills/review](.agents/skills/review/SKILL.md)           |
| Reshape code / boundaries          | [.agents/skills/architect](.agents/skills/architect/SKILL.md)     |
| Audit SEO across every page        | [.agents/skills/seo-audit](.agents/skills/seo-audit/SKILL.md)     |
| Add or change a service end-to-end | [.agents/skills/add-service](.agents/skills/add-service/SKILL.md) |

## Before you finish

Run the proportionate checks and fix failures before reporting done:

```bash
corepack pnpm lint && corepack pnpm typecheck && corepack pnpm test && corepack pnpm build
```

Add `corepack pnpm test:e2e` whenever routes, metadata, JSON-LD, sitemap or i18n
changed. Add `corepack pnpm validate:data` whenever content changed.

## Do not

- Do not invent services, prices, durations, contact details or business
  identifiers; use `config/business.ts` and the content files as the source.
- Do not remove or weaken the SEO invariants or the publish gate to make a test
  pass.
- Do not edit generated output (`.next/`), or commit secrets and `.env.local`.
- Do not widen scope with unrelated refactors inside a focused change.

## Docs & specs

- Knowledge base: [docs/README.md](docs/README.md)
- Decisions: [docs/adr/README.md](docs/adr/README.md)
- Specifications: [specs/README.md](specs/README.md)
- Review report: [reports/project-review.md](reports/project-review.md)
