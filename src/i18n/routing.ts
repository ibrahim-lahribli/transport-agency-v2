import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

import { defaultLocale, locales } from "./locales";

export const routing = defineRouting({
  locales,
  defaultLocale,
  // Always prefix the locale, and never auto-detect: the URL is the single
  // source of truth for language, which keeps canonical + hreflang honest.
  localePrefix: "always",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/excursions": "/excursions",
    "/activities": "/activities",
    "/transfers": "/transfers",
    "/book": "/book",
    "/places": "/places",
    "/places/[place]": "/places/[place]",
    "/guides": "/guides",
    "/guides/[guide]": "/guides/[guide]",
    "/about": "/about",
    "/contact": "/contact",
    "/faq": "/faq",
    // Product pages carry a localized slug that next-intl cannot know; the
    // locale switcher resolves the counterpart slug from the catalogue.
    "/[slug]": "/[slug]",
  },
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
