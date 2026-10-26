// Guard against un-internationalized copy creeping back into the UI.
//
// Reports user-visible English strings that are not routed through `t()` in
// `src/**/*.tsx` (JSX text and visible attributes) and in `src/**/*.ts` plus
// `.tsx` (string literals passed to native dialog calls such as `ask()` and
// `message()`, whose arguments JSX scanning cannot see). Uses the TypeScript
// AST rather than a regex so class names, data-* attributes and identifiers
// are never mistaken for copy.
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
  "message",
  "body",
]);

/** Native dialog APIs whose string arguments the user reads. */
const DIALOG_CALLEES = new Set(["ask", "message", "toast", "notify"]);
const DIALOG_OPTION_ATTRS = new Set(["title", "okLabel", "cancelLabel"]);

/**
 * Files that hold runtime instructions or protocol constants rather than
 * interface copy. Kept explicit so the list is reviewable.
 */
const ALLOWED_FILES = new Set([
  "src/instructions/inbox.md",
]);

/** Provider protocol modules parse CLI output; their strings are not copy. */
const ALLOWED_DIRS = ["src/integrations/harness/providers/"];

/**
 * A string is treated as copy when it looks like prose: two words separated by
 * a space and not shaped like a utility class, or it ends with sentence
 * punctuation, or it is a single capitalised word ("Save", "History").
 *
 * The caller only feeds this JSX text nodes, a whitelist of user-visible
 * attributes, and dialog-call arguments, so class names normally never reach
 * it. The utility-class check exists so a stray `className`-shaped value in
 * one of those slots is not reported as copy.
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
    else if (
      (entry.endsWith(".tsx") || entry.endsWith(".ts")) &&
      !entry.includes(".test.") &&
      !entry.endsWith(".d.ts")
    ) {
      out.push(full);
    }
  }
  return out;
}

function attributeName(node) {
  const name = node.name;
  if (ts.isIdentifier(name)) return name.text;
  return undefined;
}

/** The literal text of a string-ish argument, with holes collapsed away. */
function literalText(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }
  if (ts.isTemplateExpression(node)) {
    return (
      node.head.text +
      node.templateSpans.map((span) => span.literal.text).join("")
    );
  }
  return undefined;
}

/**
 * Report native dialog calls whose literal arguments read as UI copy, in both
 * `.ts` and `.tsx` sources. Strings already wrapped in `t(...)` are call
 * expressions, not literals, so they never reach this check.
 */
export function findDialogCopy(source) {
  const sf = ts.createSourceFile(
    "inline.ts",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const findings = [];

  const visit = (node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      DIALOG_CALLEES.has(node.expression.text) &&
      node.arguments.length > 0
    ) {
      const { line } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
      const text = literalText(node.arguments[0]);
      if (text !== undefined && looksLikeCopy(text)) {
        findings.push({ line: line + 1, kind: "dialog-text", value: text });
      }
      const options = node.arguments[1];
      if (options && ts.isObjectLiteralExpression(options)) {
        for (const prop of options.properties) {
          if (
            ts.isPropertyAssignment(prop) &&
            ts.isIdentifier(prop.name) &&
            DIALOG_OPTION_ATTRS.has(prop.name.text)
          ) {
            const value = literalText(prop.initializer);
            if (value !== undefined && looksLikeCopy(value)) {
              findings.push({
                line: line + 1,
                kind: `dialog:${prop.name.text}`,
                value,
              });
            }
          }
        }
      }
    }
    ts.forEachChild(node, visit);
  };

  visit(sf);
  return findings;
}

function scanFile(path, isTsx) {
  const source = readFileSync(path, "utf8");
  const sf = ts.createSourceFile(
    path,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const findings = findDialogCopy(source);

  if (!isTsx) return findings;

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
  const files = walk(ROOT).filter((file) => {
    const rel = relative(".", file).split("\\").join("/");
    if (ALLOWED_FILES.has(rel)) return false;
    if (ALLOWED_DIRS.some((dir) => rel.startsWith(dir))) return false;
    return true;
  });

  let total = 0;
  for (const file of files) {
    const findings = scanFile(file, file.endsWith(".tsx"));
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
