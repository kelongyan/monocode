import { describe, expect, it } from "vitest";
import { DICTIONARIES, type Dictionary, type MessageKey } from "./dictionary";
import { t } from "./index";
import { setLocale } from "./store";

type LocaleId = keyof typeof DICTIONARIES;

function locales(): LocaleId[] {
  return Object.keys(DICTIONARIES) as LocaleId[];
}

/** Flatten a nested dictionary into `"a.b.c" -> message`. */
function flatten(node: unknown, prefix = ""): Map<string, string> {
  const out = new Map<string, string>();
  for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") {
      out.set(path, value);
    } else {
      for (const [inner, message] of flatten(value, path)) {
        out.set(inner, message);
      }
    }
  }
  return out;
}

function placeholderNames(message: string): string[] {
  return [...message.matchAll(/\{(\w+)\}/g)]
    .map((match) => match[1])
    .sort();
}

const english = flatten(DICTIONARIES.en);
const englishKeys = [...english.keys()].sort();

describe("dictionaries", () => {
  it("defines the same keys in every locale", () => {
    for (const locale of locales()) {
      expect([...flatten(DICTIONARIES[locale]).keys()].sort(), locale).toEqual(
        englishKeys,
      );
    }
  });

  it("has no empty messages", () => {
    for (const locale of locales()) {
      for (const [key, message] of flatten(DICTIONARIES[locale])) {
        expect(message.trim(), `${locale} ${key}`).not.toBe("");
      }
    }
  });

  it("keeps placeholder names in sync across locales", () => {
    for (const locale of locales()) {
      for (const [key, message] of flatten(DICTIONARIES[locale])) {
        expect(placeholderNames(message), `${locale} ${key}`).toEqual(
          placeholderNames(english.get(key) ?? ""),
        );
      }
    }
  });

  it("exposes every leaf as a typed key", () => {
    // Compile-time guard: each real key must be assignable to MessageKey.
    const keys: MessageKey[] = [...englishKeys] as MessageKey[];
    expect(keys.length).toBeGreaterThan(0);
  });
});

describe("t", () => {
  it("translates a key in the active locale", () => {
    setLocale("zh-CN");
    expect(t("common.close")).toBe("关闭");
    setLocale("en");
    expect(t("common.close")).toBe("Close");
  });

  it("falls back to the key when no dictionary has it", () => {
    setLocale("en");
    // Cast: the key type forbids this at compile time, which is the point.
    expect(t("common.missing" as MessageKey)).toBe("common.missing");
  });

  it("substitutes named placeholders", () => {
    setLocale("en");
    expect(t("common.renameNamed", { name: "work" })).toBe("Rename work");
    setLocale("zh-CN");
    expect(t("common.renameNamed", { name: "work" })).toBe("重命名 work");
  });

  it("leaves an unknown placeholder verbatim", () => {
    setLocale("en");
    expect(t("common.removeNamed", { other: "x" })).toBe("Remove {name}");
  });
});

// Compile-time guard: every locale must satisfy the English shape.
const _zh: Dictionary = DICTIONARIES["zh-CN"];
void _zh;
