// Guard against un-internationalized copy creeping back into the UI.
//
// Reports user-visible English strings that are not routed through `t()` in
// `src/**/*.tsx`. Uses the TypeScript AST rather than a regex so class names,
// data-* attributes and identifiers are never mistaken for copy.
//
// Usage:
//   node scripts/check-i18n.mjs            # report, exit 1 on findings
//   node scripts/check-i18n.mjs --warn     # report, always exit 0
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import ts from "typescript";

const ROOT = "src";

/** Attributes whose text the user reads. */
const VISIBLE_ATTRS = new Set([
  "title",
  "label",
  "aria-label",
  "ariaLabel",
  "placeholder",
  "alt",
  "description",
  "triggerLabel",
  "emptyLabel",
]);

/**
 * Files that hold runtime instructions or protocol constants rather than
 * interface copy. Kept explicit so the list is reviewable.
 */
const ALLOWED_FILES = new Set([
  "src/instructions/inbox.md",
]);

/**
 * A string is treated as copy when it looks like prose: two words separated by
 * a space and not shaped like a utility class, or it ends with sentence
 * punctuation, or it is a single capitalised word ("Save", "History").
 *
 * The caller only feeds this JSX text nodes and a whitelist of user-visible
 * attributes, so class names normally never reach it. The utility-class check
 * exists so a stray `className`-shaped value in one of those slots is not
 * reported as copy.
 */
export function looksLikeCopy(value) {
  const text = value.trim();
  if (text.length < 2) return false;
  // Must contain at least one letter.
  if (!/[A-Za-z]/.test(text)) return false;

  const words = text.split(/\s+/);
  // Utility-class soup: every token is a short lowercase kebab/utility token.
  const utilityLike = words.every((word) => /^[a-z0-9:[\]./%-]+$/.test(word));
  if (words.length > 1 && utilityLike) return false;

  // Multi-word prose.
  if (/[A-Za-z]\s+[A-Za-z]/.test(text)) return true;
  // Sentence punctuation.
  if (/[.!?…]$/.test(text)) return true;
  // A single capitalised word reads as a label.
  if (/^[A-Z][a-z]{2,}$/.test(text)) return true;
  return false;
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (entry.endsWith(".tsx") && !entry.includes(".test.")) out.push(full);
  }
  return out;
}

function isInsideT(node) {
  // A string passed to t(...) or used in a JSX expression is already handled;
  // only literal JSX text and literal attribute values are reported.
  return false;
}

function attributeName(node) {
  const name = node.name;
  if (ts.isIdentifier(name)) return name.text;
  return undefined;
}

function scanFile(path) {
  const source = readFileSync(path, "utf8");
  const sf = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const findings = [];

  const visit = (node) => {
    // Literal JSX text: <span>Save</span>
    if (ts.isJsxText(node)) {
      const value = node.text.replace(/\s+/g, " ").trim();
      if (value && looksLikeCopy(value)) {
        const { line } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
        findings.push({ line: line + 1, kind: "jsx-text", value });
      }
    }

    // Visible attribute with a string literal: title="Save"
    if (ts.isJsxAttribute(node)) {
      const name = attributeName(node);
      const init = node.initializer;
      if (
        name &&
        VISIBLE_ATTRS.has(name) &&
        init &&
        ts.isStringLiteral(init) &&
        looksLikeCopy(init.text)
      ) {
        const { line } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
        findings.push({ line: line + 1, kind: `attr:${name}`, value: init.text });
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sf);
  return findings;
}

const warnOnly = process.argv.includes("--warn");
const isMain =
  process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href;

if (isMain) {
  const files = walk(ROOT).filter(
    (file) => !ALLOWED_FILES.has(relative(".", file).split("\\").join("/")),
  );

  let total = 0;
  for (const file of files) {
    const findings = scanFile(file);
    if (!findings.length) continue;
    const rel = relative(".", file).split("\\").join("/");
    console.log(`\n${rel}`);
    for (const finding of findings) {
      console.log(
        `  ${finding.line}: [${finding.kind}] ${JSON.stringify(finding.value)}`,
      );
      total++;
    }
  }

  if (total === 0) {
    console.log("No un-internationalized UI copy found.");
    process.exit(0);
  }

  console.log(`\n${total} string(s) look like UI copy but do not go through t().`);
  if (warnOnly) {
    console.log("Running in --warn mode; not failing.");
    process.exit(0);
  }
  process.exit(1);
}
