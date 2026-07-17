import { EventEmitter } from "node:events";
import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";

describe("idempotentny cleanup subskrypcji", () => {
  it("podpina listener, który dostaje emisje z argumentami", () => {
    const bus = new EventEmitter();
    const listener = vi.fn();
    solve(bus, "job", listener);
    bus.emit("job", 42);
    expect(listener).toHaveBeenCalledWith(42);
  });

  it("cleanup zdejmuje listener", () => {
    const bus = new EventEmitter();
    const listener = vi.fn();
    const off = solve(bus, "job", listener);
    off();
    bus.emit("job");
    expect(listener).not.toHaveBeenCalled();
    expect(bus.listenerCount("job")).toBe(0);
  });

  it("podwójny cleanup nie zdejmuje cudzej subskrypcji tego samego listenera", () => {
    const bus = new EventEmitter();
    const listener = vi.fn();
    const off = solve(bus, "job", listener);
    off();
    solve(bus, "job", listener);
    off();
    bus.emit("job");
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("cleanup nie dotyka innych listenerów zdarzenia", () => {
    const bus = new EventEmitter();
    const other = vi.fn();
    bus.on("job", other);
    const off = solve(bus, "job", vi.fn());
    off();
    bus.emit("job");
    expect(other).toHaveBeenCalledTimes(1);
  });
});
