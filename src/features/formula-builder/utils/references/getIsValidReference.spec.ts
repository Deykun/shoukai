import { describe, expect, it } from "vitest";
import { ReferenceConfig } from "@/features/logic/constants";
import { getIsValidReference } from "./getIsValidReference";

const references: ReferenceConfig[] = [
  { value: "{{phrase}}", label: "Phrase", type: "string" },
  { value: "{{count}}", label: "Count", type: "number" },
];

describe("getIsValidReference", () => {
  it("should return true for known reference", () => {
    expect(
      getIsValidReference({ referenceToCheck: "{{phrase}}", references }),
    ).toBe(true);
    expect(
      getIsValidReference({ referenceToCheck: "{{count}}", references }),
    ).toBe(true);
  });

  it("should return false for unknown reference", () => {
    expect(
      getIsValidReference({ referenceToCheck: "{{unknown}}", references }),
    ).toBe(false);
  });

  it("should return false for undefined", () => {
    expect(
      getIsValidReference({ referenceToCheck: undefined, references }),
    ).toBe(false);
  });

  it("should return false for empty references list", () => {
    expect(
      getIsValidReference({ referenceToCheck: "{{phrase}}", references: [] }),
    ).toBe(false);
  });

  it("should return false for reference without brackets", () => {
    expect(
      getIsValidReference({ referenceToCheck: "phrase", references }),
    ).toBe(false);
  });

  describe("modifiers", () => {
    it("should ignore single modifier", () => {
      expect(
        getIsValidReference({
          referenceToCheck: "{{phrase|lowercase}}",
          references,
        }),
      ).toBe(true);
    });

    it("should ignore multiple modifiers", () => {
      expect(
        getIsValidReference({
          referenceToCheck: "{{phrase|trim|lowercase}}",
          references,
        }),
      ).toBe(true);
    });

    it("should return false for unknown reference with modifier", () => {
      expect(
        getIsValidReference({
          referenceToCheck: "{{unknown|lowercase}}",
          references,
        }),
      ).toBe(false);
    });
  });
});
