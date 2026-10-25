// One-off: dump untranslated copy for one directory, as editable JSON.
// Usage: node dump-batch.mjs src/features/sessions/ui
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
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

const dir = process.argv[2];
if (!dir) throw new Error("pass a directory");

const result = {};
for (const entry of readdirSync(dir)) {
  if (!entry.endsWith(".tsx") || entry.includes(".test.")) continue;
  const path = join(dir, entry);
  if (!statSync(path).isFile()) continue;
  const sf = ts.createSourceFile(
    path, readFileSync(path, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX,
  );
  const items = [];
  const visit = (node) => {
    if (ts.isJsxText(node)) {
      const v = node.text.replace(/\s+/g, " ").trim();
      if (v && looksLikeCopy(v)) {
        const { line } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
        items.push({ line: line + 1, kind: "text", value: v });
      }
    }
    if (ts.isJsxAttribute(node)) {
      const name = ts.isIdentifier(node.name) ? node.name.text : undefined;
      const init = node.initializer;
      if (name && VISIBLE_ATTRS.has(name) && init && ts.isStringLiteral(init) && looksLikeCopy(init.text)) {
        const { line } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
        items.push({ line: line + 1, kind: name, value: init.text });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  if (items.length) result[entry] = items;
}
const out = relative(".", dir).split("\\").join("/").replace(/\//g, "-");
writeFileSync(`batch-${out}.json`, JSON.stringify(result, null, 2));
const total = Object.values(result).reduce((s, v) => s + v.length, 0);
console.log(`${Object.keys(result).length} files, ${total} strings -> batch-${out}.json`);
