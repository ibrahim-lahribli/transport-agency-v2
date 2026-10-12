import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { isAppLocale } from "@/i18n/locales";
import { Link } from "@/i18n/routing";
import { getContact } from "../../../../config/site";
import { buildPageMetadata, SITE_URL } from "@/seo/metadata";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PageIntro, buttonClass } from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "contact" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    locale,
    pathname: `/${locale}/contact`,
    enPath: "/en/contact",
    frPath: "/fr/contact",
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "contact" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const contact = getContact();

  const rows = [
    {
      label: t("whatsappLabel"),
      value: contact.whatsapp,
      href: `https://wa.me/${contact.whatsappDigits}`,
      external: true,
    },
    { label: t("emailLabel"), value: contact.email, href: `mailto:${contact.email}` },
    { label: t("addressLabel"), value: contact.address, href: null },
    { label: t("hoursLabel"), value: t("hours"), href: null },
  ];

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: tc("home"), url: `${SITE_URL}/${locale}` },
          { name: t("title"), url: `${SITE_URL}/${locale}/contact` },
        ]}
      />
      <PageIntro eyebrow={t("eyebrow")} title={t("title")} body={t("lead")} compact />

      <section className="shell grid grid-cols-1 gap-10 py-12 md:grid-cols-2 md:py-16">
        {/* Contact details, the design's ruled list with serif values. */}
        <div>
          {rows.map((row) => (
            <div key={row.label} className="border-t border-line py-5 first-of-type:border-t-0 first-of-type:pt-0">
              <span className="text-sm text-ink-muted">{row.label}</span>
              <div className="mt-1 font-serif text-xl text-ink">
                {row.href ? (
                  <a
                    href={row.href}
                    className="hover:text-accent-strong"
                    {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {row.value}
                  </a>
                ) : (
                  row.value
                )}
              </div>
            </div>
          ))}
        </div>

        {/* The design's right-hand panel: booking is the real conversion path. */}
        <div className="h-fit rounded-md bg-surface p-6 shadow-card">
          <h2 className="mb-1 text-xl">{t("ctaTitle")}</h2>
          <p className="text-ink-muted">{t("ctaBody")}</p>
          <Link href="/book" className={`${buttonClass("primary")} mt-5`}>
            {tc("details")}
          </Link>
          <p className="mt-4 text-sm text-ink-muted">{t("responseNote")}</p>
        </div>
      </section>
    </div>
  );
}
