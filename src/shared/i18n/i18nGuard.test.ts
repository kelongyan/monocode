import { describe, expect, it } from "vitest";
import {
  findDialogCopy,
  looksLikeCopy,
} from "../../../scripts/check-i18n.mjs";

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
});
