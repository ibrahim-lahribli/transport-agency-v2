import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { isAppLocale } from "@/i18n/locales";
import { buildPageMetadata, SITE_URL } from "@/seo/metadata";
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/json-ld";

interface FaqItem {
  q: string;
  a: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "faq" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    locale,
    pathname: `/${locale}/faq`,
    enPath: "/en/faq",
    frPath: "/fr/faq",
  });
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "faq" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const items = t.raw("items") as FaqItem[];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <BreadcrumbJsonLd
        items={[
          { name: tc("home"), url: `${SITE_URL}/${locale}` },
          { name: t("title"), url: `${SITE_URL}/${locale}/faq` },
        ]}
      />
      <FAQPageJsonLd items={items} />
      <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{t("title")}</h1>
      <p className="mt-3 text-base text-ink-muted">{t("lead")}</p>

      <div className="mt-8 divide-y divide-line border-y border-line">
        {items.map((item, index) => (
          <details key={index} className="group py-4 text-start">
            <summary className="flex cursor-pointer list-none items-center justify-between py-1 text-sm font-semibold text-ink hover:text-accent">
              <span>{item.q}</span>
              <span aria-hidden="true" className="ms-2 font-bold text-accent-strong">
                ▾
              </span>
            </summary>
            <div className="mt-3 text-sm leading-relaxed text-ink-muted">
              <p>{item.a}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
