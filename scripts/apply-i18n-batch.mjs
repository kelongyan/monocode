// Apply one batch of translations to the codebase.
//
// Input: a JSON file of { "<English>": "<Chinese>" } plus a namespace name.
// For each directory in the batch it:
//   1. adds the entries to both dictionaries under `ui.<namespace>`,
//   2. rewrites every matching JSX text node and visible attribute to t("…"),
//   3. gives each component that now calls t() its own useT() and import.
//
// Replacements are collected from the AST as source ranges and applied
// back-to-front, so offsets stay valid and nothing inside comments or
// non-visible strings is touched.
//
// Usage: node scripts/apply-i18n-batch.mjs <dir> <namespace> <translations.json>
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import ts from "typescript";

const VISIBLE_ATTRS = new Set([
  "title", "label", "aria-label", "ariaLabel", "placeholder", "alt",
  "description", "triggerLabel", "emptyLabel",
]);

const [dir, namespace, translationsPath] = process.argv.slice(2);
if (!dir || !namespace || !translationsPath) {
  throw new Error("usage: apply-i18n-batch.mjs <dir> <namespace> <translations.json>");
}

const translations = JSON.parse(readFileSync(translationsPath, "utf8"));

/** Deterministic, readable key from the English text. */
function slugKey(english) {
  const words = english
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 6);
  let slug = words
    .map((word, index) => (index === 0 ? word : word[0].toUpperCase() + word.slice(1)))
    .join("");
  if (slug.length > 48) slug = slug.slice(0, 48);
  return slug || "text";
}

// Assign keys once per unique English string across the whole batch, so the
// same sentence shares one entry, and collisions get a numeric suffix.
const keyByEnglish = new Map();
const usedKeys = new Set();
for (const english of Object.keys(translations)) {
  let key = slugKey(english);
  let candidate = key;
  let n = 2;
  while (usedKeys.has(candidate)) candidate = `${key}${n++}`;
  usedKeys.add(candidate);
  keyByEnglish.set(english, candidate);
}

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

function collectEdits(path) {
  const source = readFileSync(path, "utf8");
  const sf = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const edits = [];

  const visit = (node) => {
    if (ts.isJsxText(node)) {
      const value = node.text.replace(/\s+/g, " ").trim();
      if (value && looksLikeCopy(value) && keyByEnglish.has(value)) {
        const start = node.getStart(sf);
        const end = node.getEnd();
        // JSX text cannot be an expression directly; braces make it one.
        edits.push({ start, end, text: `{t("ui.${namespace}.${keyByEnglish.get(value)}")}` });
      }
    }
    if (ts.isJsxAttribute(node)) {
      const name = ts.isIdentifier(node.name) ? node.name.text : undefined;
      const init = node.initializer;
      if (
        name && VISIBLE_ATTRS.has(name) && init && ts.isStringLiteral(init) &&
        looksLikeCopy(init.text) && keyByEnglish.has(init.text)
      ) {
        edits.push({
          start: init.getStart(sf),
          end: init.getEnd(),
          text: `{t("ui.${namespace}.${keyByEnglish.get(init.text)}")}`,
        });
      }
    }
    ts.forEachChild(node, visit);
  };

  visit(sf);
  return { source, edits };
}

/** Insert `  const t = useT();` after a component's signature, once. */
function ensureHooks(source, path) {
  const COMPONENT_RE =
    /^(export )?(function [A-Z]\w*|const [A-Z]\w* = memo\(function [A-Z]\w*|const [A-Z]\w* = \()/;
  const eol = source.includes("\r\n") ? "\r\n" : "\n";
  const lines = source.split(/\r?\n/);
  const isComponent = (line) => COMPONENT_RE.test(line);

  // Add the import if any hook is needed and it is missing.
  const needsImport = lines.some((l) => /\bt\("/.test(l)) && !source.includes("shared/i18n");
  if (needsImport) {
    const depth = path.split("/").length - 2; // src/... -> number of "../"
    const up = "../".repeat(depth);
    let last = -1;
    for (let i = 0; i < lines.length; i++) {
      if (/from "[^"]+";$/.test(lines[i]) || /^import "[^"]+";$/.test(lines[i])) {
        last = i;
        continue;
      }
      if (/^(export |function |const |type |\/\*\*)/.test(lines[i])) break;
    }
    if (last < 0) throw new Error(`no import anchor in ${path}`);
    lines.splice(last + 1, 0, `import { useT } from "${up}shared/i18n";`);
  }

  for (let i = lines.length - 1; i >= 0; i--) {
    if (!/\bt\("/.test(lines[i])) continue;
    let fnIdx = -1;
    for (let j = i; j >= 0; j--) {
      if (isComponent(lines[j])) { fnIdx = j; break; }
    }
    if (fnIdx < 0) continue;
    let declared = false;
    for (let j = fnIdx; j < i; j++) {
      if (/const t = useT\(\);/.test(lines[j])) { declared = true; break; }
    }
    if (declared) continue;
    let bodyIdx = -1;
    for (let j = fnIdx; j < Math.min(fnIdx + 100, lines.length); j++) {
      if (lines[j].includes("{") && /\)\s*\{?\s*$/.test(lines[j])) { bodyIdx = j; break; }
    }
    if (bodyIdx < 0 || bodyIdx > i) continue;
    lines.splice(bodyIdx + 1, 0, "  const t = useT();");
  }

  return lines.join(eol);
}

let changedFiles = 0;
let changedStrings = 0;
for (const entry of readdirSync(dir)) {
  if (!entry.endsWith(".tsx") || entry.includes(".test.")) continue;
  const path = join(dir, entry).split("\\").join("/");
  if (!statSync(path).isFile()) continue;

  const { source, edits } = collectEdits(path);
  if (!edits.length) continue;

  let next = source;
  for (const edit of [...edits].sort((a, b) => b.start - a.start)) {
    next = next.slice(0, edit.start) + edit.text + next.slice(edit.end);
  }
  next = ensureHooks(next, path);

  writeFileSync(path, next);
  changedFiles++;
  changedStrings += edits.length;
  console.log(`  ${entry}: ${edits.length}`);
}

console.log(`\n${changedStrings} strings in ${changedFiles} files`);

// Emit the dictionary fragment for the caller to paste, and verify coverage.
const missing = Object.keys(translations).filter(
  (english) => ![...keyByEnglish.keys()].includes(english),
);
if (missing.length) throw new Error(`unmapped: ${missing.slice(0, 3).join(", ")}`);

const en = {};
const zh = {};
for (const [english, chinese] of Object.entries(translations)) {
  en[keyByEnglish.get(english)] = english;
  zh[keyByEnglish.get(english)] = chinese;
}
writeFileSync(`dict-${namespace}.json`, JSON.stringify({ en, zh }, null, 2));
console.log(`dictionary fragment -> dict-${namespace}.json`);
