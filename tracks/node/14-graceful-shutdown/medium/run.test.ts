import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("tracker aktywnych żądań", () => {
  it("liczy wejścia i wyjścia", () => {
    const tracker = solve();
    const leaveA = tracker.enter();
    const leaveB = tracker.enter();
    expect(tracker.active()).toBe(2);
    leaveA();
    expect(tracker.active()).toBe(1);
    leaveB();
    expect(tracker.active()).toBe(0);
  });

  it("leave jest idempotentne", () => {
    const tracker = solve();
    const leave = tracker.enter();
    tracker.enter();
    leave();
    leave();
    leave();
    expect(tracker.active()).toBe(1);
  });

  it("drain czeka na zejście licznika do zera", async () => {
    const tracker = solve();
    const leave = tracker.enter();
    let drained = false;
    const pending = tracker
      .drain(new AbortController().signal)
      .then(() => (drained = true));
    await Promise.resolve();
    expect(drained).toBe(false);
    leave();
    await pending;
    expect(drained).toBe(true);
  });

  it("drain przy zerze rozwiązuje się natychmiast", async () => {
    const tracker = solve();
    await expect(
      tracker.drain(new AbortController().signal),
    ).resolves.toBeUndefined();
  });

  it("abort odrzuca czekanie z powodem sygnału", async () => {
    const tracker = solve();
    tracker.enter();
    const controller = new AbortController();
    const pending = tracker.drain(controller.signal);
    controller.abort(new Error("deadline shutdownu"));
    await expect(pending).rejects.toThrow("deadline shutdownu");
  });
});
