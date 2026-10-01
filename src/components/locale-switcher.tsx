"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Locale switcher that preserves the current page instead of always dropping
 * the visitor on the other locale's homepage.
 *
 * The service slug is localized (EN and FR slugs differ), so a plain prefix
 * swap is not enough: we resolve the counterpart slug from the catalog map that
 * the server layout injects. Hub slugs are identical in both locales.
 */
export function LocaleSwitcher({
  currentLocale,
  targetLocale,
  label,
  ariaLabel,
  slugAlternates,
}: {
  currentLocale: string;
  targetLocale: string;
  label: string;
  ariaLabel: string;
  slugAlternates: Record<string, string>;
}) {
  const pathname = usePathname() || `/${currentLocale}`;

  // Strip the current locale prefix and any leading slash:
  // "/en/excursions" -> "excursions", "/en" -> "".
  const rest = (
    pathname.startsWith(`/${currentLocale}`) ? pathname.slice(currentLocale.length + 1) : pathname
  ).replace(/^\/+/, "");

  let targetPath = `/${targetLocale}`;

  if (rest.length > 0) {
    const [head, ...tail] = rest.split("/");
    const resolvedHead = tail.length === 0 && slugAlternates[head] ? slugAlternates[head] : head;
    targetPath = `/${targetLocale}/${[resolvedHead, ...tail].join("/")}`;
  }

  return (
    <Link
      href={targetPath}
      className="rounded border border-line ps-2.5 pe-2.5 py-1.5 text-xs font-semibold text-ink hover:text-accent hover:border-accent transition-colors inline-flex items-center min-h-[32px]"
      aria-label={ariaLabel}
      hrefLang={targetLocale}
    >
      {label}
    </Link>
  );
}
