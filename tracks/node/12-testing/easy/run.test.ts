import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";

describe("cache TTL ze wstrzykniętym zegarem", () => {
  it("liczy wartość raz i serwuje z cache w oknie TTL", () => {
    let time = 0;
    const load = vi.fn(() => "wynik");
    const get = solve(100, load, () => time);
    expect(get()).toBe("wynik");
    time = 99;
    expect(get()).toBe("wynik");
    expect(load).toHaveBeenCalledTimes(1);
  });

  it("przeładowuje dokładnie na granicy TTL (równość włącznie)", () => {
    let time = 0;
    let version = 0;
    const load = vi.fn(() => `v${version++}`);
    const get = solve(100, load, () => time);
    expect(get()).toBe("v0");
    time = 100;
    expect(get()).toBe("v1");
    expect(load).toHaveBeenCalledTimes(2);
  });

  it("nowy termin liczy się od momentu przeładowania", () => {
    let time = 0;
    const load = vi.fn(() => time);
    const get = solve(50, load, () => time);
    get();
    time = 60;
    expect(get()).toBe(60);
    time = 109;
    expect(get()).toBe(60);
    time = 110;
    expect(get()).toBe(110);
  });

  it("czas płynie wyłącznie przez wstrzyknięty zegar", () => {
    const now = vi.fn(() => 0);
    const get = solve(10, () => "x", now);
    get();
    get();
    expect(now).toHaveBeenCalled();
  });
});
