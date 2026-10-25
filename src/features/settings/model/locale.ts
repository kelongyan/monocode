import { isLocale, type Locale } from "../../../shared/i18n/types";

const LOCALE_KEY = "monocode.locale";

/** The saved interface language, defaulting to English on first run. */
export function loadLocale(): Locale {
  try {
    const raw = localStorage.getItem(LOCALE_KEY);
    return isLocale(raw) ? raw : "en";
  } catch {
    return "en";
  }
}

export function saveLocale(locale: Locale): void {
  try {
    localStorage.setItem(LOCALE_KEY, locale);
  } catch {
    // private mode / quota
  }
}
