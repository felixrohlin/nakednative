#!/usr/bin/env node
// oxlint only parses JS/TS/JSX, so it can't see raw --nn- references inside
// .css files. This script covers that gap: styles/tokens/colors.css is the
// one place primitive tokens (--nn-*) may be defined and referenced directly
// — everywhere else must go through a semantic token (e.g. --accent-primary).
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const EXEMPT = join(ROOT, "styles", "tokens", "colors.css");
const SEARCH_DIRS = ["styles", "app", "components"];
const PATTERN = /var\(--nn-[\w-]+/;

const offenses = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (entry === "node_modules" || entry === ".next") continue;
    const info = statSync(full);
    if (info.isDirectory()) {
      walk(full);
    } else if (full.endsWith(".css") && full !== EXEMPT) {
      const lines = readFileSync(full, "utf8").split("\n");
      lines.forEach((line, i) => {
        if (PATTERN.test(line)) {
          offenses.push(`${relative(ROOT, full)}:${i + 1}: ${line.trim()}`);
        }
      });
    }
  }
}

for (const dir of SEARCH_DIRS) {
  try {
    walk(join(ROOT, dir));
  } catch {
    // directory doesn't exist yet
  }
}

if (offenses.length) {
  console.error("Raw primitive token (--nn-*) referenced outside styles/tokens/colors.css:\n");
  for (const o of offenses) console.error("  " + o);
  console.error("\nUse a semantic token instead (e.g. var(--accent-primary)).");
  process.exit(1);
}

console.log("check-token-usage: no raw --nn- references outside colors.css");
