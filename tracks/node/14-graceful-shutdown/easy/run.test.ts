import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Zbuduj idempotentny shutdown", () => {
  it("spełnia kontrakt zadania", async () => {
    const cleanup = vi.fn(async () => undefined);
    const shutdown = solve([cleanup]);
    const first = shutdown();
    const second = shutdown();
    expect(second).toBe(first);
    await first;
    expect(cleanup).toHaveBeenCalledOnce();
  });
});
