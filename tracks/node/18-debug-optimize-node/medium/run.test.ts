import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("[O] Ogranicz współbieżność", () => {
  it("[quality] spełnia kontrakt i bramkę wydajności", async () => {
    let active = 0;
    let peak = 0;
    const result = await solve([1, 2, 3, 4], 2, async (value) => {
      active++;
      peak = Math.max(peak, active);
      await Promise.resolve();
      active--;
      return value * 2;
    });
    expect(result).toEqual([2, 4, 6, 8]);
    expect(peak).toBeLessThanOrEqual(2);
  });
});
