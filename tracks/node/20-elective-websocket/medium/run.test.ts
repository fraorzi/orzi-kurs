import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("full jitter backoff", () => {
  it("mnoży jitter przez wykładniczy sufit", () => {
    expect(solve(0, 100, 5000, () => 0.5)).toBe(50);
    expect(solve(2, 100, 5000, () => 0.5)).toBe(200);
    expect(solve(3, 100, 5000, () => 0.25)).toBe(200);
  });

  it("cap ogranicza wzrost wykładniczy", () => {
    expect(solve(10, 100, 5000, () => 0.5)).toBe(2500);
    expect(solve(30, 100, 5000, () => 0.999)).toBeLessThan(5000);
  });

  it("pełny jitter dopuszcza wartości bliskie zeru", () => {
    expect(solve(5, 100, 5000, () => 0)).toBe(0);
  });

  it("waliduje konfigurację", () => {
    expect(() => solve(-1, 100, 1000, () => 0.5)).toThrow();
    expect(() => solve(1.5, 100, 1000, () => 0.5)).toThrow();
    expect(() => solve(1, 0, 1000, () => 0.5)).toThrow();
    expect(() => solve(1, 100, 50, () => 0.5)).toThrow();
  });

  it("odrzuca RNG poza kontraktem [0, 1)", () => {
    expect(() => solve(1, 100, 1000, () => 1)).toThrow();
    expect(() => solve(1, 100, 1000, () => -0.1)).toThrow();
  });
});
