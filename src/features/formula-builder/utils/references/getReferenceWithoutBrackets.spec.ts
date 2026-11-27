import { describe, expect, it } from "vitest";
import { getReferenceWithoutBrackets } from "./getReferenceWithoutBrackets";

describe("getReferenceWithoutBrackets", () => {
  it("should strip brackets from simple reference", () => {
    expect(getReferenceWithoutBrackets("{{name}}")).toBe("name");
  });

  it("should keep inner content with dots and dashes", () => {
    expect(getReferenceWithoutBrackets("{{node-1.output.value}}")).toBe(
      "node-1.output.value",
    );
  });

  it("should keep inner whitespace", () => {
    expect(getReferenceWithoutBrackets("{{ name }}")).toBe(" name ");
  });

  it("should return empty string for empty reference", () => {
    expect(getReferenceWithoutBrackets("{{}}")).toBe("");
  });

  it("should strip only outer brackets", () => {
    expect(getReferenceWithoutBrackets("{{{{nested}}}}")).toBe("{{nested}}");
  });
});
