import React from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { businessProfile } from "../../config/business";
import { LocaleSwitcher } from "@/components/locale-switcher";

export async function Header({
  locale,
  slugAlternates,
}: {
  locale: string;
  slugAlternates: Record<string, string>;
}) {
  const t = await getTranslations({ locale, namespace: "nav" });
  const targetLocale = locale === "fr" ? "en" : "fr";

  return (
    <header className="border-b border-line bg-surface/90 backdrop-blur-sm sticky inset-bs-0 z-40">
      <div className="mx-auto flex max-w-5xl items-center justify-between ps-4 pe-4 py-3">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-ink hover:text-accent transition-colors py-1"
          aria-label={t("homeAria")}
        >
          {businessProfile.tradingName || "Agadir Tourisme"}
        </Link>

        <nav
          aria-label={t("mainNavigation")}
          className="flex items-center gap-3 sm:gap-4 text-sm font-medium"
        >
          <Link href="/excursions" className="text-ink-muted hover:text-ink transition-colors py-2">
            {t("excursions")}
          </Link>
          <Link href="/activities" className="text-ink-muted hover:text-ink transition-colors py-2">
            {t("activities")}
          </Link>
          <Link href="/transfers" className="text-ink-muted hover:text-ink transition-colors py-2">
            {t("transfers")}
          </Link>
          <Link
            href="/book"
            className="rounded-md bg-accent ps-3.5 pe-3.5 py-2 text-xs font-semibold text-on-accent hover:bg-accent-strong transition-colors"
          >
            {t("book")}
          </Link>
          <LocaleSwitcher
            currentLocale={locale}
            targetLocale={targetLocale}
            label={t("switchLocale")}
            ariaLabel={t("switchLocaleAria")}
            slugAlternates={slugAlternates}
          />
        </nav>
      </div>
    </header>
  );
}

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "footer" });

  return (
    <footer className="border-t border-line bg-surface-muted/60 mt-16 text-sm text-ink-muted">
      <div className="mx-auto max-w-5xl ps-4 pe-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-bold text-ink text-base mb-2">
              {businessProfile.tradingName || businessProfile.legalName}
            </p>
            <p className="text-xs text-ink-muted mb-3">{t("tagline")}</p>
            <p className="text-xs text-ink-muted">{businessProfile.address}</p>
          </div>

          <div>
            <p className="font-semibold text-ink mb-2">{t("experiences")}</p>
            <ul className="space-y-1 text-xs">
              <li>
                <Link href="/excursions" className="inline-block py-1.5 hover:text-ink">
                  {t("excursions")}
                </Link>
              </li>
              <li>
                <Link href="/activities" className="inline-block py-1.5 hover:text-ink">
                  {t("activities")}
                </Link>
              </li>
              <li>
                <Link href="/transfers" className="inline-block py-1.5 hover:text-ink">
                  {t("transfers")}
                </Link>
              </li>
              <li>
                <Link href="/book" className="inline-block py-1.5 hover:text-ink">
                  {t("book")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-ink mb-2">{t("legal")}</p>
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
          <p>
            © {new Date().getFullYear()} {businessProfile.tradingName || businessProfile.legalName}.{" "}
            {t("rights")}
          </p>
          <p>{t("priceNote")}</p>
        </div>
      </div>
    </footer>
  );
}
