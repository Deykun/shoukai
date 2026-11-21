import { describe, expect, it } from "vitest";
import { getReferencesInString } from "../../../../../formula-builder/utils/references/getReferencesInString";

describe("getReferencesInString", () => {
  it("lists references in order", () => {
    expect(
      getReferencesInString(
        "a {{phrase}} b {{nodes.x.1}} c {{phrase|example}}",
      ),
    ).toEqual(["{{phrase}}", "{{nodes.x.1}}", "{{phrase|example}}"]);
  });

  it("returns empty array when there are none", () => {
    expect(getReferencesInString("just text")).toEqual([]);
  });

  it("keeps duplicates and glued references", () => {
    expect(getReferencesInString("{{a}}{{b}} {{a}}")).toEqual([
      "{{a}}",
      "{{b}}",
      "{{a}}",
    ]);
  });

  it("ignores empty, spaced and unclosed brackets", () => {
    expect(getReferencesInString("{{}} {{a b}} {{a")).toEqual([]);
  });
});
