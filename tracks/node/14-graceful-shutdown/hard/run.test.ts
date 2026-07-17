import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Wymuś deadline zamykania", () => {
  it("spełnia kontrakt zadania", async () => {
    const force = vi.fn();
    await expect(solve(Promise.resolve(), 50, force)).resolves.toBe("clean");
    expect(force).not.toHaveBeenCalled();
    let release: () => void = () => undefined;
    const pending = new Promise<void>((resolve) => {
      release = resolve;
    });
    await expect(solve(pending, 5, force)).resolves.toBe("forced");
    expect(force).toHaveBeenCalledOnce();
    release();
  });
});
