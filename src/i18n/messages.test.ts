import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

type Messages = {
  product: { transferCancellation: string };
  faq: { items: { q: string; a: string }[] };
};

function messages(locale: "en" | "fr"): Messages {
  return JSON.parse(readFileSync(resolve(process.cwd(), "messages", `${locale}.json`), "utf8"));
}

function hoursIn(text: string): number {
  const match = text.match(/(\d+)\s*(hours?|heures?)/i);
  if (!match) throw new Error(`no hour count in: ${text}`);
  return Number(match[1]);
}

describe("transfer cancellation policy", () => {
  it.each(["en", "fr"] as const)("%s states one window, matching the FAQ", (locale) => {
    const data = messages(locale);
    const faq = data.faq.items.find((item) => /cancel|annul/i.test(item.a));
    expect(faq, `${locale} FAQ has a transfer cancellation answer`).toBeDefined();
    const productHours = hoursIn(data.product.transferCancellation);
    expect(productHours, `${locale} product policy`).toBe(12);
    expect(hoursIn(faq!.a), `${locale} FAQ policy`).toBe(productHours);
  });
});
