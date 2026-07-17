import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Wybierz uczciwe yield", () => {
  it("spełnia kontrakt zadania", async () => {
    await expect(solve([1, 2, 3], 2, (x) => x * 2)).resolves.toEqual([2, 4, 6]);
    await expect(solve([1], 0, String)).rejects.toThrow(/batchSize/);
  });
});
