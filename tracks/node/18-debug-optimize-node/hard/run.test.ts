import { EventEmitter } from "node:events";
import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";

describe("[O] subskrypcje bez wycieku", () => {
  it("dostarcza zdarzenia subskrybentowi", () => {
    const emitter = new EventEmitter();
    const subscribe = solve(emitter);
    const listener = vi.fn();
    subscribe("c1", listener);
    emitter.emit("update", 42);
    expect(listener).toHaveBeenCalledWith(42);
  });

  it("[quality] re-subskrypcja klienta zastępuje starą, licznik nie rośnie", () => {
    const emitter = new EventEmitter();
    const subscribe = solve(emitter);
    const first = vi.fn();
    const second = vi.fn();
    subscribe("c1", first);
    subscribe("c1", second);
    emitter.emit("update", 1);
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
    expect(emitter.listenerCount("update")).toBe(1);
  });

  it("[quality] cleanup zdejmuje listener klienta", () => {
    const emitter = new EventEmitter();
    const subscribe = solve(emitter);
    const listener = vi.fn();
    const cleanup = subscribe("c1", listener);
    cleanup();
    emitter.emit("update");
    expect(listener).not.toHaveBeenCalled();
    expect(emitter.listenerCount("update")).toBe(0);
  });

  it("[quality] różni klienci nie nadpisują się nawzajem", () => {
    const emitter = new EventEmitter();
    const subscribe = solve(emitter);
    const alfa = vi.fn();
    const beta = vi.fn();
    subscribe("a", alfa);
    subscribe("b", beta);
    emitter.emit("update", 7);
    expect(alfa).toHaveBeenCalledWith(7);
    expect(beta).toHaveBeenCalledWith(7);
    expect(emitter.listenerCount("update")).toBe(2);
  });
});
