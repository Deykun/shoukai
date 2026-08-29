import { describe, expect, it } from "vitest";
import { chunksToString } from "./chunk-to-string";
import { stringToChunks } from "./string-to-chunk";

describe("stringToChunks", () => {
  it("should return empty array for empty string", () => {
    expect(stringToChunks("")).toEqual([]);
  });

  it("should return single input chunk for plain text", () => {
    expect(stringToChunks("a + 1")).toEqual([{ type: "input", value: "a + 1" }]);
  });

  it("should return single variable chunk for lone ref", () => {
    expect(stringToChunks("<reference>x</reference>")).toEqual([
      { type: "variable", reference: "x" },
    ]);
  });

  it("should split mixed text into input and variable chunks", () => {
    expect(stringToChunks("a + <reference>x.y</reference> * 2<reference>z</reference>")).toEqual([
      { type: "input", value: "a + " },
      { type: "variable", reference: "x.y" },
      { type: "input", value: " * 2" },
      { type: "variable", reference: "z" },
    ]);
  });

  it("should not emit empty input chunk between adjacent refs", () => {
    expect(stringToChunks("<reference>a</reference><reference>b</reference>")).toEqual([
      { type: "variable", reference: "a" },
      { type: "variable", reference: "b" },
    ]);
  });

  it("should keep trailing text after last ref", () => {
    expect(stringToChunks("<reference>a</reference> end")).toEqual([
      { type: "variable", reference: "a" },
      { type: "input", value: " end" },
    ]);
  });

  it("should treat unterminated ref as plain input", () => {
    expect(stringToChunks("a <reference>b")).toEqual([
      { type: "input", value: "a <reference>b" },
    ]);
  });

  it("should treat stray end tag as plain input", () => {
    expect(stringToChunks("a</reference> b")).toEqual([
      { type: "input", value: "a</reference> b" },
    ]);
  });

  it("should allow empty reference", () => {
    expect(stringToChunks("<reference></reference>")).toEqual([
      { type: "variable", reference: "" },
    ]);
  });

  it("should round-trip with chunksToString", () => {
    const source = "sum(<reference>a.b</reference>, <reference>c</reference>) / 2";
    expect(chunksToString(stringToChunks(source))).toBe(source);
  });
});
