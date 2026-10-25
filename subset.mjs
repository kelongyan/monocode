// Build a per-directory translation file containing only the strings that
// directory actually uses, so each ui.* namespace gets just its own keys.
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import ts from "typescript";

const VISIBLE_ATTRS = new Set([
  "title", "label", "aria-label", "ariaLabel", "placeholder", "alt",
  "description", "triggerLabel", "emptyLabel",
]);

function looksLikeCopy(value) {
  const text = value.trim();
  if (text.length < 2) return false;
  if (!/[A-Za-z]/.test(text)) return false;
  const words = text.split(/\s+/);
  const utilityLike = words.every((w) => /^[a-z0-9:[\]./%-]+$/.test(w));
  if (words.length > 1 && utilityLike) return false;
  if (/[A-Za-z]\s+[A-Za-z]/.test(text)) return true;
  if (/[.!?…]$/.test(text)) return true;
  if (/^[A-Z][a-z]{2,}$/.test(text)) return true;
  return false;
}

const [dir, translationsPath, outPath] = process.argv.slice(2);
const tr = JSON.parse(readFileSync(translationsPath, "utf8"));

const used = new Set();
for (const entry of readdirSync(dir)) {
  if (!entry.endsWith(".tsx") || entry.includes(".test.")) continue;
  const path = join(dir, entry);
  if (!statSync(path).isFile()) continue;
  const sf = ts.createSourceFile(
    path, readFileSync(path, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX,
  );
  const visit = (node) => {
    if (ts.isJsxText(node)) {
      const v = node.text.replace(/\s+/g, " ").trim();
      if (v && looksLikeCopy(v) && tr[v] !== undefined) used.add(v);
    }
    if (ts.isJsxAttribute(node)) {
      const name = ts.isIdentifier(node.name) ? node.name.text : undefined;
      const init = node.initializer;
      if (name && VISIBLE_ATTRS.has(name) && init && ts.isStringLiteral(init) &&
          looksLikeCopy(init.text) && tr[init.text] !== undefined) {
        used.add(init.text);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
}

const subset = {};
for (const key of used) subset[key] = tr[key];
writeFileSync(outPath, JSON.stringify(subset, null, 2));
console.log(`${dir}: ${used.size} strings -> ${outPath}`);
