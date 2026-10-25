/**
 * Test environment defaults.
 *
 * The UI assertions across the suite are written against English copy, so the
 * active locale is pinned here. Tests that exercise translation itself call
 * `setLocale("zh-CN")` themselves.
 */
import { setLocale } from "../shared/i18n";

setLocale("en");
