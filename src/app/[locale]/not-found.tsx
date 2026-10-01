"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center gap-4 ps-4 pe-4 py-24">
      <p className="text-sm font-semibold tracking-wide uppercase text-accent">{t("code")}</p>
      <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t("title")}</h1>
      <p className="text-base text-ink-muted">{t("body")}</p>
      <div className="mt-4 flex gap-4">
        <Link
          href="/"
          className="rounded-md bg-accent ps-4 pe-4 py-2 text-sm font-semibold text-on-accent hover:bg-accent-strong transition-colors"
        >
          {t("backHome")}
        </Link>
        <Link
          href="/excursions"
          className="rounded-md border border-line ps-4 pe-4 py-2 text-sm font-semibold text-ink hover:border-ink transition-colors"
        >
          {t("viewExcursions")}
        </Link>
      </div>
    </div>
  );
}
