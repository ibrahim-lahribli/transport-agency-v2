/**
 * One-off: fetch freely licensed slot images from Wikimedia Commons.
 * Reads data/image-sources.json; writes public/images/*.jpg +
 * public/images/services/<id>.jpg and prints a credits table.
 * Run: node scripts/fetch-images.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cfgPath = "data/image-sources.json";
const cfg = JSON.parse((await import("node:fs")).readFileSync(cfgPath, "utf8"));
const UA = cfg.userAgent;
const titles = [...new Set(Object.entries(cfg.slots).map(([, t]) => t))];

const want = titles.map((t) => "File:" + t);
const chunks = [];
for (let i = 0; i < want.length; i += 20) {
  chunks.push(want.slice(i, i + 20));
}

const info = new Map();
for (const chunk of chunks) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url%7Cextmetadata&iiurlwidth=1400&titles=" +
    encodeURIComponent(chunk.join("|"));
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) {
    console.error("API error", res.status, url);
    process.exit(1);
  }
  const json = await res.json();
  for (const page of Object.values(json.query.pages)) {
    if (!page.imageinfo) {
      console.error("NO INFO:", page.title);
      continue;
    }
    const ii = page.imageinfo[0];
    const meta = ii.extmetadata || {};
    info.set(page.title.replace(/^File:/, ""), {
      url: ii.thumburl || ii.url,
      licenseShort: (meta.LicenseShortName?.value || "?").replace(/<\/?[^>]+>/g, ""),
      artist: (meta.Artist?.value || "Unknown author").replace(/<\/?[^>]+>/g, "").trim(),
    });
  }
}

const credits = {};
mkdirSync("public/images/services", { recursive: true });
for (const [slot, title] of Object.entries(cfg.slots)) {
  const meta = info.get(title);
  if (!meta) {
    console.error("MISSING:", title);
    process.exit(1);
  }
  const dest =
    slot.startsWith("artwork:")
      ? join("public/images", slot.slice(8) + ".jpg")
      : join("public/images/services", slot + ".jpg");
  const res = await fetch(meta.url, { headers: { "User-Agent": UA } });
  if (!res.ok) {
    console.error("DL FAIL", slot, res.status, meta.url);
    process.exit(1);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(dest, buf);
  credits[slot] = {
    file: dest.replace("public/", "/"),
    source: "Wikimedia Commons",
    title,
    page: "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(title),
    license: meta.licenseShort,
    author: meta.artist,
  };
  console.log(slot, "→", dest, buf.length, "bytes", "|", meta.licenseShort);
}

writeFileSync("data/image-credits.json", JSON.stringify(credits, null, 2) + "\n");
console.log("\ncredits written: data/image-credits.json");
