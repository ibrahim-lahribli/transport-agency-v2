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
```

Leave the tree green: `lint → typecheck → test → build`. Add `test:e2e` when
routes, metadata or i18n change, and `validate:data` when content changes.

## Boundaries

- ✅ Always: derive prices/durations from the shared helpers; keep pages static;
  add the key to both locales.
- ⚠️ Ask first: adding a dependency, changing the content schema, changing CI.
- 🚫 Never: commit secrets, invent a price or duration, bypass the publish gate,
  commit/push/open a PR unless asked.

## Where things live

- `content/{en,fr}/` — typed service catalogue. `messages/{en,fr}.json` — UI copy.
- `config/` — env-validated business profile and site settings.
- `src/` — schemas, catalogue access, pricing, SEO engine, components and routes.
- `data/source/` — the original catalogue material (not read at runtime).
- `docs/` — the knowledge base. `specs/` — specs and the roadmap.

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
