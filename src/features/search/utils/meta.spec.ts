import { describe, expect, it } from "vitest";
import { getHasName, getHasYear, getIsCapitalized } from "./meta";

describe("getIsCapitalized", () => {
  it("should return false lower cased text", () => {
    expect(getIsCapitalized("test")).toBe(false);
  });

  it("should return true for capitalized text", () => {
    expect(getIsCapitalized("John")).toBe(true);
  });

  it("should return false if other letters are capitalized in the word", () => {
    expect(getIsCapitalized("JoHn")).toBe(false);
  });
});

describe("getHasName", () => {
  it("should return true for full name", () => {
    expect(getHasName("John Oliver")).toBe(true);
  });

  it("should return true when the name is abbreviated", () => {
    expect(getHasName("George R. R. Martin")).toBe(true);
  });

  it("should return true when name is included in longer phrase", () => {
    expect(getHasName("John Oliver was born 1977")).toBe(true);
  });

  it("should return false when name is not capitalized", () => {
    expect(getHasName("john oliver")).toBe(false);
  });

  it("should return false when has capitalization but spaced", () => {
    expect(getHasName("John but not Oliver")).toBe(false);
  });

  it("should return false for long capitalized sentence", () => {
    expect(getHasName("Super Important You Tube Title")).toBe(false);
  });
});

describe("getHasYear", () => {
  it("should return false for a string", () => {
    expect(getHasYear("example")).toBe(false);
  });

  it("should return false for a number that is too short", () => {
    expect(getHasYear("123")).toBe(false);
  });

  it("should return false for a number that is too long", () => {
    expect(getHasYear("12345")).toBe(false);
  });

  it("should return true for a number that 4 digits long", () => {
    expect(getHasYear("1234")).toBe(true);
  });

  it("should return true for a year in date", () => {
    expect(getHasYear("10.10.2010")).toBe(true);
    expect(getHasYear("30.12.2010")).toBe(true);
  });

  it("should return true and ignore () if year is wrapped", () => {
    expect(getHasYear("(1234)")).toBe(true);
  });

  it("should return true for date ranges", () => {
    expect(getHasYear("1990-1999")).toBe(true);
    expect(getHasYear("1990 - 1999")).toBe(true);
    expect(getHasYear("(1990-1999)")).toBe(true);
  });
});
