# Tourisme Agency

Mobile-first, SEO-first booking site for a licensed travel agency in Agadir
(Souss-Massa, Morocco). A static, typed catalogue of 15 services across
**excursions**, **activities** and **transfers**, in English and French (Arabic
wired for later), with a live price quote and booking inquiry.

Built with Next.js 16 (App Router), React 19, TypeScript strict, next-intl, zod
and Tailwind CSS v4. No database, no CMS, no UI kit, no third-party trackers.

## Requirements

- Node.js >= 20.9 (developed on Node 24)
- pnpm 12 via Corepack (`corepack enable`), or use `node_modules/.bin/<tool>`

## Getting started

```bash
pnpm install
cp .env.example .env.local     # then set the real business values
pnpm dev                       # http://localhost:3000
```

`SKIP_ENV_VALIDATION=true` bypasses the production placeholder check locally and
in CI; real deployments enforce it (`config/business.ts`).

## Scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` / `build` / `start` | Develop, build, serve |
| `pnpm lint` / `format` | ESLint / Prettier |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` | Vitest unit tests |
| `pnpm test:e2e` | Playwright (build first) |
| `pnpm validate:data` | Content rules |
| `pnpm check:docs` | Docs and skill-link guard |
| `pnpm lighthouse` | Lighthouse CI budgets |

## Project layout

```
content/{en,fr}   typed service catalogue (source of truth)
messages/{en,fr}  UI copy
config/           env-validated business profile + site settings
src/              schemas, catalogue, pricing, SEO engine, components, routes
data/source/      original catalogue material (not read at runtime)
docs/             knowledge base (+ adr/)
specs/            specs and roadmap
.agents/skills/   reusable agent workflows
```

## Working with AI agents

[AGENTS.md](AGENTS.md) is the canonical contract; `CLAUDE.md`, `GEMINI.md`,
`.github/copilot-instructions.md` and `.cursor/rules` are thin adapters. The
knowledge base starts at [docs/README.md](docs/README.md) and the plan that drove
the build is [specs/0001-build-plan.md](specs/0001-build-plan.md).

## Commits

[Conventional Commits](https://www.conventionalcommits.org/). Do not commit or
push unless asked.
