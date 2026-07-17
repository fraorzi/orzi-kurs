import { describe, expect, it } from "vitest";
import { runCli } from "./starter";

describe("CLI pool + retry", () => {
  it("ogranicza współbieżność, retry i zachowuje kolejność", async () => {
    let active = 0; let peak = 0; const attempts = new Map<number, number>();
    const result = await runCli([1, 2, 3, 4], 2, async (value) => { active += 1; peak = Math.max(peak, active); attempts.set(value, (attempts.get(value) ?? 0) + 1); await Promise.resolve(); active -= 1; if (value === 2 && attempts.get(value) === 1) throw Object.assign(new Error("retry"), { transient: true }); return value * 2; });
    expect(result).toEqual([2, 4, 6, 8]); expect(peak).toBeLessThanOrEqual(2); expect(attempts.get(2)).toBe(2);
  });
});

