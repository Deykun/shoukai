import { describe, expect, it } from "vitest";
import { getChunksFromValue } from "./chunks";

describe("getChunksFromValue", () => {
  it("should return single empty text chunk for empty string", () => {
    expect(getChunksFromValue("")).toEqual([{ type: "text", value: "" }]);
  });

  it("should return single text chunk for plain text", () => {
    expect(getChunksFromValue("plain text")).toEqual([{ type: "text", value: "plain text" }]);
  });

  it("should return single reference chunk for lone ref", () => {
    expect(getChunksFromValue("{{phrase}}")).toEqual([
      { type: "reference", reference: "{{phrase}}" },
    ]);
  });

  it("should split mixed text into untrimmed text and reference chunks", () => {
    expect(getChunksFromValue("Example {{phrase}} with 2 {{reference}} emebed")).toEqual([
      { type: "text", value: "Example " },
      { type: "reference", reference: "{{phrase}}" },
      { type: "text", value: " with 2 " },
      { type: "reference", reference: "{{reference}}" },
      { type: "text", value: " emebed" },
    ]);
  });

  it("should keep leading and trailing whitespace in text chunks", () => {
    expect(getChunksFromValue("  a {{b}}  ")).toEqual([
      { type: "text", value: "  a " },
      { type: "reference", reference: "{{b}}" },
      { type: "text", value: "  " },
    ]);
  });

  it("should not emit empty text chunk between adjacent refs", () => {
    expect(getChunksFromValue("{{a}}{{b}}")).toEqual([
      { type: "reference", reference: "{{a}}" },
      { type: "reference", reference: "{{b}}" },
    ]);
  });

  it("should keep whitespace-only text between refs", () => {
    expect(getChunksFromValue("{{a}} {{b}}")).toEqual([
      { type: "reference", reference: "{{a}}" },
      { type: "text", value: " " },
      { type: "reference", reference: "{{b}}" },
    ]);
  });

  it("should treat ref with spaces as plain text", () => {
    expect(getChunksFromValue("{{ a.b }}")).toEqual([{ type: "text", value: "{{ a.b }}" }]);
  });

  it("should treat ref spanning lines as plain text", () => {
    expect(getChunksFromValue("{{a\nb}}")).toEqual([{ type: "text", value: "{{a\nb}}" }]);
  });

  it("should skip invalid ref start and find later valid ref", () => {
    expect(getChunksFromValue("{{ a {{b}} c")).toEqual([
      { type: "text", value: "{{ a " },
      { type: "reference", reference: "{{b}}" },
      { type: "text", value: " c" },
    ]);
  });

  it("should allow empty reference", () => {
    expect(getChunksFromValue("{{}}")).toEqual([{ type: "reference", reference: "{{}}" }]);
  });

  it("should treat unterminated ref as plain text", () => {
    expect(getChunksFromValue("a {{b")).toEqual([{ type: "text", value: "a {{b" }]);
  });

  it("should treat stray end marker as plain text", () => {
    expect(getChunksFromValue("a}} b")).toEqual([{ type: "text", value: "a}} b" }]);
  });

  it("should treat text before unterminated ref as one text chunk", () => {
    expect(getChunksFromValue("{{a}} b {{c")).toEqual([
      { type: "reference", reference: "{{a}}" },
      { type: "text", value: " b {{c" },
    ]);
  });

  it("should close ref at first end marker", () => {
    expect(getChunksFromValue("{{a}}}}")).toEqual([
      { type: "reference", reference: "{{a}}" },
      { type: "text", value: "}}" },
    ]);
  });

  it("should round-trip by joining chunks", () => {
    const source = "Example {{phrase}} with 2 {{reference}} emebed";
    const joined = getChunksFromValue(source)
      .map((chunk) => (chunk.type === "text" ? chunk.value : chunk.reference))
      .join("");
    expect(joined).toBe(source);
  });
});
