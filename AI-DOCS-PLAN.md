# AI-DOCS-PLAN.md — making this repo legible to AI agents

- Date: 2026-09-30
- Status: proposed
- Companion: [PLAN.md](PLAN.md) (part P5 owns the execution of this document)

## Why

An agent arriving cold must answer five questions fast:

1. Where does content truth live?
2. What may never be published?
3. What are the writing rules?
4. How was each fact verified, and how confident are we?
5. How do I check my work?

Today those answers are implicit: spread across the research notes, `site.json` `contentRules`, and one session's context. That is why the previous session rebuilt its own checks from scratch.

## Principles

- One file per concern. Short and imperative.
- Lead with where things live and what the rules are, not with history.
- Link, never duplicate. A fact stated twice will contradict itself.
- Every doc has a freshness rule and, where possible, a check.
- A doc an agent cannot act on is not a doc.

## The doc set

| File | Purpose | Contents | Definition of Done |
|---|---|---|---|
| `AGENTS.md` (root) | Single entry point for any agent | Repo map; golden rules; forbidden actions; how to run checks; links to every doc | A cold agent reads only this and can locate truth, rules and checks |
| `docs/PROJECT.md` | Business context | Agadir, WhatsApp requests, no online payment, EUR/MAD, customer nationalities, pickup zones, brand is a placeholder | No invented brand name, phone, rating or year-count anywhere |
| `docs/CONTENT-MODEL.md` | Field model and publish boundary | Every field per product, its type, and whether it is published or internal; the canonical time formats | Lists every key present in the content files; marks `research` as internal; a validator can be written from it alone |
| `docs/WRITING-RULES.md` | Canonical rules | Forbidden words; allowed substitutions (driver/host, request/check availability); never call coastal dunes Sahara; never promise swimming, goats or birds; no prices in copy; keyword placement | Copy-pasteable into a linter; matches `site.json` `contentRules` with no contradictions |
| `docs/RESEARCH-PROTOCOL.md` | How facts are established | Source hierarchy (official, then guidebooks and mapping, then traveller reviews); competitor pages for durations only; citation format URL + title + accessed + supports; confidence levels verified/likely/unverified; conflict rule (show both, take conservative) | Every row in `research/*.md` conforms to it; dates are `YYYY-MM-DD` |
| `docs/PRODUCT-MAP.md` | The 12 products at a glance | id, category, one-line intent, primary keyword EN/FR, what makes it distinct from its sibling | `timlalin-dunes` versus `quad-buggy-forest` are explicitly differentiated; every id matches the content files |
| `docs/I18N.md` | Language policy | EN primary, FR draft for native review, ES/DE/NL later; where translations live; who approves French | States which fields are translated and which are EN-only |
| `docs/PUBLISH-CHECKLIST.md` | The ritual | Steps: edit content file, run checks, confirm runner, merge, re-run; what must never change (price, status, slug, confirmFlags) | An agent can follow it unaided and not corrupt operational fields |
| `docs/decisions/ADR-000x.md` | Conventions recorded | The agreed decisions listed below | Each ADR states context, decision, consequence |
| `research/README.md` | How the evidence layer works | What a note contains; that it is never published; that content files are authoritative; how to add a product | A reader knows research is evidence, not copy |
| `tools/README.md` | How to run the checks | Commands, what each checks, how to add a rule | One command documented and runnable |

## ADRs to record immediately

1. `pickupWindow` and `returnApprox` are canonical and describe the default (first) daily slot.
2. `departures` holds fixed clock times and is kept only where a product runs more than one slot a day.
3. `schedule` survives only where it carries detail the other two fields cannot express.
4. `durationHours` is always a number; ranges live in the copy.
5. The `research` block is internal and never enters the content files.
6. Coastal dunes are never described as Sahara; the denial sentence is used where helpful.
7. Safety norms are labelled "typical industry practice, to be confirmed by our operator".

## AGENTS.md skeleton

```
# AGENTS.md

## What this repo is
## Where the truth lives
## Never publish
## Writing rules
## How to check your work
## Non-negotiables (never touch price, status, slug, confirmFlags)
## Map of the docs
## Open blockers
```

## Maintenance rules

- A doc changes in the same commit as the thing it describes.
- Any rule added to a doc gets a linter rule within one sprint, or the doc says it is unenforced.
- `AGENTS.md` links every doc; an unlinked doc is deleted or linked.
- Research notes are append-and-date, never rewritten.

## Definition of Done (whole plan)

- `AGENTS.md`, the nine docs and `research/README.md` exist and are linked from `AGENTS.md`.
- Every doc in the table meets its own DoD column.
- The seven ADRs are written.
- A cold agent, given only `AGENTS.md`, can answer the five opening questions correctly.
- No doc contradicts `site.json` `contentRules` or the content files.

## Risks

| Risk | Mitigation |
|---|---|
| Docs rot | Same-commit rule; linter enforcement where possible |
| Over-documentation | One file per concern, short and imperative; no history |
| Duplication across docs | Link, never restate; `CONTENT-MODEL` is the single field authority |
| Agent ignores docs | The P3 check command is the enforcement point, not the prose |
