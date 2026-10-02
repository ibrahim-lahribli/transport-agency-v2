#!/usr/bin/env node
/**
 * Docs guard: keeps the AI context layer honest.
 *
 * 1. Every SKILL.md has `name` and `description` frontmatter.
 * 2. Every relative Markdown link in the tracked doc set resolves to a file.
 *
 * No dependencies — it runs in CI before anything else and must stay fast.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

/** Directories whose *.md files form the tracked documentation set. */
const SCAN_DIRS = ["", "docs", "docs/adr", "specs", ".agents/skills", ".github"];

function collectMarkdown() {
  const files = new Set();
  for (const d of SCAN_DIRS) {
    const abs = join(root, d);
    let entries;
    try {
      entries = readdirSync(abs);
    } catch {
      continue;
    }
    for (const entry of entries) {
      const full = join(abs, entry);
      if (statSync(full).isFile() && entry.endsWith(".md")) files.add(full);
      // one level deeper for docs/adr already listed; skills handled below
    }
  }
  // Skill files live two levels down.
  const skillsDir = join(root, ".agents/skills");
  for (const skill of readdirSync(skillsDir)) {
    const file = join(skillsDir, skill, "SKILL.md");
    try {
      if (statSync(file).isFile()) files.add(file);
    } catch {
      /* ignore */
    }
  }
  return [...files];
}

function checkSkillFrontmatter(file) {
  if (!file.endsWith("SKILL.md")) return;
  const text = readFileSync(file, "utf8");
  if (!text.startsWith("---")) {
    errors.push(`${relative(root, file)}: missing YAML frontmatter`);
    return;
  }
  const end = text.indexOf("\n---", 3);
  const front = end === -1 ? "" : text.slice(3, end);
  for (const key of ["name", "description"]) {
    if (!new RegExp(`^${key}:`, "m").test(front)) {
      errors.push(`${relative(root, file)}: frontmatter missing "${key}"`);
    }
  }
}

function checkLinks(file) {
  const text = readFileSync(file, "utf8");
  const linkRe = /\[[^\]]*\]\(([^)]+)\)/g;
  let match;
  while ((match = linkRe.exec(text)) !== null) {
    let target = match[1].trim();
    if (
      target.startsWith("http://") ||
      target.startsWith("https://") ||
      target.startsWith("mailto:") ||
      target.startsWith("#")
    ) {
      continue;
    }
    target = target.split("#")[0];
    if (!target) continue;
    const resolved = resolve(dirname(file), target);
    try {
      statSync(resolved);
    } catch {
      errors.push(`${relative(root, file)}: broken link -> ${match[1]}`);
    }
  }
}

const markdown = collectMarkdown();
for (const file of markdown) {
  checkSkillFrontmatter(file);
  checkLinks(file);
}

if (errors.length > 0) {
  console.error(`Docs check failed with ${errors.length} problem(s):\n`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`Docs check passed (${markdown.length} files).`);
