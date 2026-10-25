/**
 * Locale state shared by the whole renderer.
 *
 * `t()` has to work both inside and outside React, so the active locale lives
 * in a module-level store rather than a context. Components subscribe through
 * `useLocale()` so a language change re-renders them.
 */
import type { Locale } from "./types";

type Listener = () => void;

const listeners = new Set<Listener>();

let locale: Locale = "en";

export function currentLocale(): Locale {
  return locale;
}

export function setLocale(next: Locale): void {
  if (next === locale) return;
  locale = next;
  for (const listener of listeners) listener();
}

export function subscribeLocale(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
