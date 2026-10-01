import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { LOCALES, DEFAULT_LOCALE } from "./locales";

export * from "./locales";

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "always",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/excursions": "/excursions",
    "/activities": "/activities",
    "/transfers": "/transfers",
    "/book": "/book",
    "/[slug]": "/[slug]",
  },
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
