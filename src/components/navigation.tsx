import { getTranslations } from "next-intl/server";

import { getContact } from "../../config/site";
import { Link } from "@/i18n/routing";
import { HeaderChrome } from "./header-chrome";

const NAV_LINKS = [
  { href: "/excursions" as const, key: "excursions" },
  { href: "/activities" as const, key: "activities" },
  { href: "/transfers" as const, key: "transfers" },
];

/** Static links of the design's mobile menu, in its order. */
const MOBILE_LINKS = [
  { href: "/places" as const, key: "places" },
  { href: "/guides" as const, key: "guides" },
  { href: "/about" as const, key: "about" },
  { href: "/faq" as const, key: "faq" },
  { href: "/contact" as const, key: "contact" },
];

/**
 * The design's circular "AT" mark + two-line serif wordmark. `inverse` flips
 * the mark's border for the ink footer.
 */
export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className="inline-flex min-h-11 items-center gap-3 font-serif text-base font-semibold leading-none text-ink">
      <span
        aria-hidden="true"
        className={`grid size-11 shrink-0 place-items-center rounded-full border text-sm ${
          inverse ? "border-canvas" : "border-ink"
        }`}
      >
        AT
      </span>
      <span>
        Agadir
        <br />
        Tourisme
      </span>
    </span>
  );
}

export async function Header({
  locale,
  slugAlternates,
}: {
  locale: string;
  slugAlternates: Record<string, string>;
}) {
  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <HeaderChrome
      locale={locale}
      slugAlternates={slugAlternates}
      homeAria={t("homeAria")}
      navAria={t("mainNavigation")}
      mobileMenuLabel={t("mobileMenu")}
      mobileMenuCloseLabel={t("closeMenu")}
      bookCta={t("bookCta")}
      mobileLinks={[...NAV_LINKS, ...MOBILE_LINKS].map((link) => ({
        href: link.href,
        label: t(link.key),
      }))}
    >
      <nav aria-label={t("mainNavigation")} className="hidden md:block">
        <ul className="flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.key}>
              <Link
                href={link.href}
                className="inline-flex min-h-11 items-center font-medium text-ink aria-[current=page]:font-semibold aria-[current=page]:text-accent-strong aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-4"
              >
                {t(link.key)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </HeaderChrome>
  );
}

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const contact = getContact();

  return (
    <footer className="bg-ink text-canvas">
      <div className="shell grid gap-8 pb-14 pt-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label={t("homeAria")} className="inline-flex min-h-11 items-center">
            <Logo inverse />
          </Link>
          <p className="mt-4 max-w-[22rem] text-sm text-canvas/72">{t("tagline")}</p>
        </div>

        <nav aria-label={t("explore")}>
          <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-[0.08em]">
            {t("explore")}
          </h3>
          <ul className="space-y-1 text-sm">
            {(
              [
                ["/excursions", t("excursions")],
                ["/activities", t("activities")],
                ["/transfers", t("transfers")],
                ["/places", t("places")],
              ] as const
            ).map(([href, label]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-flex min-h-[2.3rem] items-center text-canvas/85 hover:text-canvas"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("knowUs")}>
          <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-[0.08em]">
            {t("knowUs")}
          </h3>
          <ul className="space-y-1 text-sm">
            {(
              [
                ["/guides", t("guides")],
                ["/about", t("about")],
                ["/faq", t("faq")],
                ["/contact", t("contact")],
              ] as const
            ).map(([href, label]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-flex min-h-[2.3rem] items-center text-canvas/85 hover:text-canvas"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-[0.08em]">
            {t("contact")}
          </h3>
          <a
            href={`https://wa.me/${contact.whatsappDigits}`}
            className="mb-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm bg-canvas px-3 text-sm font-semibold text-ink hover:bg-surface"
            rel="noopener noreferrer"
            target="_blank"
          >
            WhatsApp {contact.whatsapp}
          </a>
          <ul className="space-y-2 text-sm text-canvas/85">
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex min-h-[2.3rem] items-center underline underline-offset-2 hover:text-canvas"
              >
                {contact.email}
              </a>
            </li>
            <li className="text-canvas/72">{contact.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-canvas/20">
        <div className="shell flex min-h-16 flex-wrap items-center justify-between gap-4 py-4 text-xs text-canvas/72">
          <span>
            © {new Date().getFullYear()} {contact.tradingName}. {t("rights")}
          </span>
          <p className="pe-0">{t("priceNote")}</p>
        </div>
      </div>
    </footer>
  );
}
