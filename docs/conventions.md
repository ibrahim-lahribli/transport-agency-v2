# Conventions

## Language & types

- TypeScript **strict**. No `any` — narrow with guards (see `isAppLocale`) and
  real types.
- Import with the `@/` alias for `src/*`; use relative paths for `content/` and
  `config/`.
- Keep modules pure where possible (`src/pricing/quote.ts` and `src/seo/*` are
  free of React).

## Formatting

- Prettier is the formatter of record (`pnpm format` / `pnpm format:check`), and
  ESLint is set up with `eslint-config-prettier` so the two don't fight.
- Match the surrounding file (2-space indent, double quotes, trailing commas).

## CSS

- Tailwind CSS v4 with the design tokens in `src/app/globals.css` (the
  agency-design-v2 identity: cream/sand/paper surfaces, deep green-black ink,
  one terracotta accent, olive for trust marks; **light-only**). Use token
  utilities: `bg-canvas`, `bg-surface`, `text-ink`, `text-ink-muted`,
  `border-line`, `bg-accent`, `text-on-accent`, `text-olive`, `text-error`.
- Type: Playfair Display (`--font-serif`, headings) + DM Sans (`--font-sans`,
  body), loaded with `next/font/google` in the locale layout. Display sizes
  use the clamped `text-display` / `text-2xl` / `text-xl` scale.
- **CSS logical properties only.** Use `ms/me/ps/pe`, `start/end`, `inset-bs/be`,
  `text-start/end`. Never `ml/mr/pl/pr`, `left/right`, `text-left/right`.
  Symmetric shorthands (`mx/my/px/py`) are fine.
- Mobile-first at a **375px** baseline; scale up with `sm:`/`md:`/`lg:`.
- The design uses `shadow-card` on floating cards and directional gradient
  overlays on photos; both are part of the identity. Still no animation
  libraries beyond simple `transition-*`.

## Components

- Server components by default. Add `"use client"` only when needed (the locale
  switcher, the live quote, the booking form).
- Accessibility: one `<h1>` per page, `aria-current` on breadcrumbs, real
  `<button>`/`<a>` elements, and visible focus styles.
- Reuse the shared building blocks (`src/components/ui.tsx`: `ButtonLink`,
  `Eyebrow`, `SectionHeading`, `Tag`, `PageIntro`, `Accordion`) rather than
  re-implementing layout.

## Commits

- [Conventional Commits](https://www.conventionalcommits.org/): `feat|fix|chore|
docs|refactor|test|ci(scope): summary`, lowercase, imperative.
- One coherent change per commit. Do not commit or push unless asked.

## Dependencies

- Deliberately tiny. No UI kit, animation library, tracker or third-party runtime
  script. Ask before adding anything, and prefer the platform and existing deps.

## Naming

- Service files: kebab-case matching the service `id` (`boat-cruise.ts`).
- Catalog locale indexes: `content/{en,fr}/index.ts`.
- Skills: `.agents/skills/<kebab-name>/SKILL.md`.
