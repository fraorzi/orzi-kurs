import { describe, it, expect } from "vitest";
import { throttle } from "./starter.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("throttle", () => {
  it("pierwsze wywołanie odpala fn natychmiast", () => {
    const log = [];
    const t = throttle((x) => log.push(x), 30);
    t(1);
    expect(log, "leading edge: pierwsze wywołanie ma przejść od razu (start last = 0)").toEqual([1]);
  });

  it("wywołania w oknie interwału są ignorowane", () => {
    const log = [];
    const t = throttle((x) => log.push(x), 30);
    t(1);
    t(2);
    t(3);
    expect(
      log,
      "między wywołaniami minęło <30 ms, więc tylko pierwsze przechodzi — porównuj Date.now() z last",
    ).toEqual([1]);
  });

  it("po upływie interwału kolejne wywołanie przechodzi", async () => {
    const log = [];
    const t = throttle((x) => log.push(x), 30);
    t(1);
    await sleep(50);
    t(2);
    expect(log, "po interwale now - last >= interval, więc wywołanie odpala i aktualizuje last").toEqual([
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
