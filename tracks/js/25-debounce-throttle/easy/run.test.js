import { describe, it, expect } from "vitest";
import { debounce } from "./starter.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("debounce", () => {
  it("nie odpala fn synchronicznie", () => {
    const log = [];
    const d = debounce((x) => log.push(x), 30);
    d(1);
    expect(log, "debounce ma ODROCZYĆ wywołanie przez setTimeout, nie wołać od razu").toEqual([]);
  });

  it("seria szybkich wywołań daje jedno wywołanie z ostatnim argumentem", async () => {
    const log = [];
    const d = debounce((x) => log.push(x), 30);
    d(1);
    d(2);
    d(3);
    await sleep(70);
    expect(
      log,
      "każde wywołanie ma resetować timer (clearTimeout), więc odpala tylko ostatnie po ciszy",
    ).toEqual([3]);
  });

  it("wywołania rozdzielone ciszą odpalają osobno", async () => {
    const log = [];
    const d = debounce((x) => log.push(x), 30);
    d("a");
    await sleep(70);
    d("b");
    await sleep(70);
    expect(log).toEqual(["a", "b"]);
  });
});
