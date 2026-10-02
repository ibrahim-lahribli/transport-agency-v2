import { defineConfig } from "@playwright/test";

// The production placeholder check is for real deployments; local/CI runs skip it.
process.env.SKIP_ENV_VALIDATION ??= "true";

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      // 375px is the design baseline for this mobile-first site.
      name: "mobile-chromium",
      use: {
        browserName: "chromium",
        viewport: { width: 375, height: 812 },
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: {
    // Serve the already-built output; run `next build` first.
    // Invoke the Node entry directly so it works cross-platform.
    command: "node node_modules/next/dist/bin/next start -p 3000",
    url: `${baseURL}/en`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      ...process.env,
      SKIP_ENV_VALIDATION: "true",
      NEXT_TELEMETRY_DISABLED: "1",
    },
  },
});
