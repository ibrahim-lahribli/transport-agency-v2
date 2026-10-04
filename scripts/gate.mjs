#!/usr/bin/env node
/**
 * The full local gate in one command:
 *   lint -> typecheck -> unit -> validate:data -> check:docs -> build -> E2E
 *
 * It reproduces the numbers in the review findings' gate table. Mirrors CI and
 * `playwright.config.ts`: `SKIP_ENV_VALIDATION` skips the placeholder
 * business-config guard locally, and the build uses `NEXT_PUBLIC_SITE_URL`
 * (default `http://localhost:3000`). Playwright starts and stops its own server.
 *
 * Override the origin if the default port is taken:
 *   PLAYWRIGHT_BASE_URL=http://localhost:3210 \
 *     NEXT_PUBLIC_SITE_URL=http://localhost:3210 pnpm gate
 *
 * Steps are fail-fast: a later gate assumes the earlier ones passed.
 */
import { spawnSync } from "node:child_process";
import { join } from "node:path";

const env = {
  ...process.env,
  SKIP_ENV_VALIDATION: process.env.SKIP_ENV_VALIDATION ?? "true",
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

// OS-native separators: cmd.exe does not resolve a forward-slash bin path.
const bin = (tool) => join("node_modules", ".bin", tool);

const steps = [
  { name: "lint", command: `${bin("eslint")} .` },
  { name: "typecheck", command: `${bin("tsc")} --noEmit` },
  { name: "unit", command: `${bin("vitest")} run` },
  { name: "validate:data", command: "node scripts/validate-data.mjs" },
  { name: "check:docs", command: "node scripts/check-docs.mjs" },
  { name: "build", command: `${bin("next")} build` },
  { name: "e2e", command: `${bin("playwright")} test` },
];

const results = [];
for (const step of steps) {
  process.stdout.write(`\n▶ ${step.name}\n`);
  const started = Date.now();
  const result = spawnSync(step.command, { stdio: "inherit", env, shell: true });
  const ok = result.status === 0;
  results.push({ name: step.name, ok, seconds: (Date.now() - started) / 1000 });
  if (!ok) break;
}

process.stdout.write("\n── gate summary ──\n");
for (const r of results) {
  process.stdout.write(`${r.ok ? "PASS" : "FAIL"}  ${r.name} (${r.seconds.toFixed(1)}s)\n`);
}

const failed = results.find((r) => !r.ok);
if (failed) {
  process.stderr.write(`\nGate failed at: ${failed.name}\n`);
  process.exit(1);
}
process.stdout.write("\nAll gates passed.\n");
