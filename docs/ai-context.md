# AI context layer

How the files that instruct AI coding agents fit together. The goal is
**progressive disclosure**: a small root contract that points to deeper files
only when a task needs them.

## Source of truth

[AGENTS.md](../AGENTS.md) at the repository root is the canonical, tool-agnostic
contract. Everything else either points at it or expands one concern of it.

## The layers

| Layer            | Files                                                        | Loaded when               |
| ---------------- | ------------------------------------------------------------ | ------------------------- |
| Root contract    | `AGENTS.md`                                                  | always                    |
| Tool adapters    | `CLAUDE.md`, `GEMINI.md`, `.github/copilot-instructions.md`, `.cursor/rules/*.mdc` | on tool start / glob match |
| Knowledge base   | `docs/*.md`                                                  | when linked / relevant    |
| Decisions        | `docs/adr/*.md`                                              | when reviewing a choice   |
| Specs            | `specs/*.md`                                                 | when building a feature   |
| Skills           | `.agents/skills/*/SKILL.md`                                  | when a workflow is invoked |

## Rules for humans and agents

- **Hand-write context; never auto-generate it.** A study (ETH Zurich, Feb 2026)
  found LLM-generated context files *reduce* task success. Precision beats
  volume.
- **One concern per file.** A rule belongs in exactly one place; link to it
  rather than repeating it.
- **Keep the root small.** `AGENTS.md` holds only what is relevant to *every*
  task. Detail goes to `docs/` or a skill.
- **Describe capabilities, not file paths.** Paths drift; stale paths mislead.
- **Never let docs go stale.** `pnpm check:docs` validates skill frontmatter and
  Markdown links in CI.

## Skills

Reusable workflows live in `.agents/skills/<name>/SKILL.md` with `name` and
`description` frontmatter. Current set: `review`, `architect`, `seo-audit`,
`add-service`, `spec-driven-development`, `docs-maintenance`.

To use them from Claude Code, link the directory once:
`ln -s ../.agents/skills .claude/skills`.
