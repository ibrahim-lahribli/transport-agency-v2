# Architecture Decision Records

Short, dated notes recording _why_ a decision was made, so later changes build
with it rather than against it. One file per decision, numbered, never deleted —
supersede instead.

## Process

1. Copy [template.md](template.md) to `NNNN-short-title.md` (next number).
2. Fill in context, decision and consequences; keep it to one screen.
3. Set status `proposed` → `accepted` (or `superseded by NNNN`).
4. Link it from the relevant doc and, if it changes rules, from `AGENTS.md`.

## Records

| ADR                                      | Title                                      | Status   |
| ---------------------------------------- | ------------------------------------------ | -------- |
| [0001](0001-adopt-next-intl-messages.md) | Adopt next-intl with message catalogues    | accepted |
| [0002](0002-publish-gate.md)             | Publish gate on catalogue reads            | accepted |
| [0003](0003-service-slug-routes.md)      | Service slug routes with locale alternates | accepted |
