# GEMINI.md

The canonical context for this repository is **[AGENTS.md](AGENTS.md)**. Read it
first. Deep detail lives in [docs/](docs/README.md) and planned work in
[specs/](specs/README.md).

Gemini CLI can be pointed at it directly via `.gemini/settings.json`:

```json
{ "context": { "fileName": "AGENTS.md" } }
```

Essential rules (full list in `AGENTS.md`):

- One `<h1>`, one canonical and reciprocal `en`/`fr`/`x-default` hreflang per
  indexable page; `/book` is `noindex`.
- Never invent prices or durations; never bypass the publish gate
  (`status: "published"`).
- UI copy lives in `messages/{en,fr}.json`; service copy in `content/{en,fr}`.
- CSS logical properties only (`ms/me/ps/pe`, `start/end`).
- Keep dependencies tiny; leave lint, typecheck, unit and build green.
