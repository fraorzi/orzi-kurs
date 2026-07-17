import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Ogranicz starvation", () => {
  it("spełnia kontrakt zadania", async () => {
    await expect(solve(10, 3)).resolves.toEqual({ completed: 10, yields: 3 });
    await expect(solve(0, 3)).resolves.toEqual({ completed: 0, yields: 0 });
  });
});
