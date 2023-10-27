import { expect } from "chai";
import { dollarAmount } from "../src/utils";

describe("dollarAmount", () => {
  it("should convert cents to dollars with two decimal places", () => {
    expect(dollarAmount(100)).to.eql("1.00");
    expect(dollarAmount(500)).to.eql("5.00");
    expect(dollarAmount(1234)).to.eql("12.34");
  });

  it("should handle zero cents", () => {
    expect(dollarAmount(0)).to.eql("0.00");
  });

  it("should handle negative cents", () => {
    expect(dollarAmount(-100)).to.eql("-1.00");
    expect(dollarAmount(-500)).to.eql("-5.00");
    expect(dollarAmount(-1234)).to.eql("-12.34");
  });
});
