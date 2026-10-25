// Merge a generated dictionary fragment into both locale files.
//
// The fragment comes from scripts/apply-i18n-batch.mjs and looks like
// { en: { key: "English" }, zh: { key: "中文" } }. It is inserted as
// `ui.<namespace>`, matching the keys the batch tool wrote into the code.
import { readFileSync, writeFileSync } from "node:fs";

const [namespace, fragmentPath] = process.argv.slice(2);
if (!namespace || !fragmentPath) {
  throw new Error("usage: merge-dict.mjs <namespace> <fragment.json>");
}

const fragment = JSON.parse(readFileSync(fragmentPath, "utf8"));

const files = [
  { path: "src/shared/i18n/locales/en/index.ts", section: "en" },
  { path: "src/shared/i18n/locales/zh-CN/index.ts", section: "zh" },
];

for (const file of files) {
  const text = readFileSync(file.path, "utf8");
  const eol = text.includes("\r\n") ? "\r\n" : "\n";
  const entries = fragment[file.section];
  const body = Object.entries(entries)
    .map(([key, value]) => `      ${JSON.stringify(key)}: ${JSON.stringify(value)},`)
    .join(eol);

  const marker = "  ui: {";
  if (text.includes(marker)) {
    // Append into the existing ui block, before its closing brace.
    const start = text.indexOf(marker);
    const close = text.indexOf("\n  },", start);
    if (close < 0) throw new Error(`unterminated ui block in ${file.path}`);
    const insertAt = text.lastIndexOf("\n", close);
    const next =
      text.slice(0, insertAt) +
      `${eol}    ${JSON.stringify(namespace)}: {` +
      `${eol}${body}${eol}    },` +
      text.slice(insertAt);
    writeFileSync(file.path, next);
  } else {
    // First batch: create the ui block right after the opening brace.
    const open = text.indexOf("= {");
    if (open < 0) throw new Error(`no dictionary object in ${file.path}`);
    const insertAt = text.indexOf("\n", open) + 1;
    const block =
      `  ui: {` +
      `${eol}    ${JSON.stringify(namespace)}: {` +
      `${eol}${body}${eol}    },` +
      `${eol}  },${eol}`;
    writeFileSync(file.path, text.slice(0, insertAt) + block + text.slice(insertAt));
  }
  console.log(`${file.path}: +${Object.keys(entries).length}`);
}
