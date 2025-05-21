import { describe, expect, it } from "vitest";
import {
  getHasDigit,
  getHasNameStatus,
  getHasYear,
  getIsCapitalized,
  getIsDecimalStatus,
} from "./meta";

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

describe("getHasNameStatus", () => {
  it("should return 1 for full name", () => {
    expect(getHasNameStatus("John Oliver")).toBe(1);
  });

  it("should return 1 when the name is abbreviated", () => {
    expect(getHasNameStatus("George R. R. Martin")).toBe(1);
  });

  it("should return 1 when name is included in longer phrase", () => {
    expect(getHasNameStatus("John Oliver was born 1977")).toBe(1);
  });

  it("should return 0.5 when name is not capitalized but we have 2 words", () => {
    expect(getHasNameStatus("john oliver")).toBe(0.5);
  });

  it("should return 0 when name is not capitalized but have more than 2 words", () => {
    expect(getHasNameStatus("john oliver bank")).toBe(0);
  });

  it("should return 0 when has capitalization but spaced", () => {
    expect(getHasNameStatus("John but not Oliver")).toBe(0);
  });

  it("should return 0 for long capitalized sentence", () => {
    expect(getHasNameStatus("Super Important You Tube Title")).toBe(0);
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

describe("getHasDigit", () => {
  it("should return false for empty string", () => {
    expect(getHasDigit("")).toBe(false);
  });

  it("should return false for regular strings", () => {
    expect(getHasDigit("example")).toBe(false);
    expect(getHasDigit("example text")).toBe(false);
  });

  it("should return true for strings with numbers", () => {
    expect(getHasDigit("example 1")).toBe(true);
    expect(getHasDigit("2025")).toBe(true);
  });
});

describe("getIsDecimalStatus", () => {
  it("should return 0 for empty string", () => {
    expect(getIsDecimalStatus("")).toBe(0);
  });

  it("should return 0 for invalid string", () => {
    expect(getIsDecimalStatus("example text")).toBe(0);
  });

  it("should return 0 for string with number both not decimal", () => {
    expect(getIsDecimalStatus("example text with number 1")).toBe(0);
  });

  it("should return 1 for string with decimal", () => {
    expect(getIsDecimalStatus("example decimal 1.1")).toBe(1);
    expect(getIsDecimalStatus("example decimal 1,1")).toBe(1);
    expect(getIsDecimalStatus("12.34")).toBe(1);
    expect(getIsDecimalStatus("12,34")).toBe(1);
    expect(getIsDecimalStatus("1 000.00 USD")).toBe(1);
    expect(getIsDecimalStatus("1 000,00 USD")).toBe(1);
  });

  it("should return 0.5 for string with something looking like decimal", () => {
    expect(getIsDecimalStatus("example decimal 1.1.1")).toBe(0.5);
    expect(getIsDecimalStatus("v1.1")).toBe(0.5);
    expect(getIsDecimalStatus("version1,1")).toBe(0.5);
  });
});
