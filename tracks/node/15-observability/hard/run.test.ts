import { subscribe, unsubscribe } from "node:diagnostics_channel";
import { afterEach, describe, expect, it, vi } from "vitest";
import { solve } from "./starter";

const listeners: Array<[string, (message: unknown) => void]> = [];

function listen(name: string): unknown[] {
  const received: unknown[] = [];
  const listener = (message: unknown) => void received.push(message);
  subscribe(name, listener);
  listeners.push([name, listener]);
  return received;
}

afterEach(() => {
  for (const [name, listener] of listeners.splice(0)) unsubscribe(name, listener);
});

describe("leniwa telemetria", () => {
  it("bez subskrybentów nie liczy payloadu i zwraca false", () => {
    const publish = solve("orzi.test.idle");
    const createMessage = vi.fn(() => ({ heavy: true }));
    expect(publish(createMessage)).toBe(false);
    expect(createMessage).not.toHaveBeenCalled();
  });

  it("z subskrybentem publikuje payload i zwraca true", () => {
    const received = listen("orzi.test.active");
    const publish = solve("orzi.test.active");
    expect(publish(() => ({ jobId: 42 }))).toBe(true);
    expect(received).toEqual([{ jobId: 42 }]);
  });

  it("payload liczony jest dokładnie raz na publikację", () => {
    listen("orzi.test.count");
    const publish = solve("orzi.test.count");
    const createMessage = vi.fn(() => "msg");
    publish(createMessage);
    publish(createMessage);
    expect(createMessage).toHaveBeenCalledTimes(2);
  });

  it("po odpięciu subskrybenta publikacja znów jest darmowa", () => {
    const name = "orzi.test.detach";
    const listener = (message: unknown) => void message;
    subscribe(name, listener);
    const publish = solve(name);
    expect(publish(() => "a")).toBe(true);
    unsubscribe(name, listener);
    const createMessage = vi.fn(() => "b");
    expect(publish(createMessage)).toBe(false);
    expect(createMessage).not.toHaveBeenCalled();
  });
});
