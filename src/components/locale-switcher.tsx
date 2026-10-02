"use client";

import { usePathname } from "next/navigation";

export interface LocaleSwitcherProps {
  locale: string;
  label: string;
  ariaLabel: string;
  /** EN slug <-> FR slug map so product pages keep their place. */
  slugAlternates: Record<string, string>;
}

/**
 * Switches language while staying on the same page. Next.js's raw `usePathname`
 * gives the full path including the locale; we swap the first segment and, for
 * a product page (a single dynamic segment), the localized slug.
 */
export function LocaleSwitcher({ locale, label, ariaLabel, slugAlternates }: LocaleSwitcherProps) {
  const pathname = usePathname() || "/";
  const other = locale === "fr" ? "en" : "fr";

  const segments = pathname.split("/").filter(Boolean);
  // Drop the leading locale segment.
  const rest = segments[0] === locale ? segments.slice(1) : segments;

  if (rest.length === 1 && slugAlternates[rest[0]]) {
    rest[0] = slugAlternates[rest[0]];
  }

  const href = `/${[other, ...rest].join("/")}`;

  return (
    <a
      href={href}
      hrefLang={other}
      aria-label={ariaLabel}
      className="inline-flex min-h-[40px] items-center rounded-md border border-line px-3 py-1.5 text-sm font-semibold text-ink hover:border-accent hover:text-accent-strong"
    >
      {label}
    </a>
  );
}
