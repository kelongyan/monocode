import { en } from "./locales/en";
import { zhCN } from "./locales/zh-CN";

/** The English dictionary is the source of truth; other locales must match it. */
export type Dictionary = typeof en;

/** Dot-separated paths to every translatable string, e.g. `"common.close"`. */
type Leaves<T> = T extends string
  ? never
  : {
      [K in keyof T & string]: T[K] extends string
        ? K
        : `${K}.${Leaves<T[K]>}`;
    }[keyof T & string];

export type MessageKey = Leaves<Dictionary>;

export const DICTIONARIES = {
  en,
  "zh-CN": zhCN,
} satisfies Record<string, Dictionary>;
