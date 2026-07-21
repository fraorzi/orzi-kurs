import { EventEmitter } from "node:events";
import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("oczekiwanie na zdarzenie z anulowaniem", () => {
  it("zwraca pierwszy argument pierwszej emisji", async () => {
    const bus = new EventEmitter();
    const pending = solve<string>(bus, "ready", new AbortController().signal);
    bus.emit("ready", "ok", "ignorowane");
    await expect(pending).resolves.toBe("ok");
  });

  it("abort odrzuca oczekiwanie", async () => {
    const bus = new EventEmitter();
    const controller = new AbortController();
    const pending = solve(bus, "ready", controller.signal);
    controller.abort();
    await expect(pending).rejects.toThrow();
  });

  it("po abortcie listener znika z emittera", async () => {
    const bus = new EventEmitter();
    const controller = new AbortController();
    const pending = solve(bus, "ready", controller.signal);
    expect(bus.listenerCount("ready")).toBeGreaterThan(0);
    controller.abort();
    await pending.catch(() => undefined);
    expect(bus.listenerCount("ready")).toBe(0);
  });

  it("sygnał przerwany z góry odrzuca natychmiast", async () => {
    const bus = new EventEmitter();
    await expect(solve(bus, "ready", AbortSignal.abort())).rejects.toThrow();
    expect(bus.listenerCount("ready")).toBe(0);
  });
});
