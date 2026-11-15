import { describe, expect, it } from "vitest";
import { getCaretPositionStatus } from "./getCaretPositionStatus";

// `|` marks the caret, it is stripped from the value
const statusAt = (valueWithCaret: string) => {
  const caretPosition = valueWithCaret.indexOf("|");
  const value = valueWithCaret.replace("|", "");
  return getCaretPositionStatus({ value, caretPosition });
};

describe("getCaretPositionStatus", () => {
  describe("text", () => {
    it("should return text for empty value", () => {
      expect(statusAt("|")).toEqual({ type: "text", startingPosition: 0 });
    });

    it("should return text with caret position for plain text", () => {
      expect(statusAt("plain| text")).toEqual({
        type: "text",
        startingPosition: 5,
      });
    });

    it("should return text when caret is before text preceding the reference", () => {
      expect(statusAt("Example| {{phrase}}")).toEqual({
        type: "text",
        startingPosition: 7,
      });
    });

    it("should return text when caret is after whitespace following the reference", () => {
      expect(statusAt("{{phrase}} |after")).toEqual({
        type: "text",
        startingPosition: 11,
      });
    });

    it("should return text after extra closing braces", () => {
      expect(statusAt("{{a}}}|}")).toEqual({
        type: "text",
        startingPosition: 6,
      });
    });

    it("should return text in trailing text after a reference", () => {
      expect(statusAt("Example {{phrase}} some|thing")).toEqual({
        type: "text",
        startingPosition: 23,
      });
    });

    it("should return text when caret is past whitespace inside braces", () => {
      expect(statusAt("{{a b|}}")).toEqual({
        type: "text",
        startingPosition: 5,
      });
    });

    it("should return text when caret is past a line break inside braces", () => {
      expect(statusAt("{{a\nb|}}")).toEqual({
        type: "text",
        startingPosition: 5,
      });
    });

    it("should return text after whitespace following unterminated ref", () => {
      expect(statusAt("{{a |b")).toEqual({
        type: "text",
        startingPosition: 4,
      });
    });

    it("should return text for stray end marker", () => {
      expect(statusAt("a}}| b")).toEqual({
        type: "text",
        startingPosition: 3,
      });
    });

    it("should return text when caret is after the whole draft run", () => {
      expect(statusAt("{{ab c|")).toEqual({
        type: "text",
        startingPosition: 6,
      });
    });
  });

  describe("valid reference", () => {
    it("should return reference when caret is right before opening braces", () => {
      expect(statusAt("Example |{{phrase}}")).toEqual({
        type: "reference",
        startingPosition: 8,
        text: "{{phrase}}",
        status: "valid",
      });
    });

    it("should return reference when caret is between opening braces", () => {
      expect(statusAt("{|{phrase}}")).toEqual({
        type: "reference",
        startingPosition: 0,
        text: "{{phrase}}",
        status: "valid",
      });
    });

    it("should pick the preceding reference when caret sits between two", () => {
      expect(statusAt("{{a}}|{{b}}")).toEqual({
        type: "reference",
        startingPosition: 0,
        text: "{{a}}",
        status: "valid",
      });
    });

    it("should return reference when caret is between closing braces", () => {
      expect(statusAt("{{phrase}|}")).toEqual({
        type: "reference",
        startingPosition: 0,
        text: "{{phrase}}",
        status: "valid",
      });
    });

    it("should return reference when caret is right after closing braces", () => {
      expect(statusAt("Example {{phrase}}| something")).toEqual({
        type: "reference",
        startingPosition: 8,
        text: "{{phrase}}",
        status: "valid",
      });
    });

    it("should return reference when caret is right after closing braces at end", () => {
      expect(statusAt("{{phrase}}|")).toEqual({
        type: "reference",
        startingPosition: 0,
        text: "{{phrase}}",
        status: "valid",
      });
    });

    it("should return reference when caret is right after opening braces", () => {
      expect(statusAt("{{|phrase}}")).toEqual({
        type: "reference",
        startingPosition: 0,
        text: "{{phrase}}",
        status: "valid",
      });
    });

    it("should return reference when caret is inside the body", () => {
      expect(statusAt("{{phr|ase}}")).toEqual({
        type: "reference",
        startingPosition: 0,
        text: "{{phrase}}",
        status: "valid",
      });
    });

    it("should return reference when caret is right before closing braces", () => {
      expect(statusAt("{{phrase|}}")).toEqual({
        type: "reference",
        startingPosition: 0,
        text: "{{phrase}}",
        status: "valid",
      });
    });

    it("should return reference with its start in mixed text", () => {
      expect(statusAt("Example {{phr|ase}} something")).toEqual({
        type: "reference",
        startingPosition: 8,
        text: "{{phrase}}",
        status: "valid",
      });
    });

    it("should return the second of two references", () => {
      expect(statusAt("{{a}} and {{b|}}")).toEqual({
        type: "reference",
        startingPosition: 10,
        text: "{{b}}",
        status: "valid",
      });
    });

    it("should pick the right one of adjacent references", () => {
      expect(statusAt("{{a|}}{{b}}")).toEqual({
        type: "reference",
        startingPosition: 0,
        text: "{{a}}",
        status: "valid",
      });
      expect(statusAt("{{a}}{{b|}}")).toEqual({
        type: "reference",
        startingPosition: 5,
        text: "{{b}}",
        status: "valid",
      });
    });

    it("should return empty reference", () => {
      expect(statusAt("{{|}}")).toEqual({
        type: "reference",
        startingPosition: 0,
        text: "{{}}",
        status: "valid",
      });
    });

    it("should close reference at first end marker", () => {
      expect(statusAt("{{a|}}}}")).toEqual({
        type: "reference",
        startingPosition: 0,
        text: "{{a}}",
        status: "valid",
      });
    });

    it("should skip invalid opener and use later one", () => {
      expect(statusAt("{{ a {{b|}} c")).toEqual({
        type: "reference",
        startingPosition: 5,
        text: "{{b}}",
        status: "valid",
      });
    });
  });

  describe("draft reference", () => {
    it("should return draft when caret is right before opening braces", () => {
      expect(statusAt("Example |{{ph")).toEqual({
        type: "reference",
        startingPosition: 8,
        text: "{{ph",
        status: "draft",
      });
    });

    it("should return draft when caret is between opening braces", () => {
      expect(statusAt("{|{ph")).toEqual({
        type: "reference",
        startingPosition: 0,
        text: "{{ph",
        status: "draft",
      });
    });

    it("should return empty draft right after typing opening braces", () => {
      expect(statusAt("{{|")).toEqual({
        type: "reference",
        startingPosition: 0,
        text: "{{",
        status: "draft",
      });
    });

    it("should return draft while typing at end of value", () => {
      expect(statusAt("{{ph|")).toEqual({
        type: "reference",
        startingPosition: 0,
        text: "{{ph",
        status: "draft",
      });
    });

    it("should return draft with its start in mixed text", () => {
      expect(statusAt("Example {{ph|")).toEqual({
        type: "reference",
        startingPosition: 8,
        text: "{{ph",
        status: "draft",
      });
    });

    it("should return whole run when caret is inside the draft", () => {
      expect(statusAt("{{ph|rase")).toEqual({
        type: "reference",
        startingPosition: 0,
        text: "{{phrase",
        status: "draft",
      });
    });

    it("should cut draft at whitespace", () => {
      expect(statusAt("{{ph|rase more text")).toEqual({
        type: "reference",
        startingPosition: 0,
        text: "{{phrase",
        status: "draft",
      });
    });

    it("should cut draft at line break", () => {
      expect(statusAt("{{ph|rase\nmore")).toEqual({
        type: "reference",
        startingPosition: 0,
        text: "{{phrase",
        status: "draft",
      });
    });

    it("should return draft after a complete reference", () => {
      expect(statusAt("{{a}} {{b|")).toEqual({
        type: "reference",
        startingPosition: 6,
        text: "{{b",
        status: "draft",
      });
    });

    it("should skip opener broken by whitespace and use later one", () => {
      expect(statusAt("{{a b {{c|")).toEqual({
        type: "reference",
        startingPosition: 6,
        text: "{{c",
        status: "draft",
      });
    });

    it("should be draft when end marker is separated by whitespace", () => {
      expect(statusAt("{{ab|c d}}")).toEqual({
        type: "reference",
        startingPosition: 0,
        text: "{{abc",
        status: "draft",
      });
    });
  });
});
