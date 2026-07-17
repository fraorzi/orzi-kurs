import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("[O] Usuń leak listenerów", () => {
  it("[quality] spełnia kontrakt i bramkę wydajności", async () => {
    const { EventEmitter } = await import("node:events");
    const emitter = new EventEmitter();
    const subscribe = solve(emitter);
    const first = vi.fn();
    const second = vi.fn();
    subscribe("c1", first);
    const cleanup = subscribe("c1", second);
    emitter.emit("update", 1);
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledOnce();
    expect(emitter.listenerCount("update")).toBe(1);
    cleanup();
    expect(emitter.listenerCount("update")).toBe(0);
  });
});
