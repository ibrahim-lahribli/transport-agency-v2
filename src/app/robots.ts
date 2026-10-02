import type { MetadataRoute } from "next";

import { SITE_URL } from "@/seo/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow crawling broadly, including known AI crawlers, but keep the
        // noindex booking form out of the crawl.
        userAgent: "*",
        allow: "/",
        disallow: ["/book", "/*/book"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
