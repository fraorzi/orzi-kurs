import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Zwróć idempotentny cleanup", () => {
  it("spełnia kontrakt zadania", async () => {
    const { EventEmitter } = await import("node:events");
    const emitter = new EventEmitter();
    const listener = vi.fn();
    const cleanup = solve(emitter, "data", listener);
    emitter.emit("data", 1);
    cleanup();
    cleanup();
    emitter.emit("data", 2);
    expect(listener).toHaveBeenCalledOnce();
    expect(emitter.listenerCount("data")).toBe(0);
  });
});
