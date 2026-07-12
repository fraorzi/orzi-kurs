import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { withTimeout, firstSuccess } from "./starter.js";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const resolveAfter = (ms, value) => wait(ms).then(() => value);
const rejectAfter = (ms, message) =>
  wait(ms).then(() => {
    throw new Error(message);
  });

describe("withTimeout", () => {
  it("przepuszcza wynik, gdy promise zdąży", async () => {
    await expect(withTimeout(resolveAfter(10, "dane"), 100)).resolves.toBe("dane");
  });

  it("przepuszcza odrzucenie, gdy promise odrzuci przed limitem", async () => {
    await expect(withTimeout(rejectAfter(10, "prawdziwy błąd"), 100)).rejects.toThrow("prawdziwy błąd");
  });

  it("po przekroczeniu limitu odrzuca błędem TimeoutError", async () => {
    const slow = resolveAfter(200, "za późno");
    const err = await withTimeout(slow, 30).then(
      () => null,
      (e) => e,
    );
    expect(err, "po ms milisekund promise ma być odrzucony — wyścig operacji z timerem (Promise.race)").not.toBeNull();
    expect(err.name, 'błąd timeoutu ma mieć name === "TimeoutError", żeby dało się go odróżnić od błędów operacji').toBe(
      "TimeoutError",
    );
  });
});

describe("firstSuccess", () => {
  it("nie używa wbudowanego Promise.any", () => {
    const src = readFileSync(new URL("./starter.js", import.meta.url), "utf8");
    expect(src.includes("Promise.any"), "celem zadania jest własna implementacja — nie wywołuj Promise.any").toBe(false);
  });

  it("zwraca pierwszy sukces, ignorując wcześniejsze błędy", async () => {
    const result = await firstSuccess([
      rejectAfter(5, "mirror1 down"),
      resolveAfter(30, "mirror2 ok"),
      resolveAfter(80, "mirror3 ok"),
    ]);
    expect(result, "błąd, który przyszedł pierwszy, nie może wygrać — czekamy na pierwszy SUKCES").toBe("mirror2 ok");
  });

  it("sukces wygrywa nawet jako ostatni na liście", async () => {
    await expect(
      firstSuccess([Promise.reject(new Error("a")), Promise.reject(new Error("b")), resolveAfter(10, "c")]),
    ).resolves.toBe("c");
  });

  it("gdy wszystkie odrzucą, odrzuca AggregateError z powodami w kolejności wejścia", async () => {
    const err = await firstSuccess([rejectAfter(20, "pierwszy"), rejectAfter(5, "drugi")]).then(
      () => null,
      (e) => e,
    );
    expect(err).toBeInstanceOf(AggregateError);
    expect(
      err.errors.map((e) => e.message),
      "errors[i] ma odpowiadać promises[i], niezależnie od kolejności odrzucania",
    ).toEqual(["pierwszy", "drugi"]);
  });

  it("pusta tablica odrzuca AggregateError z pustym errors", async () => {
    const err = await firstSuccess([]).then(
      () => null,
      (e) => e,
    );
    expect(err).toBeInstanceOf(AggregateError);
    expect(err.errors).toEqual([]);
  });
});
