import { invoke, isTauri } from "@tauri-apps/api/core";
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

/**
 * Push the locale to the native side.
 *
 * Only the Windows tray menu is built in Rust, so this is a no-op elsewhere and
 * must stay best-effort: a failed sync should never block the UI.
 */
export function syncTrayLocale(locale: Locale): Promise<void> {
  if (!isTauri()) return Promise.resolve();
  return invoke("tray_set_locale", { locale }).then(
    () => undefined,
    () => undefined,
  );
}
