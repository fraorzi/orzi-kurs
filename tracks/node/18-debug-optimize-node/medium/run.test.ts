import { describe, expect, it } from "vitest";
import { solve } from "./starter";

function tracked() {
  let active = 0;
  let peak = 0;
  return {
    peak: () => peak,
    run: async (value: number) => {
      active++;
      peak = Math.max(peak, active);
      await Promise.resolve();
      await Promise.resolve();
      active--;
      return value * 2;
    },
  };
}

describe("[O] bounded concurrency", () => {
  it("zachowuje kolejność wyników", async () => {
    const { run } = tracked();
    await expect(solve([1, 2, 3, 4, 5], 2, run)).resolves.toEqual([
      2, 4, 6, 8, 10,
    ]);
  });

  it("odrzuca limit mniejszy niż 1", async () => {
    await expect(solve([1], 0, async (x) => x)).rejects.toThrow();
  });

  it("[quality] szczyt in-flight nie przekracza limitu", async () => {
    const monitor = tracked();
    await solve(Array.from({ length: 20 }, (_, i) => i), 3, monitor.run);
    expect(monitor.peak()).toBeLessThanOrEqual(3);
  });

  it("[quality] limit 1 serializuje pracę całkowicie", async () => {
    const monitor = tracked();
    await solve([1, 2, 3, 4], 1, monitor.run);
    expect(monitor.peak()).toBe(1);
  });

  it("[quality] praca jest realnie równoległa w ramach limitu", async () => {
    const monitor = tracked();
    await solve([1, 2, 3, 4, 5, 6], 3, monitor.run);
    expect(monitor.peak()).toBeGreaterThan(1);
  });
});
