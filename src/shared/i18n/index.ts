import { useSyncExternalStore } from "react";
import { DICTIONARIES, type Dictionary, type MessageKey } from "./dictionary";
import { currentLocale, setLocale, subscribeLocale } from "./store";
import type { Locale } from "./types";

/** Values substituted into `{name}` placeholders. */
export type MessageVars = Record<string, string | number>;

function lookup(dictionary: unknown, key: string): string | undefined {
  let node = dictionary;
  for (const part of key.split(".")) {
    if (typeof node !== "object" || node === null) return undefined;
    node = (node as Record<string, unknown>)[part];
  }
  return typeof node === "string" ? node : undefined;
}

function interpolate(message: string, vars?: MessageVars): string {
  if (!vars) return message;
  return message.replace(/\{(\w+)\}/g, (whole, name: string) =>
    name in vars ? String(vars[name]) : whole,
  );
}

/**
 * Translate a key in the active locale.
 *
 * Falls back to the English message when a locale is missing a key, and to the
 * key itself when even English lacks it, so a missing translation degrades to
 * readable text instead of throwing. Safe to call outside React.
 */
export function t(key: MessageKey, vars?: MessageVars): string {
  const message = lookup(DICTIONARIES[currentLocale()], key);
  if (message !== undefined) return interpolate(message, vars);
  const fallback = lookup(DICTIONARIES.en, key);
  return fallback === undefined ? key : interpolate(fallback, vars);
}

/**
 * The active locale's dictionary, typed as `Dictionary`.
 *
 * Use this for structured text that is indexed by a closed union (settings
 * sections and rows, runtime modes) instead of building key strings with
 * template literals: `messages().settings.sections[id].label` stays type-safe
 * and needs no cast. Read it during render so a locale change is picked up.
 */
export function messages(): Dictionary {
  return DICTIONARIES[currentLocale()];
}

/** Re-renders the component when the locale changes, then returns `t`. */
export function useT(): typeof t {
  useSyncExternalStore(subscribeLocale, currentLocale, () => "en");
  return t;
}

/** Subscribe to the active locale without translating anything. */
export function useLocale(): Locale {
  return useSyncExternalStore(subscribeLocale, currentLocale, () => "en");
}

export type { Locale, MessageKey, Dictionary };
export { setLocale, currentLocale };
export { LOCALES, LOCALE_LABEL, isLocale } from "./types";
