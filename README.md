# Tourisme Agency

Mobile-first, SEO-first booking site for an Agadir (Morocco) travel agency.

Built with Next.js (App Router) and TypeScript strict mode, styled with Tailwind
CSS. No UI kit, no animation library, and no third-party runtime scripts, chat
widgets or map embeds.

## Requirements

- **Node.js LTS** (>= 20.9; developed on Node 24).
- **pnpm 12** — enabled through Corepack, which ships with Node:

  ```bash
  corepack enable       # may need an elevated shell on Windows
  corepack pnpm --version
  ```

  The exact version is pinned in `packageManager` in `package.json`.

## Getting started

```bash
pnpm install
cp .env.example .env.local
pnpm dev          # http://localhost:3000
```

## Scripts

| Script               | What it does                                                     |
| -------------------- | ---------------------------------------------------------------- |
| `pnpm dev`           | Start the dev server.                                            |
| `pnpm build`         | Production build.                                                |
| `pnpm start`         | Serve the production build.                                      |
| `pnpm lint`          | ESLint over the repo.                                            |
| `pnpm lint:fix`      | ESLint with `--fix`.                                             |
| `pnpm format`        | Prettier write.                                                  |
| `pnpm format:check`  | Prettier check (used in CI).                                     |
| `pnpm typecheck`     | `tsc --noEmit`.                                                  |
| `pnpm test`          | Vitest unit/component tests (single run).                        |
| `pnpm test:watch`    | Vitest in watch mode.                                            |
| `pnpm test:e2e`      | Playwright smoke tests (run `pnpm build` first).                 |
| `pnpm validate:data` | Content validation — **stub**, currently a no-op that exits 0.   |
| `pnpm lighthouse`    | Lighthouse CI (`lhci autorun`) against a locally started server. |

## Dependencies

The dependency set is deliberately small. Everything below is here for a reason,
and nothing pulls in a UI kit, animation library or client-side tracker.

**Runtime**

| Package              | Why                                                                             |
| -------------------- | ------------------------------------------------------------------------------- |
| `next`               | Framework: App Router, server rendering, metadata and the built-in font loader. |
| `react`, `react-dom` | Required by Next.                                                               |

**Tooling (dev)**

| Package                                                                       | Why                                                                              |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `typescript`                                                                  | Strict type checking.                                                            |
| `@types/node`, `@types/react`, `@types/react-dom`                             | Type definitions for Node and React.                                             |
| `tailwindcss`, `@tailwindcss/postcss`, `postcss`                              | Utility CSS and its build step (Tailwind v4, CSS-first config in `globals.css`). |
| `eslint`, `eslint-config-next`                                                | Linting with Next's `core-web-vitals` and TypeScript rules.                      |
| `eslint-config-prettier`                                                      | Turns off ESLint rules that would fight Prettier.                                |
| `prettier`                                                                    | Formatting.                                                                      |
| `vitest`, `@vitejs/plugin-react`, `jsdom`                                     | Test runner, JSX transform and DOM environment for unit tests.                   |
| `@testing-library/react`, `@testing-library/dom`, `@testing-library/jest-dom` | Component assertions and accessible-role queries.                                |
| `@playwright/test`                                                            | End-to-end smoke tests on a 375px viewport.                                      |
| `@lhci/cli`                                                                   | Lighthouse CI runner that enforces the performance/SEO/accessibility budgets.    |

## Design system

- **375px baseline.** The layout is designed mobile-first at 375px and scales up.
- **Tokens as CSS variables.** `src/app/globals.css` defines warm-neutral tokens
  plus a single terracotta accent. Light is the default; dark follows
  `prefers-color-scheme`. The tokens are mapped onto Tailwind theme values, so
  utilities such as `bg-canvas`, `text-ink`, `text-ink-muted`, `border-line`,
  `bg-accent` and `text-on-accent` resolve to the variables rather than to
  hard-coded colours. Change a token once and every component follows.
- **CSS logical properties only.** Use `ms-`/`me-`/`ps-`/`pe-`,
  `start-`/`end-` and `text-start`/`text-end` — never `ml-`/`mr-`/`pl-`/`pr-`,
  `left-`/`right-` or `text-left`/`text-right`. This keeps the codebase ready for
  the Arabic RTL locale without a rewrite. The only physical values are the
  `env(safe-area-inset-*)` insets, which are physical by definition.
- **One self-hosted variable font.** Inter Variable (SIL OFL 1.1, see
  `src/app/fonts/OFL.txt`) is served from our own origin via `next/font/local`
  with `font-display: swap` and `preload`, so there is no render-blocking request
  to a third party and no flash of invisible text on slow connections.
- **Safe areas.** The root layout sets `viewport-fit=cover` and adds
  `env(safe-area-inset-*)` padding, with an explicit token-based body background.

## Continuous integration

`.github/workflows/ci.yml` runs on every push to `master`/`main` and on pull
requests, using Node 24 and pnpm, in this order:

1. `pnpm lint`
2. `pnpm typecheck`
3. `pnpm test`
4. `pnpm build`
5. `pnpm exec lhci autorun`

### Lighthouse budgets

Lighthouse runs against the production server (`pnpm start`) on the **mobile**
form factor with **Slow 4G** simulated throttling (150 ms RTT, 1638.4 kbps, 4×
CPU). The `lighthouserc.json` assertions fail the build on any error-level miss:

| Metric        | Budget    |
| ------------- | --------- |
| Performance   | `>= 0.95` |
| SEO           | `= 1.0`   |
| Accessibility | `>= 0.95` |
| LCP           | `< 2.5 s` |
| CLS           | `< 0.1`   |

> Note: Lighthouse CI's own `preset` option is a _config_ preset
> (`perf` / `experimental` / `desktop`), not the mobile form factor. The mobile
> preset is expressed explicitly through `formFactor` and `throttling` in
> `lighthouserc.json`.

## Content data

The catalogue source of truth lives in `/data/source` (the services report) and
the `activities.json`, `excursions.json` and `transfers.json` files. The
application does not consume them yet. `pnpm validate:data`
(`scripts/validate-data.mjs`) is an intentional stub that exits 0 so the pipeline
can be wired in before the real validator lands.

## Project structure

```
src/app        App Router: layout, page, global styles, self-hosted font
src/app/fonts  Vendored Inter Variable .woff2 and its OFL licence
scripts        validate:data entry point
tests/e2e      Playwright smoke tests
.github        GitHub Actions workflow
```

## Commit convention

This repository uses [Conventional Commits](https://www.conventionalcommits.org/).
