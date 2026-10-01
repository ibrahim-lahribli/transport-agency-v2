# Specifications

A **spec** describes one unit of work before it is built: the problem, the
intended behaviour, the design, and how it will be verified. Specs are the
contract between the request and the code, and they are written to be read by an
agent with no prior conversation context.

Specs are for _intended_ work. For how the system currently works, read
[docs/](../docs/README.md); for _why_ past decisions were made, read
[docs/adr/](../docs/adr/README.md).

## Lifecycle

1. **Draft** — copy [TEMPLATE.md](TEMPLATE.md) to `NNNN-short-title.md` and fill
   it in. Keep it to one screen; link out for detail.
2. **Approved** — the user agrees to the approach. Set `status: approved`.
3. **Implemented** — build it, then set `status: done` and update
   [docs/](../docs/README.md) to match reality.
4. **Superseded** — if the approach changes, note it rather than deleting the
   spec.

## How an agent should use a spec

- Read the whole spec before editing. The **Non-goals** and **Test plan** are as
  binding as the goals.
- Respect the invariants in [AGENTS.md](../AGENTS.md) and
  [docs/seo.md](../docs/seo.md) — a spec never licenses breaking them.
- Verify against the spec's test plan, not just "it compiles".
- If reality contradicts the spec, stop and surface it rather than silently
  diverging.

## Index

| Spec                     | Status                                      |
| ------------------------ | ------------------------------------------- |
| [roadmap.md](roadmap.md) | living — prioritised candidate work         |
| _next feature_           | copy [TEMPLATE.md](TEMPLATE.md) to `0001-…` |
