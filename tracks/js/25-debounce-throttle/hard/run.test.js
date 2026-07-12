import { describe, it, expect } from "vitest";
import { debounce } from "./starter.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("debounce — trailing (domyślnie)", () => {
  it("odpala raz po ciszy z ostatnim argumentem", async () => {
    const log = [];
    const d = debounce((x) => log.push(x), 30);
    d(1);
    d(2);
    d(3);
    await sleep(70);
    expect(log).toEqual([3]);
  });
});

describe("debounce — cancel", () => {
  it("cancel anuluje oczekujące wywołanie trailing", async () => {
    const log = [];
    const d = debounce((x) => log.push(x), 30);
    d(1);
    d.cancel();
    await sleep(70);
    expect(
      log,
      "po cancel zaplanowany timer ma być wyczyszczony — fn nie może się odpalić",
    ).toEqual([]);
  });
});

describe("debounce — leading", () => {
  it("odpala na starcie serii i tłumi kolejne w oknie", () => {
    const log = [];
    const d = debounce((x) => log.push(x), 30, { leading: true });
    d(1);
    d(2);
    d(3);
    expect(log, "leading: pierwsze wywołanie odpala od razu, reszta serii jest tłumiona").toEqual([
      1,
    ]);
  });

  it("nie dubluje wywołaniem trailing po ciszy", async () => {
    const log = [];
    const d = debounce((x) => log.push(x), 30, { leading: true });
    d(1);
    await sleep(70);
    expect(log, "w trybie leading nie ma dodatkowego wywołania trailing na końcu ciszy").toEqual([
      1,
    ]);
  });

  it("po ciszy nowa seria znów odpala na starcie", async () => {
    const log = [];
    const d = debounce((x) => log.push(x), 30, { leading: true });
    d(1);
    await sleep(70);
    d(2);
    expect(log, "po ciszy timer wraca do null, więc kolejne wywołanie znów jest 'na starcie'").toEqual([
      1, 2,
    ]);
  });
});
