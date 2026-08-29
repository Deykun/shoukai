import { describe, expect, it } from "vitest";
import { chunkToString, chunksToString } from "./chunk-to-string";

describe("chunkToString", () => {
  it("should return input value as is", () => {
    expect(chunkToString({ type: "input", value: "a + 1" })).toBe("a + 1");
  });

  it("should return empty string for empty input", () => {
    expect(chunkToString({ type: "input", value: "" })).toBe("");
  });

  it("should wrap variable reference in ref tags", () => {
    expect(chunkToString({ type: "variable", reference: "x.y" })).toBe(
      "<reference>x.y</reference>",
    );
  });
});

describe("chunksToString", () => {
  it("should return empty string for no chunks", () => {
    expect(chunksToString([])).toBe("");
  });

  it("should join mixed chunks in order", () => {
    expect(
      chunksToString([
        { type: "input", value: "a + " },
        { type: "variable", reference: "x" },
        { type: "input", value: " * 2" },
        { type: "variable", reference: "y.z" },
      ]),
    ).toBe("a + <reference>x</reference> * 2<reference>y.z</reference>");
  });

  it("should join adjacent variables without separator", () => {
    expect(
      chunksToString([
        { type: "variable", reference: "a" },
        { type: "variable", reference: "b" },
      ]),
    ).toBe("<reference>a</reference><reference>b</reference>");
  });
});
