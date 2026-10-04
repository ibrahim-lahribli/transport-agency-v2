import { describe, expect, it } from "vitest";

import { guides } from "@/content/guides";

import sitemap from "./sitemap";

describe("sitemap lastModified", () => {
  const entries = sitemap();

  it("dates guide URLs from the guide's own date", () => {
    for (const guide of guides) {
      for (const slug of [guide.slug.en, guide.slug.fr]) {
        const entry = entries.find((e) => e.url.endsWith(`/guides/${slug}`));
        expect(entry, `entry for ${slug}`).toBeDefined();
        expect(new Date(entry!.lastModified!).toISOString()).toBe(
          new Date(guide.date).toISOString(),
        );
      }
    }
  });

  it("omits lastModified where no real date exists", () => {
    for (const entry of entries) {
      if (entry.url.includes("/guides/")) continue;
      expect(entry.lastModified, `${entry.url} must not claim a build date`).toBeUndefined();
    }
  });
});
