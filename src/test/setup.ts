/**
 * Test environment defaults.
 *
 * The UI assertions across the suite are written against English copy, so the
 * active locale is pinned here. Tests that exercise translation itself call
 * `setLocale("zh-CN")` themselves.
 */
import { setLocale } from "../shared/i18n";

setLocale("en");

class MemoryStorage {
  private store = new Map<string, string>();
  getItem(key: string) {
    return this.store.get(key) ?? null;
  }
  setItem(key: string, value: string) {
    this.store.set(key, String(value));
  }
  removeItem(key: string) {
    this.store.delete(key);
  }
  clear() {
    this.store.clear();
  }
  get length() {
    return this.store.size;
  }
  key(index: number) {
    return Array.from(this.store.keys())[index] ?? null;
  }
}

if (
  typeof globalThis.localStorage === "undefined" ||
  typeof (globalThis.localStorage as { clear?: () => void }).clear !== "function"
) {
  (globalThis as { localStorage?: unknown }).localStorage = new MemoryStorage();
}
