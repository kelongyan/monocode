import { describe, expect, it } from "vitest";
import { looksLikeCopy } from "../../../scripts/check-i18n.mjs";

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
