import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Turn off stylistic rules that would fight Prettier.
  prettier,
  // Keep generated, vendored and content output out of linting.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    "blob-report/**",
    ".lighthouseci/**",
    "next-env.d.ts",
    // Untracked Figma design export kept on disk as a visual reference.
    "agency-design-v2/**",
  ]),
]);

export default eslintConfig;
