import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { isAppLocale } from "@/i18n/locales";
import { Link } from "@/i18n/routing";
import { buildPageMetadata, SITE_URL } from "@/seo/metadata";
import { buttonClass } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { Eyebrow } from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "about" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    locale,
    pathname: `/${locale}/about`,
    enPath: "/en/about",
    frPath: "/fr/about",
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "about" });
  const tc = await getTranslations({ locale, namespace: "common" });

  const values = [
    { title: t("value1Title"), body: t("value1Body") },
    { title: t("value2Title"), body: t("value2Body") },
    { title: t("value3Title"), body: t("value3Body") },
  ];

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: tc("home"), url: `${SITE_URL}/${locale}` },
          { name: t("title"), url: `${SITE_URL}/${locale}/about` },
        ]}
      />
      <header className="shell border-b border-line pb-8 pt-12 md:pt-16">
        <Eyebrow>{t("kicker")}</Eyebrow>
        <h1 className="max-w-[30ch] text-display">{t("title")}</h1>
        <p className="mt-4 max-w-[42rem] text-lg text-ink-muted">{t("lead")}</p>
      </header>

      {/* Story band: prose beside the local hero photo (design's .story). */}
      <section className="shell grid grid-cols-1 items-center gap-10 py-12 md:grid-cols-2 md:py-16">
        <div>
          <Eyebrow>{t("storyTitle")}</Eyebrow>
          <div className="space-y-4 text-lg leading-relaxed text-ink-muted">
            <p>{t("story1")}</p>
            <p>{t("story2")}</p>
            <p>{t("story3")}</p>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- static artwork slots, no optimizer needed */}
        <img
          src="/images/hero.jpg"
          alt=""
          className="aspect-[3/4] w-full rounded-md object-cover shadow-card md:aspect-auto md:h-[34rem]"
        />
      </section>

      {/* Values as the design's numbered rows (01/02/03) — no licence numbers,
          team names or response times invented. */}
      <section className="bg-surface-muted">
        <div className="shell grid grid-cols-1 gap-10 py-12 md:grid-cols-[1fr_1.5fr] md:py-16">
          <h2 className="text-2xl">{t("valuesTitle")}</h2>
          <div>
            {values.map((value, index) => (
              <article
                key={value.title}
                className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-line py-5 first-of-type:border-t-0 first-of-type:pt-0"
              >
                <span aria-hidden="true" className="pt-1 font-serif text-lg text-accent-strong">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="mb-1 text-lg">{value.title}</h3>
                  <p className="text-ink-muted">{value.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Terracotta closing CTA, mirroring home's band. */}
      <section className="bg-accent text-on-accent">
        <div className="shell py-14 text-center md:py-16">
          <h2 className="mx-auto max-w-[24ch] text-2xl text-on-accent">{t("ctaTitle")}</h2>
          <p className="mx-auto mt-2 max-w-lg text-on-accent">{t("ctaBody")}</p>
          <Link href="/book" className={`${buttonClass("light")} mt-6`}>
            {tc("details")}
          </Link>
        </div>
      </section>
    </div>
  );
}
