---
name: architect
description: Step back and reshape code so each concern has one clear owner. Use when asked to architect, restructure, refactor for clarity, reduce duplication, or define module boundaries, or when a change feels tangled. Preserves behaviour and verifies with the project checks.
metadata:
  version: "1.0"
  audience: coding-agents
---

# Architecture pass

Change the **shape** of the code, not its behaviour or features. Favour the
simplest structure that keeps each concern understandable on its own.

## 1. Map the current structure

- Draw the data flow and who reads from whom. In this repo the intended shape is
  documented in [docs/architecture.md](../../../docs/architecture.md).
- Name each concern and find its owner. The recurring smells here:
  - **More than one reader of the same source** (e.g. `content/*` imported
    directly instead of through `src/seo/content.ts`).
  - **One value produced in two places** (visible price vs JSON-LD price).
  - **Dead layers** (a configured dependency nobody consumes).
  - **Duplicated policy** (the same rule enforced in several spots).

## 2. Decide the structure

- Give each piece of state **one owner**; separate core logic from rendering,
  engine from interface, data from presentation.
- Justify every boundary by _clarity_, not ceremony — do not add indirection the
  structure does not need. Collapsing indirection is as valid as adding it.
- Prefer moving logic to where it belongs over rewriting it.

## 3. Restructure

- Preserve behaviour. If you cannot verify behaviour is unchanged, you are
  refactoring wrong.
- Make each move mechanical and reviewable; keep public APIs stable where
  reasonable.
- Delete the indirection the new shape no longer needs (unused exports, dead
  modules).

## 4. Verify

```bash
node_modules/.bin/eslint .
node_modules/.bin/tsc --noEmit
node_modules/.bin/vitest run
node_modules/.bin/next build
```

Run the E2E suite when routes, metadata or data access moved, and drive the live
page for anything user-visible. Confirm the same behaviour as before.

## 5. Record the result

- Update [docs/architecture.md](../../../docs/architecture.md) to the structure
  you left behind, so later passes build with it rather than against it.
- If a decision was architectural, add an ADR from
  [docs/adr/template.md](../../../docs/adr/template.md).
- Report the new structure briefly: owners, flow, and what you deleted.
