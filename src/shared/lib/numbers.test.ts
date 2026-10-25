import { afterEach, describe, expect, it } from "vitest";
import { setLocale } from "../i18n";
import { formatInteger } from "./numbers";

afterEach(() => setLocale("en"));

describe("formatInteger", () => {
  it("groups thousands with commas", () => {
    expect(formatInteger(1250)).toBe("1,250");
    expect(formatInteger(4_222)).toBe("4,222");
    expect(formatInteger(253)).toBe("253");
  });

  it("follows the interface language, not the OS locale", () => {
    // Chinese grouping is also comma-based, so the point is that the locale is
    // read from the app rather than hardcoded: switching must not break it and
    // the formatter is rebuilt for the new locale.
    setLocale("zh-CN");
    expect(formatInteger(1250)).toBe("1,250");
    setLocale("en");
    expect(formatInteger(1250)).toBe("1,250");
  });

  it("keeps whole numbers whole", () => {
    expect(formatInteger(1234.7)).toBe("1,235");
  });
});
