import { describe, it, expect } from "vitest";
import { throttle } from "./starter.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("throttle leading + trailing (domyślne)", () => {
  it("odpala od razu (leading) i na koniec okna z ostatnimi argumentami (trailing)", async () => {
    const log = [];
    const t = throttle((x) => log.push(x), 40);
    t(1);
    t(2);
    t(3);
    expect(log, "leading odpala natychmiast na 1. wywołaniu").toEqual([1]);
    await sleep(70);
    expect(log, "trailing dokłada ostatnie wywołanie okna (3)").toEqual([1, 3]);
  });
});

describe("throttle leading:false", () => {
  it("nie odpala natychmiast, tylko na koniec okna", async () => {
    const log = [];
    const t = throttle((x) => log.push(x), 40, { leading: false, trailing: true });
    t(1);
    t(2);
    t(3);
    expect(log, "leading:false tłumi natychmiastowe wywołanie").toEqual([]);
    await sleep(70);
    expect(log, "trailing odpala ostatnie (3) na koniec okna").toEqual([3]);
  });
});

describe("throttle trailing:false", () => {
  it("odpala tylko natychmiast, bez końcowego", async () => {
    const log = [];
    const t = throttle((x) => log.push(x), 40, { leading: true, trailing: false });
    t(1);
    t(2);
    t(3);
    expect(log).toEqual([1]);
    await sleep(70);
    expect(log, "trailing:false → brak odpalenia na koniec okna").toEqual([1]);
  });
});

describe("throttle — wywołania rozstawione poza oknem", () => {
  it("każde wywołanie po pełnym oknie odpala od razu", async () => {
    const log = [];
    const t = throttle((x) => log.push(x), 30);
    t(1);
    await sleep(50);
    t(2);
    await sleep(50);
    expect(log, "gdy między wywołaniami minęło > wait, każde jest 'leading' swojego okna").toEqual([
      1, 2,
    ]);
  });

  it("przekazuje argumenty do fn", () => {
    let sum;
    const t = throttle((a, b) => {
      sum = a + b;
    }, 30);
    t(2, 5);
    expect(sum).toBe(7);
  });
});
