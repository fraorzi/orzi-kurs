import { describe, it, expect } from "vitest";
import { delay, promisify } from "./starter.js";

describe("delay", () => {
  it("zwraca Promise", () => {
    expect(delay(1), "delay ma zwracać Promise — użyj new Promise z setTimeout w executorze").toBeInstanceOf(Promise);
  });

  it("rozwiązuje się dopiero po zadanym czasie", async () => {
    const start = performance.now();
    await delay(50);
    const elapsed = performance.now() - start;
    expect(elapsed, "promise rozwiązał się za wcześnie — resolve ma być wywołane w setTimeout(ms)").toBeGreaterThanOrEqual(45);
  });

  it("nie blokuje — przed upływem czasu promise jest pending", async () => {
    let settled = false;
    const p = delay(80).then(() => {
      settled = true;
    });
    await delay(10);
    expect(settled, "delay(80) nie może być rozwiązany po 10ms — nie używaj pętli blokującej").toBe(false);
    await p;
  });
});

describe("promisify", () => {
  function loadFile(name, cb) {
    setTimeout(() => {
      if (name === "missing") cb(new Error("not found"));
      else cb(null, `content of ${name}`);
    }, 5);
  }

  it("sukces callbacka staje się rozwiązaniem promisa", async () => {
    const loadFileAsync = promisify(loadFile);
    await expect(loadFileAsync("a.txt")).resolves.toBe("content of a.txt");
  });

  it("błąd callbacka staje się odrzuceniem promisa", async () => {
    const loadFileAsync = promisify(loadFile);
    await expect(
      loadFileAsync("missing"),
      "gdy callback dostaje err, promise ma być odrzucony tym błędem (reject)",
    ).rejects.toThrow("not found");
  });

  it("przekazuje wiele argumentów do oryginalnej funkcji", async () => {
    const join = (a, b, cb) => cb(null, `${a}-${b}`);
    const joinAsync = promisify(join);
    await expect(joinAsync("x", "y"), "wszystkie argumenty (poza callbackiem) mają trafić do f").resolves.toBe("x-y");
  });
});
