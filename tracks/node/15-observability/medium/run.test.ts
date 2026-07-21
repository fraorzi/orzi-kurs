import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("normalizacja event-loop delay", () => {
  it("konwertuje nanosekundy na milisekundy z dwoma miejscami", () => {
    expect(
      solve({ p50Ns: 12_345_678, p99Ns: 98_765_432, maxNs: 123_456_789 }, 200),
    ).toEqual({ p50Ms: 12.35, p99Ms: 98.77, maxMs: 123.46, degraded: false });
  });

  it("wyznacza degraded, gdy p99 przekracza budżet", () => {
    const result = solve(
      { p50Ns: 1_000_000, p99Ns: 250_000_000, maxNs: 300_000_000 },
      200,
    );
    expect(result.p99Ms).toBe(250);
    expect(result.degraded).toBe(true);
  });

  it("równość z budżetem to jeszcze zdrowy stan", () => {
    expect(
      solve({ p50Ns: 0, p99Ns: 200_000_000, maxNs: 0 }, 200).degraded,
    ).toBe(false);
  });

  it("małe opóźnienia nie znikają w zaokrągleniu do zera całkowitego", () => {
    expect(solve({ p50Ns: 40_000, p99Ns: 90_000, maxNs: 90_000 }, 10)).toEqual({
      p50Ms: 0.04,
      p99Ms: 0.09,
      maxMs: 0.09,
      degraded: false,
    });
  });
});
