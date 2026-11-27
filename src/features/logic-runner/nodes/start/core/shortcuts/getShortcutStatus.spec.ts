import { describe, expect, it } from "vitest";
import { ShoukaiShortcut } from "@/features/logic/nodes/type/schema";
import { getShortcutStatus } from "./getShortcutStatus";

const shortcut: ShoukaiShortcut = {
  id: "1",
  name: "Google",
  triggers: ["g"],
  phrase: "",
  detectionStrategy: { place: "both", shouldRequireSpace: true },
  type: "search-text",
  searchEngine: "google",
};

describe("getShortcutStatus", () => {
  it("activates when trigger is the first word", () => {
    expect(getShortcutStatus("g example", shortcut)).toMatchObject({
      isActive: true,
      phraseToUse: "example",
    });
  });

  it("activates when trigger is the last word", () => {
    expect(getShortcutStatus("example g", shortcut)).toMatchObject({
      isActive: true,
      phraseToUse: "example",
    });
  });

  it("does not activate for trigger alone", () => {
    expect(getShortcutStatus("g", shortcut)).toEqual({ isActive: false });
  });

  it("does not activate when trigger is in the middle or glued to a word", () => {
    expect(getShortcutStatus("an g example", shortcut).isActive).toBe(false);
    expect(getShortcutStatus("gexample", shortcut).isActive).toBe(false);
  });

  describe("detectionStrategy", () => {
    const withStrategy = (
      detectionStrategy: ShoukaiShortcut["detectionStrategy"],
      triggers = ["g"],
    ): ShoukaiShortcut => ({ ...shortcut, triggers, detectionStrategy });

    it("start: ignores trigger at the end", () => {
      const start = withStrategy({ place: "start", shouldRequireSpace: true });

      expect(getShortcutStatus("g example", start)).toMatchObject({
        isActive: true,
        phraseToUse: "example",
      });
      expect(getShortcutStatus("example g", start).isActive).toBe(false);
    });

    it("end: ignores trigger at the start", () => {
      const end = withStrategy({ place: "end", shouldRequireSpace: true });

      expect(getShortcutStatus("example g", end)).toMatchObject({
        isActive: true,
        phraseToUse: "example",
      });
      expect(getShortcutStatus("g example", end).isActive).toBe(false);
    });

    it("no space required: matches trigger glued to the phrase", () => {
      const start = withStrategy({ place: "start", shouldRequireSpace: false });
      const end = withStrategy({ place: "end", shouldRequireSpace: false }, [
        "?",
      ]);
      const both = withStrategy({ place: "both", shouldRequireSpace: false });

      expect(getShortcutStatus("gexample", start)).toMatchObject({
        isActive: true,
        phraseToUse: "example",
      });
      expect(getShortcutStatus("g example", start)).toMatchObject({
        isActive: true,
        phraseToUse: "example",
      });
      expect(getShortcutStatus("exampleg", start).isActive).toBe(false);

      expect(getShortcutStatus("what is this?", end)).toMatchObject({
        isActive: true,
        phraseToUse: "what is this",
      });
      expect(getShortcutStatus("?what is this", end).isActive).toBe(false);

      expect(getShortcutStatus("exampleg", both)).toMatchObject({
        isActive: true,
        phraseToUse: "example",
      });
      expect(getShortcutStatus("g", both)).toEqual({ isActive: false });
    });

    it("no space required: prefers the longest trigger and skips empty ones", () => {
      const start = withStrategy(
        { place: "start", shouldRequireSpace: false },
        ["", "g", "google"],
      );

      expect(getShortcutStatus("google cats", start)).toMatchObject({
        isActive: true,
        phraseToUse: "cats",
      });
      expect(getShortcutStatus("cats", start).isActive).toBe(false);
    });

    it("middle: matches only a trigger surrounded by words", () => {
      const middle = withStrategy({
        place: "middle",
        shouldRequireSpace: true,
      });

      expect(getShortcutStatus("an g example", middle)).toMatchObject({
        isActive: true,
        phraseToUse: "an example",
      });
      expect(getShortcutStatus("g example", middle).isActive).toBe(false);
      expect(getShortcutStatus("example g", middle).isActive).toBe(false);
      expect(getShortcutStatus("angexample", middle).isActive).toBe(false);
    });
  });

  it("returns getSearchUrl using {{phrase}} from shortcut", () => {
    const status = getShortcutStatus("g example", {
      ...shortcut,
      phrase: "{{phrase}} wikipedia",
    });

    expect(status.isActive && status.getSearchUrl(status.phraseToUse)).toBe(
      "https://www.google.com/search?q=example wikipedia",
    );
  });
});
