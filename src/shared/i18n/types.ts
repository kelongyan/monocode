/** Languages the UI can render. `en` is the source of truth for keys. */
export type Locale = "en" | "zh-CN";

export const LOCALES: readonly Locale[] = ["en", "zh-CN"] as const;

/** Shown in the language picker, each in its own language. */
export const LOCALE_LABEL: Record<Locale, string> = {
  en: "English",
  "zh-CN": "简体中文",
};

export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "zh-CN";
}
