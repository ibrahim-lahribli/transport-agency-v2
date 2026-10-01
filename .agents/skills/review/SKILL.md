---
name: review
description: Adversarially review a change in this repository with fresh eyes. Use when asked to review, validate, double-check or sanity-check work, or before committing a change. Traces real code paths for boundary, null, async and state bugs, runs the project checks, and previews the live page.
metadata:
  version: "1.0"
  audience: coding-agents
---

# Review a change

Review the work as if someone else wrote it. Assume the tests are the weakest
evidence, not the strongest — a green suite can still ship a wrong price (both
the visible price and the JSON-LD price can come from the same buggy function).

## 1. Establish the scope

- `git status` and `git diff` (and `git diff --cached`) to see exactly what
  changed. Do not review unrelated pre-existing state.
- Read the **surrounding code**, not just the diff — callers, helpers and the
  modules the change depends on.

## 2. Trace the paths for the way they break

Check each, concretely:

- **Boundaries / off-by-one:** loops, slices, indexes, `slice(length + 1)` style
  arithmetic, rounding (`%`, `Math.round`, minute→hour carries).
- **Null / empty / undefined:** missing fields, empty arrays, `null` vs absent,
  zero amounts, invalid input to formatters.
- **Async / order of init:** locale/context set before use, `await` ordering,
  client components that need a provider, redirects vs `notFound`.
- **State & data sync:** the same value rendered in two places (visible price vs
  `Offer.price`, switcher href vs canonical) — do they derive from one source?
- **Leaks / side effects:** listeners, servers started and not stopped, files
  written outside the tree.

## 3. Run the checks for real

```bash
node_modules/.bin/eslint .
node_modules/.bin/tsc --noEmit
node_modules/.bin/vitest run
node_modules/.bin/next build
```

Then, for behaviour you can see, run the production server and drive it:

```bash
node_modules/.bin/next start -p 3100     # in the background
# Playwright against the fresh build:
PLAYWRIGHT_BASE_URL=http://localhost:3100 node_modules/.bin/playwright test
```

Beware of a **stale server** on another port answering your curls. Build a URL
from the sitemap's path (`${s#http://localhost:3000}`), never by concatenating a
base with an absolute URL, and confirm which process owns the port.

## 4. Check the live page

For a UI change, register/attach the preview and confirm it renders, then read
`preview_logs` for console/page errors. A blank render or an error is a defect
regardless of how clean the code reads. Exercise the interactive bits (click the
locale switcher, submit a form).

## 5. Fix only genuine defects

- Edit only correctness/security defects introduced by the change, or gaps that
  block its intended behaviour. Keep fixes scoped.
- Report worthwhile out-of-scope findings without editing them.
- Never weaken an assertion or the SEO invariants to make a test pass.

## 6. Report

State what you checked, what you found, what you fixed, and what you are leaving
alone. Include the exact commands and their results, and call out any false
alarms you chased so they aren't mistaken for defects.

## Reference

- [AGENTS.md](../../../AGENTS.md) — invariants.
- [docs/testing.md](../../../docs/testing.md) — suites and commands.
- [seo-audit skill](../seo-audit/SKILL.md) — the SEO-specific checklist.
