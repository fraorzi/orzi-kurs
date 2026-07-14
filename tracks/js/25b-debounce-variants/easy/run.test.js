import { describe, it, expect } from "vitest";
import { debounce } from "./starter.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("debounce trailing (domyślne)", () => {
  it("nie odpala w trakcie serii, tylko raz po ciszy — z ostatnimi argumentami", async () => {
    const log = [];
    const d = debounce((x) => log.push(x), 40);
    d(1);
    d(2);
    d(3);
    expect(log, "w trakcie serii nic się nie odpala (trailing czeka na ciszę)").toEqual([]);
    await sleep(70);
    expect(log, "po wait odpala raz z argumentami ostatniego wywołania (3)").toEqual([3]);
  });
});

describe("debounce leading:true, trailing:false", () => {
  it("odpala natychmiast na pierwszym wywołaniu, resztę tłumi", async () => {
    const log = [];
    const d = debounce((x) => log.push(x), 40, { leading: true, trailing: false });
    d(1);
    d(2);
    d(3);
    expect(log, "leading odpala od razu na 1. wywołaniu serii").toEqual([1]);
    await sleep(70);
    expect(log, "trailing:false → po serii nic więcej").toEqual([1]);
  });
});

describe("debounce leading:true, trailing:true", () => {
  it("dla serii >1 wywołania odpala i na starcie, i na końcu", async () => {
    const log = [];
    const d = debounce((x) => log.push(x), 40, { leading: true, trailing: true });
    d(1);
    d(2);
    d(3);
    expect(log, "leading od razu (1)").toEqual([1]);
    await sleep(70);
    expect(log, "trailing dokłada ostatnie wywołanie (3), bo seria miała >1 wywołanie").toEqual([1, 3]);
  });

  it("dla pojedynczego wywołania odpala tylko raz (bez podwójnego strzału)", async () => {
    const log = [];
    const d = debounce((x) => log.push(x), 40, { leading: true, trailing: true });
    d(1);
    await sleep(70);
    expect(
      log,
      "pojedyncze wywołanie z leading+trailing nie może odpalić dwa razy — trailing pomija je po leadingu",
    ).toEqual([1]);
  });
});
