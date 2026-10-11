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
      className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-transparent px-3 font-semibold text-ink hover:border-line hover:text-accent-strong"
    >
      {label}
      <span aria-hidden="true" className="mt-1 block size-2 rotate-45 border-b border-e border-current" />
    </a>
  );
}
