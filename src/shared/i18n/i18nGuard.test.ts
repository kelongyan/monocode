import { describe, expect, it } from "vitest";
import {
  findDialogCopy,
  findJsxCopy,
  looksLikeCopy,
} from "../../../scripts/check-i18n.mjs";

describe("findJsxCopy", () => {
  it("flags literals nested in expression containers", () => {
    const src = [
      "const X = ({ locked, label }: { locked: boolean; label: string }) => (",
      '  <button title={locked ? "Hidden globally" : "Show in picker"} aria-label={`Open ${label} location`}>',
      '    {locked ? "Needs attention" : label}',
      "  </button>",
      ");",
    ].join("\n");
    const values = findJsxCopy(src).map((f) => f.value);
    expect(values).toContain("Hidden globally");
    expect(values).toContain("Show in picker");
    // Template holes collapse out, leaving the static text around them.
    expect(values).toContain("Open  location");
    expect(values).toContain("Needs attention");
  });

  it("ignores t()-wrapped values, invisible attributes and nulls", () => {
    const src = [
      "const X = ({ on }: { on: boolean }) => (",
      '  <Row label={t("ui.settings.default")} title={null} value="fast" mode={"plan"}>',
      '    {on ? t("a.b") : null}',
      "  </Row>",
      ");",
    ].join("\n");
    expect(findJsxCopy(src)).toEqual([]);
  });
});

/**
 * The guard is only useful if it agrees with a human about what is copy. These
 * cases pin both directions: real UI text must be flagged, and technical
 * strings must never be, or the report fills with noise and gets ignored.
 */
describe("looksLikeCopy", () => {
  it("flags prose and interface labels", () => {
    expect(looksLikeCopy("Save")).toBe(true);
    expect(looksLikeCopy("History")).toBe(true);
    expect(looksLikeCopy("No project folder")).toBe(true);
    expect(looksLikeCopy("Couldn’t load sessions")).toBe(true);
    expect(looksLikeCopy("Open folder on a machine…")).toBe(true);
    expect(looksLikeCopy("Try it")).toBe(true);
    expect(looksLikeCopy("is still running")).toBe(true);
  });

  it("ignores technical strings", () => {
    expect(looksLikeCopy("flex")).toBe(false);
    expect(looksLikeCopy("onClick")).toBe(false);
    expect(looksLikeCopy("h-full min-h-0")).toBe(false);
    expect(looksLikeCopy("model:gpt-5")).toBe(false);
    expect(looksLikeCopy("data-setting-id")).toBe(false);
    expect(looksLikeCopy("")).toBe(false);
    expect(looksLikeCopy("   ")).toBe(false);
  });

  it("ignores values that are only punctuation or numbers", () => {
    expect(looksLikeCopy("—")).toBe(false);
    expect(looksLikeCopy("0")).toBe(false);
    expect(looksLikeCopy("%")).toBe(false);
  });
});

describe("findDialogCopy", () => {
  it("flags literal dialog text and option labels", () => {
    expect(findDialogCopy(`ask("Merge this pull request?")`)).toHaveLength(1);
    expect(
      findDialogCopy("message(`Could not ${mode} this conversation.`)"),
    ).toHaveLength(1);
    expect(
      findDialogCopy(`ask(msg, { title: "Update available" })`),
    ).toHaveLength(1);
    expect(
      findDialogCopy(`ask(msg, { okLabel: "Close window" })`),
    ).toHaveLength(1);
  });

  it("ignores translated strings, variables, and brand titles", () => {
    expect(findDialogCopy(`ask(t("dialogs.quit"))`)).toHaveLength(0);
    expect(findDialogCopy(`ask(quitWhileBusyMessage(1))`)).toHaveLength(0);
    expect(findDialogCopy(`ask("Delete?", { title: "MonoCode" })`)).toHaveLength(
      1,
    );
    expect(findDialogCopy(`message("", text)`)).toHaveLength(0);
    expect(findDialogCopy(`message(session.id, "/compact")`)).toHaveLength(0);
    expect(findDialogCopy(`host.message("hello")`)).toHaveLength(0);
  });

  it("flags native window dialogs but not other member calls", () => {
    const hits = findDialogCopy(
      'if (!window.confirm("Delete everything?")) return; window.alert("Could not save.");',
    );
    expect(hits.map((h) => h.value)).toEqual([
      "Delete everything?",
      "Could not save.",
    ]);
    expect(findDialogCopy('window.alert(String(err))')).toHaveLength(0);
  });
});
