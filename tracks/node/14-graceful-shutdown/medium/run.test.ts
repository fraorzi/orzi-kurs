import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Śledź aktywne żądania", () => {
  it("spełnia kontrakt zadania", async () => {
    const tracker = solve();
    const leave = tracker.enter();
    expect(tracker.active()).toBe(1);
    const draining = tracker.drain(new AbortController().signal);
    leave();
    leave();
    await expect(draining).resolves.toBeUndefined();
    expect(tracker.active()).toBe(0);
  });
});
