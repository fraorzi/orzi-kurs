import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";

describe("ograniczona kolejka wysyłki", () => {
  it("buforuje i opróżnia FIFO", () => {
    const queue = solve(1024);
    queue.enqueue("pierwsza");
    queue.enqueue("druga");
    const send = vi.fn();
    queue.flush(send);
    expect(send.mock.calls.map(([data]) => data)).toEqual([
      "pierwsza",
      "druga",
    ]);
    expect(queue.queuedBytes()).toBe(0);
  });

  it("liczy bajty, nie znaki, i egzekwuje limit", () => {
    const queue = solve(6);
    queue.enqueue("żąb");
    expect(queue.queuedBytes()).toBe(5);
    expect(() => queue.enqueue("xx")).toThrow();
    expect(queue.enqueue("x")).toBeUndefined();
  });

  it("flush zwalnia miejsce na kolejne wiadomości", () => {
    const queue = solve(10);
    queue.enqueue("0123456789");
    expect(() => queue.enqueue("x")).toThrow();
    queue.flush(vi.fn());
    queue.enqueue("znowu");
    expect(queue.queuedBytes()).toBe(5);
  });

  it("close czyści stan, blokuje enqueue i wyłącza flush", () => {
    const queue = solve(100);
    queue.enqueue("dane");
    queue.close();
    expect(queue.queuedBytes()).toBe(0);
    expect(() => queue.enqueue("po zamknięciu")).toThrow();
    const send = vi.fn();
    queue.flush(send);
    expect(send).not.toHaveBeenCalled();
  });
});
