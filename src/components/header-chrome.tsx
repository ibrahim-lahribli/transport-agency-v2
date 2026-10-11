"use client";

import { useState } from "react";

import { Link } from "@/i18n/routing";
import { LocaleSwitcher } from "./locale-switcher";

/**
 * Client wrapper for the design's header chrome: the mobile menu toggle and
 * the bar it spans. The server `Header` passes its translated pieces in, so
 * no translation happens client-side. `.shell`-aligned like the design.
 */
type MobileLinkHref =
  | "/excursions"
  | "/activities"
  | "/transfers"
  | "/places"
  | "/guides"
  | "/about"
  | "/faq"
  | "/contact";

export function HeaderChrome({
  locale,
  slugAlternates,
  homeAria,
  navAria,
  mobileMenuLabel,
  mobileMenuCloseLabel,
  bookCta,
  mobileLinks,
  children,
}: {
  locale: string;
  slugAlternates: Record<string, string>;
  homeAria: string;
  navAria: string;
  mobileMenuLabel: string;
  mobileMenuCloseLabel: string;
  /** CTA label on desktop; the mobile menu items speak for themselves. */
  bookCta: string;
  /** Mobile-menu entries (already translated server-side). */
  mobileLinks: { href: MobileLinkHref; label: string }[];
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="relative z-20 border-b border-line bg-canvas"
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <div className="shell flex min-h-18 items-center justify-between gap-4 md:min-h-22">
        <Link href="/" aria-label={homeAria} onClick={() => setOpen(false)}>
          <span className="inline-flex min-h-11 items-center gap-2 font-serif text-sm font-semibold leading-none text-ink md:gap-3 md:text-base">
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-full border border-ink text-sm md:size-11"
            >
              AT
            </span>
            <span>
              Agadir
              <br />
              Tourisme
            </span>
          </span>
        </Link>

        {children}

        <div className="flex items-center gap-1 md:gap-4">
          <LocaleSwitcher
            locale={locale}
            label={locale === "fr" ? "EN" : "FR"}
            ariaLabel={locale === "fr" ? "Switch to English" : "Passer au français"}
            slugAlternates={slugAlternates}
          />
          <Link
            href="/book"
            className="inline-flex min-h-11 items-center rounded-sm bg-accent px-6 py-3 font-semibold leading-snug text-on-accent transition-colors hover:bg-accent-strong max-md:hidden"
          >
            {bookCta}
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? mobileMenuCloseLabel : mobileMenuLabel}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex min-h-11 min-w-11 items-center gap-2 font-semibold md:hidden"
          >
            <span
              aria-hidden="true"
              className="relative block h-0.5 w-5 bg-ink before:absolute before:-top-1.5 before:block before:h-0.5 before:w-5 before:bg-ink before:content-[''] after:absolute after:top-1.5 after:block after:h-0.5 after:w-5 after:bg-ink after:content-['']"
            />
            {open ? mobileMenuCloseLabel : mobileMenuLabel}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          aria-label={navAria}
          className="absolute inset-x-0 top-full z-30 border-b border-line bg-canvas px-6 pb-6 pt-3 shadow-card md:hidden"
        >
          <ul>
            {mobileLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[3.25rem] items-center justify-between border-b border-line font-serif text-lg"
                >
                  {item.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
