import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { getContact } from "../../../../config/site";
import { isAppLocale } from "@/i18n/locales";
import { buildPageMetadata, SITE_URL } from "@/seo/metadata";
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/json-ld";
import { Accordion, PageIntro, buttonClass } from "@/components/ui";

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
  const tProduct = await getTranslations({ locale, namespace: "product" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const items = t.raw("items") as FaqItem[];
  const contact = getContact();

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: tc("home"), url: `${SITE_URL}/${locale}` },
          { name: t("title"), url: `${SITE_URL}/${locale}/faq` },
        ]}
      />
      <FAQPageJsonLd items={items} />
      <PageIntro eyebrow={t("eyebrow")} title={t("title")} body={t("lead")} compact />

      <section className="shell grid grid-cols-1 gap-10 py-12 md:grid-cols-[18rem_1fr] md:py-16">
        <aside className="order-2 h-fit self-start rounded-md bg-surface-muted p-5 md:order-1">
          <p className="mb-4 text-lg text-ink">{t("stillQuestion")}</p>
          <a
            href={`https://wa.me/${contact.whatsappDigits}`}
            className={buttonClass("secondary")}
            target="_blank"
            rel="noopener noreferrer"
          >
            {tProduct("whatsappAsk")}
          </a>
        </aside>
        <div className="order-1 md:order-2">
          <Accordion items={items.map((item) => ({ title: item.q, body: item.a }))} openFirst />
        </div>
      </section>
    </div>
  );
}
