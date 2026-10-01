# Documentation

Single source of truth for how this project works. Anything an agent or a new
teammate needs beyond the root [AGENTS.md](../AGENTS.md) lives here.

## Reading order

1. [architecture.md](architecture.md) — how the system is put together and how
   data flows.
2. [conventions.md](conventions.md) — code style, CSS rules, commits, deps.
3. [content-model.md](content-model.md) — the service catalogue, publish gate
   and validation rules.
4. [seo.md](seo.md) — the SEO invariants every page must satisfy.
5. [pricing.md](pricing.md) — the quote engine and the display-price rule.
6. [i18n.md](i18n.md) — locales, messages, routing and the locale switcher.
7. [testing.md](testing.md) — the suites, how to run them and what to add.
8. [glossary.md](glossary.md) — domain and code vocabulary.

## Reference

- Decisions: [adr/](adr/README.md)
- Feature specifications: [../specs/](../specs/README.md)
- Reusable workflows: [../.agents/skills/](../.agents/skills)
- Review report: [../reports/project-review.md](../reports/project-review.md)

## Keeping this current

Docs are living. When you change behaviour, update the matching page in the same
change; a stale doc is a bug. Prefer linking to a file over pasting its contents.
