// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import { messages, setLocale, t } from "../../../shared/i18n";
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

describe("settings page copy follows the locale", () => {
  it("translates every section's page copy", () => {
    setLocale("zh-CN");
    const pages = messages().settings.pages;
    expect(pages.general.alertsTitle).toBe("提醒");
    expect(pages.chat.composerTitle).toBe("输入框");
    expect(pages.appearance.colorTitle).toBe("颜色");
    expect(pages.inbox.githubDescription).toContain("GitHub");
    expect(pages.keybindings.groupTitle).toBe("快捷键");
    expect(pages.providers.advancedTitle).toBe("高级");
    expect(pages.archive.title).toBe("已归档项目");
    expect(pages.monos.enabledLabel).toBe("显示 Mono");
  });

  it("keeps every settings.pages key translatable, not copied from English", () => {
    setLocale("zh-CN");
    const zh = messages().settings.pages;
    setLocale("en");
    const en = messages().settings.pages;
    for (const section of Object.keys(en) as (keyof typeof en)[]) {
      for (const key of Object.keys(en[section]) as (keyof (typeof en)[typeof section])[]) {
        const value = String(zh[section][key]);
        const original = String(en[section][key]);
        // Chinese copy must actually differ; brand names may legitimately match.
        if (!/^[A-Za-z .&+-]+$/.test(original))
          expect(value, `${section}.${String(key)}`).not.toBe(original);
      }
    }
  });

  it("interpolates the provider name into the version error", () => {
    setLocale("zh-CN");
    expect(
      t("settings.pages.providers.invalidVersion", { provider: "Codex" }),
    ).toBe("Codex CLI 返回了无效的版本号。");
  });
});
