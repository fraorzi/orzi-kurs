import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Publikuj przez diagnostics_channel", () => {
  it("spełnia kontrakt zadania", async () => {
    const { channel } = await import("node:diagnostics_channel");
    const name = `orzi.test.${Math.random()}`;
    const publish = solve<{
      id: number;
    }>(name);
    const create = vi.fn(() => ({ id: 1 }));
    expect(publish(create)).toBe(false);
    const received: unknown[] = [];
    const listener = (message: unknown) => received.push(message);
    channel(name).subscribe(listener);
    try {
      expect(publish(create)).toBe(true);
      expect(received).toEqual([{ id: 1 }]);
    } finally {
      channel(name).unsubscribe(listener);
    }
  });
});
