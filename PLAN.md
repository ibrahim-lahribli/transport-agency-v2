# PLAN.md — Agadir content build, current state to launch

- Date: 2026-09-30
- Status: active
- Scope: the 12 product pages (6 excursions, 6 activities)
- Companion: [AI-DOCS-PLAN.md](AI-DOCS-PLAN.md)

## 1. Verified baseline

| Item | State |
|---|---|
| Products | 12, correct order, in `excursions.json` (6) and `activities.json` (6) |
| Content merge | Done; every patch field folded in |
| Schema check | Passes; no price/status/confirmed/slug added; `durationHours` is a number |
| Writing-rule check | Passes; no forbidden words, no prices or fees in published copy |
| Keyword check | Passes; primary keyword once in summary, once in SEO description |
| Preserved-field check | Passes; 0 drift across price, status, slug, confirmFlags, title, category, order, primaryKeyword, capacity, languages, host, cancellationPolicy, contentNote, privateRate |
| Evidence layer | `research/<id>.md` x12 + `research/summary-of-discrepancies.md` (45 rows) |
| Backups | `.backup-originals/` |
| Blockers | 6 rows marked "blocks publication" |

Checkpoint command:

```bash
node -e "for(const f of ['excursions.json','activities.json']){const a=JSON.parse(require('fs').readFileSync(f,'utf8'));console.log(f,a.length,'products OK')}"
```

## 2. Architecture findings

- **A1 — three copies of content exist.** `patches/` is now a stale duplicate: the `schedule` and `days` corrections to `agadir-city-tour` and `quad-buggy-forest` landed in the content files but not in `patches/`. Remove or archive it.
- **A2 — three concern types are mixed with no enforced boundary** in each product object: publishable copy, operational config, and internal evidence (the `research` block).
- **A3 — correctness depends on hand-run scripts.** Nothing in the repo can re-run this session's checks.
- **Target shape:** one owner per fact. `research/` = evidence, `docs/` = rules, `tools/` = checks.

## 3. Options

The brainstorm weighed ten options; six were selected (retire the duplicate, JSON Schema, content linter as a gate, explicit internal/publish split, an operator answers file, and the AI docs) and four deferred (bulk source re-checking, ES/DE/NL expansion, catalogue consolidation, deleting the backups).

## 4. The plan, part by part

### P0 — Freeze and checkpoint

**Goal:** make the verified state impossible to lose.

**Tasks**
- Create version control and commit the tree as the first commit.
- Decide the fate of `.backup-originals/` — keep under VCS or delete.
- Store the check scripts somewhere runnable.

**Definition of Done**
- A commit reproduces today's verified state bit-for-bit.
- The checkpoint command in section 1 exits `0`.
- The pre-merge copies are either under version control or scheduled for deletion, not left ambiguous.

### P1 — Clear the six publication blockers

**Goal:** no page carries a claim a traveller could be misled by.

**Blockers:** Timlalin transfer time; Timlalin duration; Souk El Had Monday closure; Majorelle timed tickets; evening venue; evening programme.

**Tasks**
- Send the operator questionnaire and capture answers in one file.
- Apply each answer to the content file, leaving `price`, `status`, `slug` and `confirmFlags` untouched.
- Use the conservative fallback recorded in the discrepancy table where the operator cannot confirm.
- Re-run the checks after each edit.

**Definition of Done**
- Zero rows remain marked "blocks publication" in `research/summary-of-discrepancies.md`.
- `agadir-city-tour` never offers a stop on a day it cannot happen.
- `timlalin-dunes` states a transfer and duration matching the site actually used.
- `marrakech` records how Majorelle access is obtained, or marks the visit optional.
- `moroccan-evening` names its venue and programme, or is explicitly unpublished.

### P2 — One owner per fact

**Goal:** remove the stale-copy risk proven in A1.

**Tasks**
- Decide the fate of `patches/`: delete it, or archive it clearly marked superseded.
- Delete or ignore `.backup-originals/` once P0 is done.
- Add a header to the research notes stating the content files are authoritative.

**Definition of Done**
- Exactly one file per product contains publishable copy.
- A repo-wide search for the `agadir-city-tour` schedule string returns the content file only.
- No file claims to hold current content while holding stale content.

### P3 — Make correctness automatic

**Goal:** turn this session's manual checks into a gate.

**Tasks**
- Add a JSON Schema for a product object and validate both content files.
- Extend the linter to forbidden words, prices and fees in published fields, primary-keyword counts, summary word range, highlight count and length, FAQ count, SEO title and description lengths, and `HH:MM to HH:MM` time formats.
- Add a check that no `research` block appears in the content files.
- Wire everything into one command.

**Definition of Done**
- One command runs schema validation plus the content lint and exits non-zero on any violation.
- A deliberate violation (for example "breathtaking" in a summary) fails it with a message naming the field.
- Removing the violation passes it again.
- Both current content files pass as written.

### P4 — French native review

**Goal:** move the French from draft to publishable.

**Tasks**
- Export the 12 French text sets labelled "draft for native review".
- Capture and apply corrections to the French fields only.
- Keep a reviewer note recording what changed and why.

**Definition of Done**
- A native reviewer has explicitly approved all 12 French text sets.
- No field still carries the "draft for native review" marker once approved.
- The English copy is unchanged by this part.

### P5 — AI documentation scaffolding

**Goal:** any future session finds truth, rules and evidence without re-deriving them.

**Detail:** [AI-DOCS-PLAN.md](AI-DOCS-PLAN.md).

**Definition of Done**
- `AGENTS.md`, the `docs/` set and `research/README.md` exist as specified in the companion plan.
- A fresh agent given only `AGENTS.md` can state where truth lives, what may never be published, and how to run the checks.
- Every doc is linked from `AGENTS.md`; no orphans.

### P6 — Launch readiness

**Goal:** satisfy the blockers `site.json` already declares.

**Tasks**
- Work the `launchBlockers` list: brand and domain, WhatsApp number, licence, transport authorisation, insurance, owner confirmation of prices and policies, photos with rights, CNDP, lawyer review.
- Turn the `site.json` build rule into an actual failing gate.

**Definition of Done**
- `site.json` `launchBlockers` is empty.
- All `confirmed` flags on published items are true.
- All `placeholder` flags are false.
- A build run fails today and passes only when the above hold.

## 5. Sequencing

| Order | Part | Depends on |
|---|---|---|
| 1 | P0 checkpoint | — |
| 2 | P3 checks | P0 |
| 3 | P2 dedupe | P0 |
| 4 | P5 AI docs | P0, informed by P3 |
| 5 | P1 blockers | operator answers |
| 6 | P4 French review | P1 |
| 7 | P6 launch | all |

## 6. Out of scope

- Transfers, pricing, legal and licensing questions.
- Restructuring `site.json`.
- Any UI or site build. The /experience pass was requested, but this repo has no interface, so experience polish is out of scope.

## 7. Risks

| Risk | Mitigation |
|---|---|
| Operator never answers | Apply the recorded conservative fallbacks; unpublish the unverified page |
| Direct edits bypass checks | The P3 gate plus the P5 docs |
| Docs drift from reality | Each doc DoD ties it to the files |
| The two catalogue `.txt` files diverge | Deferred item 9; revisit when intent changes |
| `patches/` consulted after P2 | Superseded header, or deletion |
