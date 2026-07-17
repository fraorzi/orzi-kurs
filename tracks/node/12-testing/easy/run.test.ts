import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Wstrzyknij granicę czasu", () => {
  it("spełnia kontrakt zadania", async () => {
    let time = 0;
    const load = vi.fn(() => ({ id: load.mock.calls.length }));
    const get = solve(10, load, () => time);
    const beforeExpiry = get();
    expect(get()).toBe(beforeExpiry);
    time = 10;
    expect(get()).not.toBe(beforeExpiry);
    expect(load).toHaveBeenCalledTimes(2);
  });
});
