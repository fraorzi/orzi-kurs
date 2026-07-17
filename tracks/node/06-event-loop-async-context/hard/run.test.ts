import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Izoluj request ID", () => {
  it("spełnia kontrakt zadania", async () => {
    const context = solve();
    expect(context.run("req-1", () => context.current())).toBe("req-1");
    expect(() => context.current()).toThrow(/kontekstu/);
    const values = await Promise.all([
      context.run("a", async () => {
        await Promise.resolve();
        return context.current();
      }),
      context.run("b", async () => context.current()),
    ]);
    expect(values).toEqual(["a", "b"]);
  });
});
