import { isNonNegativeIntegerString } from '../util';

describe("isNonNegativeIntegerString()", () => {

  it("works for zero", () => {
    expect(isNonNegativeIntegerString("0")).toBe(true);
  });

  it("works for double zero", () => {
    expect(isNonNegativeIntegerString("00")).toBe(false);
  });

  const validNumber = "1";
  it("works for validNumber", () => {
    expect(isNonNegativeIntegerString(validNumber)).toBe(true);
  });

  it("works for minus zero", () => {
    expect(isNonNegativeIntegerString("-0")).toBe(false);
  });

  it("works for minus one", () => {
    expect(isNonNegativeIntegerString("-1")).toBe(false);
  });

  it("works for empty string", () => {
    expect(isNonNegativeIntegerString("")).toBe(false);
  });

  it("works for newline", () => {
    expect(isNonNegativeIntegerString("\n")).toBe(false);
  });

  it("works for number followed by newline", () => {
    expect(isNonNegativeIntegerString(`${validNumber}\n`)).toBe(false);
  });

});