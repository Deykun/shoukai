import { describe, expect, it } from "vitest";
import { getChunksFromValue } from "./chunks";

const references = ["{{phrase}}", "{{reference}}", "{{a}}", "{{b}}"];

describe("getChunksFromValue", () => {
  it("should return single empty text chunk for empty string", () => {
    expect(getChunksFromValue("", references)).toEqual([
      { type: "text", value: "", fromPosition: 0, toPosition: 0 },
    ]);
  });

  it("should return single text chunk for plain text", () => {
    expect(getChunksFromValue("plain text", references)).toEqual([
      { type: "text", value: "plain text", fromPosition: 0, toPosition: 10 },
    ]);
  });

  it("should return single valid reference chunk for lone known ref", () => {
    expect(getChunksFromValue("{{phrase}}", references)).toEqual([
      {
        type: "reference",
        reference: "{{phrase}}",
        state: "valid",
        fromPosition: 0,
        toPosition: 10,
      },
    ]);
  });

  it("should mark unknown ref as invalid", () => {
    expect(getChunksFromValue("{{unknown}}", references)).toEqual([
      {
        type: "reference",
        reference: "{{unknown}}",
        state: "invalid",
        fromPosition: 0,
        toPosition: 11,
      },
    ]);
  });

  it("should mark every ref invalid when references are empty", () => {
    expect(getChunksFromValue("{{phrase}}", [])).toEqual([
      {
        type: "reference",
        reference: "{{phrase}}",
        state: "invalid",
        fromPosition: 0,
        toPosition: 10,
      },
    ]);
  });

  it("should default references to empty array", () => {
    expect(getChunksFromValue("{{phrase}}")).toEqual([
      {
        type: "reference",
        reference: "{{phrase}}",
        state: "invalid",
        fromPosition: 0,
        toPosition: 10,
      },
    ]);
  });

  it("should match references exactly, including markers", () => {
    expect(getChunksFromValue("{{phrase}}", ["phrase"])).toEqual([
      {
        type: "reference",
        reference: "{{phrase}}",
        state: "invalid",
        fromPosition: 0,
        toPosition: 10,
      },
    ]);
  });

  it("should split mixed text into untrimmed text and reference chunks", () => {
    expect(
      getChunksFromValue("Example {{phrase}} with 2 {{reference}} emebed", references),
    ).toEqual([
      { type: "text", value: "Example ", fromPosition: 0, toPosition: 8 },
      {
        type: "reference",
        reference: "{{phrase}}",
        state: "valid",
        fromPosition: 8,
        toPosition: 18,
      },
      { type: "text", value: " with 2 ", fromPosition: 18, toPosition: 26 },
      {
        type: "reference",
        reference: "{{reference}}",
        state: "valid",
        fromPosition: 26,
        toPosition: 39,
      },
      { type: "text", value: " emebed", fromPosition: 39, toPosition: 46 },
    ]);
  });

  it("should mix valid and invalid refs in one value", () => {
    expect(getChunksFromValue("{{phrase}} {{nope}}", references)).toEqual([
      {
        type: "reference",
        reference: "{{phrase}}",
        state: "valid",
        fromPosition: 0,
        toPosition: 10,
      },
      { type: "text", value: " ", fromPosition: 10, toPosition: 11 },
      {
        type: "reference",
        reference: "{{nope}}",
        state: "invalid",
        fromPosition: 11,
        toPosition: 19,
      },
    ]);
  });

  it("should keep leading and trailing whitespace in text chunks", () => {
    expect(getChunksFromValue("  a {{b}}  ", references)).toEqual([
      { type: "text", value: "  a ", fromPosition: 0, toPosition: 4 },
      {
        type: "reference",
        reference: "{{b}}",
        state: "valid",
        fromPosition: 4,
        toPosition: 9,
      },
      { type: "text", value: "  ", fromPosition: 9, toPosition: 11 },
    ]);
  });

  it("should not emit empty text chunk between adjacent refs", () => {
    expect(getChunksFromValue("{{a}}{{b}}", references)).toEqual([
      {
        type: "reference",
        reference: "{{a}}",
        state: "valid",
        fromPosition: 0,
        toPosition: 5,
      },
      {
        type: "reference",
        reference: "{{b}}",
        state: "valid",
        fromPosition: 5,
        toPosition: 10,
      },
    ]);
  });

  it("should keep whitespace-only text between refs", () => {
    expect(getChunksFromValue("{{a}} {{b}}", references)).toEqual([
      {
        type: "reference",
        reference: "{{a}}",
        state: "valid",
        fromPosition: 0,
        toPosition: 5,
      },
      { type: "text", value: " ", fromPosition: 5, toPosition: 6 },
      {
        type: "reference",
        reference: "{{b}}",
        state: "valid",
        fromPosition: 6,
        toPosition: 11,
      },
    ]);
  });

  it("should treat ref with spaces as plain text", () => {
    expect(getChunksFromValue("{{ a.b }}", references)).toEqual([
      { type: "text", value: "{{ a.b }}", fromPosition: 0, toPosition: 9 },
    ]);
  });

  it("should treat ref spanning lines as plain text", () => {
    expect(getChunksFromValue("{{a\nb}}", references)).toEqual([
      { type: "text", value: "{{a\nb}}", fromPosition: 0, toPosition: 7 },
    ]);
  });

  it("should skip invalid ref start and find later valid ref", () => {
    expect(getChunksFromValue("{{ a {{b}} c", references)).toEqual([
      { type: "text", value: "{{ a ", fromPosition: 0, toPosition: 5 },
      {
        type: "reference",
        reference: "{{b}}",
        state: "valid",
        fromPosition: 5,
        toPosition: 10,
      },
      { type: "text", value: " c", fromPosition: 10, toPosition: 12 },
    ]);
  });

  it("should allow empty reference and mark it invalid", () => {
    expect(getChunksFromValue("{{}}", references)).toEqual([
      {
        type: "reference",
        reference: "{{}}",
        state: "invalid",
        fromPosition: 0,
        toPosition: 4,
      },
    ]);
  });

  it("should treat unterminated ref as plain text", () => {
    expect(getChunksFromValue("a {{b", references)).toEqual([
      { type: "text", value: "a {{b", fromPosition: 0, toPosition: 5 },
    ]);
  });

  it("should treat stray end marker as plain text", () => {
    expect(getChunksFromValue("a}} b", references)).toEqual([
      { type: "text", value: "a}} b", fromPosition: 0, toPosition: 5 },
    ]);
  });

  it("should treat text before unterminated ref as one text chunk", () => {
    expect(getChunksFromValue("{{a}} b {{c", references)).toEqual([
      {
        type: "reference",
        reference: "{{a}}",
        state: "valid",
        fromPosition: 0,
        toPosition: 5,
      },
      { type: "text", value: " b {{c", fromPosition: 5, toPosition: 11 },
    ]);
  });

  it("should close ref at first end marker", () => {
    expect(getChunksFromValue("{{a}}}}", references)).toEqual([
      {
        type: "reference",
        reference: "{{a}}",
        state: "valid",
        fromPosition: 0,
        toPosition: 5,
      },
      { type: "text", value: "}}", fromPosition: 5, toPosition: 7 },
    ]);
  });

  it("should round-trip by joining chunks", () => {
    const source = "Example {{phrase}} with 2 {{reference}} emebed";
    const joined = getChunksFromValue(source, references)
      .map((chunk) => (chunk.type === "text" ? chunk.value : chunk.reference))
      .join("");
    expect(joined).toBe(source);
  });

  it("should produce contiguous positions covering the whole value", () => {
    const source = "Example {{phrase}} with 2 {{nope}} emebed";
    const chunks = getChunksFromValue(source, references);

    expect(chunks[0].fromPosition).toBe(0);
    expect(chunks[chunks.length - 1].toPosition).toBe(source.length);

    chunks.forEach((chunk, index) => {
      expect(source.slice(chunk.fromPosition, chunk.toPosition)).toBe(
        chunk.type === "text" ? chunk.value : chunk.reference,
      );
      if (index > 0) {
        expect(chunk.fromPosition).toBe(chunks[index - 1].toPosition);
      }
    });
  });
});
