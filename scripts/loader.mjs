/**
 * Minimal Node module-resolution hook so plain `node` can import the TypeScript
 * source that uses the `@/` path alias (mapped to `src/`) and extensionless
 * relative imports. Paired with Node's built-in type stripping; no build step
 * or dependency required.
 */
import { existsSync } from "node:fs";
import { extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);

function firstExisting(baseUrl) {
  const candidates = [baseUrl.href, `${baseUrl.href}.ts`, `${baseUrl.href}/index.ts`];
  for (const candidate of candidates) {
    try {
      if (existsSync(fileURLToPath(candidate))) return candidate;
    } catch {
      // Fall through.
    }
  }
  return null;
}

export async function resolve(specifier, context, next) {
  let baseUrl = null;

  if (specifier.startsWith("@/")) {
    baseUrl = new URL(`src/${specifier.slice(2)}`, root);
  } else if (specifier.startsWith(".") && context.parentURL && extname(specifier) === "") {
    baseUrl = new URL(specifier, context.parentURL);
  }

  if (baseUrl) {
    const resolved = firstExisting(baseUrl);
    if (resolved) return next(resolved, context);
  }

  return next(specifier, context);
}
