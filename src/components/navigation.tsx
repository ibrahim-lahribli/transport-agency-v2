import { getTranslations } from "next-intl/server";

import { getContact } from "../../config/site";
import { Link } from "@/i18n/routing";
import { LocaleSwitcher } from "./locale-switcher";

const NAV_LINKS = [
  { href: "/excursions" as const, key: "excursions" },
  { href: "/activities" as const, key: "activities" },
  { href: "/transfers" as const, key: "transfers" },
];

export async function Header({
  locale,
  slugAlternates,
}: {
  locale: string;
  slugAlternates: Record<string, string>;
}) {
  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
        <Link href="/" className="text-lg font-extrabold tracking-tight text-ink">
          Agadir Tourisme
        </Link>

        <nav aria-label={t("mainNavigation")} className="order-3 w-full sm:order-2 sm:w-auto">
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-ink-muted">
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <Link href={link.href} className="inline-flex min-h-[40px] items-center hover:text-accent-strong">
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="order-2 ms-auto flex items-center gap-3 sm:order-3">
          <Link
            href="/book"
            className="inline-flex min-h-[40px] items-center rounded-md bg-accent px-4 py-1.5 text-sm font-semibold text-on-accent hover:bg-accent-strong"
          >
            {t("book")}
          </Link>
          <LocaleSwitcher
            locale={locale}
            label={t("switchLocale")}
            ariaLabel={t("switchLocaleAria")}
            slugAlternates={slugAlternates}
          />
        </div>
      </div>
    </header>
  );
}

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const contact = getContact();

  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="text-sm font-bold text-ink">Agadir Tourisme</p>
          <p className="mt-2 text-sm text-ink-muted">{t("tagline")}</p>
        </div>

        <nav aria-label={t("experiences")}>
          <p className="text-sm font-bold text-ink">{t("experiences")}</p>
          <ul className="mt-2 space-y-1 text-sm text-ink-muted">
            <li>
              <Link href="/excursions" className="hover:text-accent-strong">
                {t("excursions")}
              </Link>
            </li>
            <li>
              <Link href="/activities" className="hover:text-accent-strong">
                {t("activities")}
              </Link>
            </li>
            <li>
              <Link href="/transfers" className="hover:text-accent-strong">
                {t("transfers")}
              </Link>
            </li>
            <li>
              <Link href="/book" className="hover:text-accent-strong">
                {t("book")}
              </Link>
            </li>
            <li>
              <Link href="/places" className="hover:text-accent-strong">
                {t("places")}
              </Link>
            </li>
            <li>
              <Link href="/guides" className="hover:text-accent-strong">
                {t("guides")}
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-accent-strong">
                {t("about")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-accent-strong">
                {t("contact")}
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-accent-strong">
                {t("faq")}
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-sm font-bold text-ink">{t("legal")}</p>
          <ul className="mt-2 space-y-1 text-sm text-ink-muted">
            <li>
              <a href={`mailto:${contact.email}`} className="hover:text-accent-strong">
                {contact.email}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${contact.whatsappDigits}`}
                className="hover:text-accent-strong"
                rel="noopener noreferrer"
                target="_blank"
              >
                WhatsApp {contact.whatsapp}
              </a>
            </li>
            <li>{contact.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line px-4 py-4 text-center text-xs text-ink-muted">
        © {new Date().getFullYear()} {contact.tradingName}. {t("rights")}
      </div>
    </footer>
  );
}
