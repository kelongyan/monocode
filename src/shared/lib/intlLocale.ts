/**
 * Date and number formatting that follows the interface language.
 *
 * `toLocaleString(undefined, …)` snapshots the OS locale, which is wrong once
 * the app has its own language setting: a Chinese UI on an English machine
 * would print English month names. These helpers read the app locale instead.
 *
 * Read them inside `format()` calls rather than hoisting a formatter to module
 * scope, or a language switch would keep the old one.
 */
import { currentLocale } from "../../shared/i18n";
import type { Locale } from "../../shared/i18n/types";

const INTL_LOCALE: Record<Locale, string> = {
  en: "en-US",
  "zh-CN": "zh-CN",
};

/** BCP 47 tag for the active interface language, for `Intl`/`toLocale*`. */
export function intlLocale(): string {
  return INTL_LOCALE[currentLocale()];
}
