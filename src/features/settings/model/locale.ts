import { invoke, isTauri } from "@tauri-apps/api/core";
import type { Locale } from "../../../shared/i18n/types";

/**
 * The interface language is locked to Simplified Chinese in this fork.
 *
 * `en` stays in the dictionaries as the key source and for tests, but the
 * renderer never selects it. The old saved `monocode.locale` is ignored so a
 * machine that once picked English still boots Chinese after this change.
 */
export function loadLocale(): Locale {
  return "zh-CN";
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
