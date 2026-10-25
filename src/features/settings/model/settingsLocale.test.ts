// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import { setLocale } from "../../../shared/i18n";
import {
  searchSettings,
  settingsIndex,
  settingsSectionDescription,
  settingsSectionLabel,
  settingsSections,
} from "./settings";
import { runtimeModeHint, runtimeModeLabel } from "../../sessions/model/session";

/**
 * The structural refactor made these tables read the dictionary at call time.
 * These assertions prove a locale change actually reaches them, which the
 * English-only suite cannot show.
 */
describe("settings copy follows the locale", () => {
  it("translates section labels and descriptions", () => {
    setLocale("zh-CN");
    expect(settingsSectionLabel("appearance")).toBe("外观");
    expect(settingsSectionDescription("appearance")).toContain("主题");
    expect(settingsSections().find((s) => s.id === "appearance")?.label).toBe(
      "外观",
    );

    setLocale("en");
    expect(settingsSectionLabel("appearance")).toBe("Appearance");
  });

  it("translates setting labels", () => {
    setLocale("zh-CN");
    expect(settingsIndex().find((e) => e.id === "theme")?.label).toBe("主题");
    setLocale("en");
    expect(settingsIndex().find((e) => e.id === "theme")?.label).toBe("Theme");
  });

  it("finds a setting by its Chinese label", () => {
    setLocale("zh-CN");
    expect(searchSettings("主题")[0]).toMatchObject({
      settingId: "theme",
      label: "主题",
    });
  });

  it("finds a setting by a Chinese keyword and by the English original", () => {
    setLocale("zh-CN");
    // Chinese synonym from the entry's keywords.
    expect(searchSettings("毛玻璃").some((r) => r.settingId === "blur")).toBe(
      true,
    );
    // English keyword kept so either language matches.
    expect(searchSettings("prettier")[0]).toMatchObject({
      settingId: "format-on-save",
    });
  });

  it("finds a whole page by its Chinese name", () => {
    setLocale("zh-CN");
    expect(searchSettings("快捷键")).toContainEqual({
      section: "keybindings",
      sectionLabel: "快捷键",
      settingId: null,
      label: "快捷键",
    });
  });
});

describe("runtime mode copy follows the locale", () => {
  it("translates labels and hints", () => {
    setLocale("zh-CN");
    expect(runtimeModeLabel("supervised")).toBe("监督模式");
    expect(runtimeModeHint("supervised")).toContain("询问");
    setLocale("en");
    expect(runtimeModeLabel("supervised")).toBe("Supervised");
  });
});
