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
  // Drop the framework fingerprint header.
  poweredByHeader: false,
  experimental: {
    // Inline the critical CSS for above-the-fold content to remove the
    // render-blocking CSS chunk and hit the 2500ms LCP budget on Slow 4G.
    inlineCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    // Category aliases point at the canonical product URL.
    return ["excursions", "activities", "transfers"].map((hub) => ({
      source: `/:locale(en|fr)/${hub}/:slug`,
      destination: "/:locale/:slug",
      permanent: true,
    }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
