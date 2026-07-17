import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Zbuduj bezpieczny kanał zdarzeń", () => {
  it("spełnia kontrakt zadania", async () => {
    const report = vi.fn();
    const emitter = solve(report);
    expect(() => emitter.emit("error", new Error("boom"))).not.toThrow();
    expect(report).toHaveBeenCalledWith("boom");
  });
});
