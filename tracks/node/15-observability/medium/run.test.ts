import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Normalizuj event-loop delay", () => {
  it("spełnia kontrakt zadania", async () => {
    expect(
      solve({ p50Ns: 1230000, p99Ns: 25000000, maxNs: 30100000 }, 20),
    ).toEqual({ p50Ms: 1.23, p99Ms: 25, maxMs: 30.1, degraded: true });
  });
});
