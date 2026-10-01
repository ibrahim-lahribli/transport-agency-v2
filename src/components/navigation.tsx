import React from "react";
import Link from "next/link";
import { businessProfile } from "../../config/business";

export function Header({ locale, currentPath }: { locale: string; currentPath?: string }) {
  const isFr = locale === "fr";
  const targetLocale = isFr ? "en" : "fr";
  const targetLocaleLabel = isFr ? "EN" : "FR";
  const targetLocaleAria = isFr ? "Switch to English" : "Passer au français";

  // Build target switch path
  let switchHref = `/${targetLocale}`;
  if (currentPath) {
    switchHref = currentPath.startsWith(`/${locale}`)
      ? `/${targetLocale}${currentPath.slice(locale.length + 1)}`
      : `/${targetLocale}`;
  }

  return (
    <header className="border-b border-line bg-surface/90 backdrop-blur-sm sticky inset-bs-0 z-40">
      <div className="mx-auto flex max-w-5xl items-center justify-between ps-4 pe-4 py-3">
        <Link
          href={`/${locale}`}
          className="text-lg font-bold tracking-tight text-ink hover:text-accent transition-colors py-1"
          aria-label={isFr ? "Agadir Tourisme - Accueil" : "Agadir Tourisme - Home"}
        >
          {businessProfile.tradingName || "Agadir Tourisme"}
        </Link>

        <nav aria-label={isFr ? "Navigation principale" : "Main navigation"} className="flex items-center gap-3 sm:gap-4 text-sm font-medium">
          <Link
            href={`/${locale}/excursions`}
            className="text-ink-muted hover:text-ink transition-colors py-2"
          >
            Excursions
          </Link>
          <Link
            href={`/${locale}/activities`}
            className="text-ink-muted hover:text-ink transition-colors py-2"
          >
            {isFr ? "Activités" : "Activities"}
          </Link>
          <Link
            href={`/${locale}/transfers`}
            className="text-ink-muted hover:text-ink transition-colors py-2"
          >
            {isFr ? "Transferts" : "Transfers"}
          </Link>
          <Link
            href={`/${locale}/book`}
            className="rounded-md bg-accent ps-3.5 pe-3.5 py-2 text-xs font-semibold text-on-accent hover:bg-accent-strong transition-colors"
          >
            {isFr ? "Réserver" : "Book"}
          </Link>
          <Link
            href={switchHref}
            className="rounded border border-line ps-2.5 pe-2.5 py-1.5 text-xs font-semibold text-ink hover:text-accent hover:border-accent transition-colors inline-flex items-center min-h-[32px]"
            aria-label={targetLocaleAria}
            hrefLang={targetLocale}
          >
            {targetLocaleLabel}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer({ locale }: { locale: string }) {
  const isFr = locale === "fr";

  return (
    <footer className="border-t border-line bg-surface-muted/60 mt-16 text-sm text-ink-muted">
      <div className="mx-auto max-w-5xl ps-4 pe-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-bold text-ink text-base mb-2">
              {businessProfile.tradingName || businessProfile.legalName}
            </p>
            <p className="text-xs text-ink-muted mb-3">
              {isFr
                ? "Agence de voyages et de transport touristique locale agréée à Agadir, Souss-Massa."
                : "Licensed local travel and tourist transport agency in Agadir, Souss-Massa."}
            </p>
            <p className="text-xs text-ink-muted">
              {businessProfile.address}
            </p>
          </div>

          <div>
            <p className="font-semibold text-ink mb-2">
              {isFr ? "Catalogue" : "Experiences"}
            </p>
            <ul className="space-y-1 text-xs">
              <li>
                <Link href={`/${locale}/excursions`} className="inline-block py-1.5 hover:text-ink">
                  {isFr ? "Excursions au départ d'Agadir" : "Excursions from Agadir"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/activities`} className="inline-block py-1.5 hover:text-ink">
                  {isFr ? "Activités et aventures" : "Activities & Adventures"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/transfers`} className="inline-block py-1.5 hover:text-ink">
                  {isFr ? "Transferts aéroport & interurbains" : "Airport & Intercity Transfers"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/book`} className="inline-block py-1.5 hover:text-ink">
                  {isFr ? "Demande de réservation" : "Booking Inquiry"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-ink mb-2">
              {isFr ? "Informations légales" : "Legal & Contact"}
            </p>
            <ul className="space-y-1 text-xs">
              <li>
                <span className="font-medium text-ink">{businessProfile.legalName}</span>
              </li>
              <li>ICE: {businessProfile.ice}</li>
              <li>Licence: {businessProfile.licence}</li>
              <li>Assurance: {businessProfile.insurance}</li>
              <li className="pt-2">
                <a
                  href={`https://wa.me/${businessProfile.whatsapp.replace(/[^0-9]/g, "")}`}
                  className="font-semibold text-accent-strong hover:underline inline-block py-1.5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp: {businessProfile.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-line mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-ink-muted gap-2">
          <p>© {new Date().getFullYear()} {businessProfile.tradingName || businessProfile.legalName}. {isFr ? "Tous droits réservés." : "All rights reserved."}</p>
          <p>{isFr ? "Prix en EUR avec équivalent indicatif en MAD." : "Prices in EUR with indicative MAD equivalent."}</p>
        </div>
      </div>
    </footer>
  );
}
