import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";

describe("Policz backoff reconnectu", () => {
  it("spełnia kontrakt elective", async () => {
    expect(solve(0, 100, 5000, () => 0.5)).toBe(50);
    expect(solve(10, 100, 5000, () => 0.5)).toBe(2500);
    expect(() => solve(-1, 100, 1000, () => 0)).toThrow(/konfiguracja/);
  });
});
