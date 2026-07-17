import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Czekaj na zdarzenie z AbortSignal", () => {
  it("spełnia kontrakt zadania", async () => {
    const { EventEmitter } = await import("node:events");
    const emitter = new EventEmitter();
    const controller = new AbortController();
    const pending = solve<number>(emitter, "ready", controller.signal);
    emitter.emit("ready", 42);
    await expect(pending).resolves.toBe(42);
    expect(emitter.listenerCount("ready")).toBe(0);
  });
});
