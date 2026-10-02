---
name: docs-maintenance
description: Keep the AI context and knowledge base truthful and minimal. Use when docs feel stale, after a structural change, or when asked to tidy agent instructions, docs or specs.
metadata:
  version: "1.0"
  audience: coding-agents
---

# Docs maintenance

Stale docs actively mislead agents — worse than missing docs. Keep the context
layer small, accurate and progressively disclosed.

## 1. Check for rot

```bash
node scripts/check-docs.mjs     # pnpm check:docs
```

Then read [docs/ai-context.md](../../../docs/ai-context.md) and scan for:
- instructions that no longer match the code,
- the same rule stated in two places (pick one owner),
- root `AGENTS.md` growing beyond what applies to *every* task.

## 2. Fix the structure

- Move one-domain rules out of `AGENTS.md` into the relevant `docs/` file, and
  leave a link behind.
- Describe **capabilities**, not file paths, which drift.
- Never auto-generate context files; hand-write them.

## 3. Keep it green

- `node scripts/check-docs.mjs` must pass (frontmatter + Markdown links).
- Every `SKILL.md` keeps `name` and `description` frontmatter.
- Report what you moved, what you deleted, and any contradiction you resolved.
