# CLAUDE.md

@AGENTS.md

The line above imports the canonical context in [AGENTS.md](AGENTS.md). This file
only adds Claude-specific notes — do not restate project rules here.

## Claude Code notes

- **Skills:** reusable workflows live in [.agents/skills/](.agents/skills). To
  let Claude Code discover them natively, link the directory once from the repo
  root: `ln -s ../.agents/skills .claude/skills`. Keeping one copy avoids drift.
- **Explore first:** use a read/search subagent for broad questions instead of
  reading whole directories.
- **Scope discipline:** keep each change focused; never commit, push or open PRs
  unless the user asks.
- **Verify, don't assume:** run the checks in `AGENTS.md → Before you finish`;
  the build, typecheck, unit and Playwright suites are the source of truth.
