import { isNonNegativeIntegerString } from '../util';

describe("isNonNegativeIntegerString()", () => {

  it("returns true for zero", () => {
    expect(isNonNegativeIntegerString("0")).toBe(true);
  });

});