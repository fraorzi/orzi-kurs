import { describe, it, expect } from "vitest";
import { bigFactorial, bigPow } from "./starter.js";

describe("bigFactorial", () => {
  it("liczy silnię małych liczb jako BigInt", () => {
    expect(bigFactorial(5)).toBe(120n);
  });

  it("dla 0 zwraca 1n", () => {
    expect(bigFactorial(0)).toBe(1n);
  });

  it("jest dokładne dla dużego n (gdzie number traci precyzję)", () => {
    expect(
      bigFactorial(25),
      "25! ma 26 cyfr — number nie utrzymałby dokładności, BigInt tak",
    ).toBe(15511210043330985984000000n);
  });

  it("zwraca wartość typu bigint", () => {
    expect(typeof bigFactorial(5)).toBe("bigint");
  });
});

describe("bigPow", () => {
  it("liczy potęgę jako BigInt", () => {
    expect(bigPow(2, 10)).toBe(1024n);
  });

  it("jest dokładne dla 2^64 (poza zakresem bezpiecznych liczb)", () => {
    expect(bigPow(2, 64)).toBe(18446744073709551616n);
  });
});
