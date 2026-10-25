/**
 * Format whole-number UI counts with stable thousands separators.
 *
 * The formatter follows the active interface language rather than the OS
 * locale, so a Chinese UI shows Chinese grouping even on an English machine.
 * It is rebuilt only when the language changes.
 */
import { currentLocale } from "../../shared/i18n";
import type { Locale } from "../../shared/i18n/types";

const INTL_LOCALE: Record<Locale, string> = {
  en: "en-US",
  "zh-CN": "zh-CN",
};

let cachedLocale: Locale | null = null;
let cachedFormatter: Intl.NumberFormat | null = null;

function formatter(): Intl.NumberFormat {
  const locale = currentLocale();
  if (cachedFormatter && cachedLocale === locale) return cachedFormatter;
  cachedLocale = locale;
  cachedFormatter = new Intl.NumberFormat(INTL_LOCALE[locale], {
    maximumFractionDigits: 0,
  });
  return cachedFormatter;
}

export function formatInteger(value: number): string {
  return formatter().format(value);
}
