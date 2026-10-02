---
name: spec-driven-development
description: Turn a feature request into an agreed specification before writing code, then implement to spec in small verified tasks. Use when starting a new feature or a change too large for a single commit, or when asked to plan, spec or design work.
metadata:
  version: "1.0"
  audience: coding-agents
---

# Spec-driven development

Write the spec first; let it be the shared source of truth. A good spec covers
just enough nuance to remove ambiguity without overwhelming the reader.

## 1. Specify (what & why)

- Draft from [specs/TEMPLATE.md](../../../specs/TEMPLATE.md): objective, users
  and journeys, scope, and an explicit **out of scope** section.
- Keep it to 1–3 pages. Split it if it grows.
- Stay goal-oriented: describe outcomes and acceptance criteria, not code.

## 2. Plan (how)

- Add the technical shape: stack, data model, constraints, risks, and which
  existing modules own which concern (see
  [docs/architecture.md](../../../docs/architecture.md)).
- Question the design: is there a simpler structure? Does it duplicate an
  existing owner? Flag anything that needs a decision.

## 3. Tasks

- Break the plan into small, independently testable chunks. Each task should be
  implementable and verifiable on its own.

## 4. Implement

- Build one task at a time, verifying before moving on.
- Keep the spec current: if reality diverges, update the spec rather than
  letting it drift.

## 5. Verify & record

```bash
node_modules/.bin/eslint .
node_modules/.bin/tsc --noEmit
node_modules/.bin/vitest run
node_modules/.bin/next build
```

- Add `pnpm validate:data` for content changes, `pnpm test:e2e` for
  route/metadata/i18n changes.
- If the decision was architectural, add an ADR from
  [docs/adr/template.md](../../../docs/adr/template.md).
- Report the objective, the tasks completed, and the acceptance criteria met.
