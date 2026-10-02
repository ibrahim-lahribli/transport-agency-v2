import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { isAppLocale } from "@/i18n/locales";
import { Link } from "@/i18n/routing";
import { getContact } from "../../../../config/site";
import { buildPageMetadata, SITE_URL } from "@/seo/metadata";
import { BreadcrumbJsonLd } from "@/components/json-ld";

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
    { label: t("addressLabel"), value: contact.address },
    { label: t("hoursLabel"), value: t("hours") },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <BreadcrumbJsonLd
        items={[
          { name: tc("home"), url: `${SITE_URL}/${locale}` },
          { name: t("title"), url: `${SITE_URL}/${locale}/contact` },
        ]}
      />
      <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{t("title")}</h1>
      <p className="mt-3 text-base text-ink-muted">{t("lead")}</p>

      <dl className="mt-8 divide-y divide-line rounded-xl border border-line bg-surface">
        {rows.map((row) => (
          <div key={row.label} className="flex flex-col gap-1 p-5 sm:flex-row sm:justify-between">
            <dt className="text-sm font-semibold text-ink">{row.label}</dt>
            <dd className="text-sm text-ink-muted">
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
            </dd>
          </div>
        ))}
      </dl>

      <section className="mt-12 rounded-xl border border-line bg-surface p-6">
        <h2 className="text-base font-bold text-ink">{t("ctaTitle")}</h2>
        <p className="mt-1 text-sm text-ink-muted">{t("ctaBody")}</p>
        <Link
          href="/book"
          className="mt-4 inline-flex min-h-[44px] items-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent hover:bg-accent-strong"
        >
          {tc("details")}
        </Link>
      </section>
    </div>
  );
}
