// @vitest-environment happy-dom
import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { setLocale } from "../../../shared/i18n";
import { loadLocale, saveLocale } from "./locale";

describe("locale persistence", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("defaults to English when nothing is saved", () => {
    expect(loadLocale()).toBe("en");
  });

  it("round-trips a saved locale", () => {
    saveLocale("zh-CN");
    expect(loadLocale()).toBe("zh-CN");
  });

  it("ignores an unknown saved value", () => {
    localStorage.setItem("monocode.locale", "fr");
    expect(loadLocale()).toBe("en");
  });
});

describe("locale store", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    localStorage.clear();
    setLocale("en");
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    setLocale("en");
  });

  it("re-renders a subscriber when the locale changes", async () => {
    const { useT } = await import("../../../shared/i18n");
    function Label() {
      const t = useT();
      return createElement("span", null, t("common.close"));
    }
    await act(async () => root.render(createElement(Label)));
    expect(container.textContent).toBe("Close");

    await act(async () => setLocale("zh-CN"));
    expect(container.textContent).toBe("关闭");
  });
});
