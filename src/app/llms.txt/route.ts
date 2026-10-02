import { HUB_KEYS, getServices } from "@/catalogue";
import { SITE_NAME, SITE_URL, getContact } from "../../../config/site";

/**
 * A concise, machine-readable summary for AI agents (ChatGPT, Perplexity,
 * Claude). Google Search ignores llms.txt; it is a best-effort signal for other
 * systems and costs nothing to serve.
 */
export function GET() {
  const contact = getContact();
  const services = getServices("en");

  const lines: string[] = [
    `# ${SITE_NAME}`,
    "",
    `> Licensed local travel and tourist-transport agency based in Agadir, Souss-Massa, Morocco. Fixed EUR pricing for excursions, activities and private transfers, with confirmation on WhatsApp.`,
    "",
    `Contact: ${contact.email} · WhatsApp ${contact.whatsapp} · ${contact.address}`,
    "",
    "## Experiences",
  ];

  for (const service of services) {
    lines.push(
      `- [${service.title}](${SITE_URL}/en/${service.slug}): ${service.seo.description}`,
    );
  }

  lines.push("", "## Categories");
  for (const hub of HUB_KEYS) {
    lines.push(`- [${hub}](${SITE_URL}/en/${hub})`);
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
