import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { enforceProductionBusinessConfig } from "./config/business";

if (
  process.env.NODE_ENV === "production" &&
  !process.env.VITEST &&
  process.env.SKIP_ENV_VALIDATION !== "true"
) {
  enforceProductionBusinessConfig();
}

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    // Inline the critical CSS for above-the-fold content to remove the
    // render-blocking CSS chunk and hit the 2500ms LCP budget on Slow 4G.
    inlineCss: true,
  },
};

export default withNextIntl(nextConfig);
