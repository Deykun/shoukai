import { describe, expect, it } from "vitest";
import { ShoukaiShortcut } from "@/features/logic/nodes/type/schema";
import { getShortcutStatus } from "./getShortcutStatus";

const shortcut: ShoukaiShortcut = {
  id: "1",
  name: "Google",
  triggers: ["g"],
  phrase: "",
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

  it("returns getSearchUrl using {{phrase}} from shortcut", () => {
    const status = getShortcutStatus("g example", {
      ...shortcut,
      phrase: "{{phrase}} wikipedia",
    });

    expect(status.isActive && status.getSearchUrl(status.phraseToUse)).toBe(
      "https://www.google.com/search?q=example%20wikipedia",
    );
  });
});
