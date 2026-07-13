import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { firstSuccess } from "./starter.js";

const src = readFileSync(new URL("./starter.js", import.meta.url), "utf8");
const wait = (ms, value) => new Promise((r) => setTimeout(() => r(value), ms));
const fail = (ms, msg) => new Promise((_, rej) => setTimeout(() => rej(new Error(msg)), ms));

describe("firstSuccess", () => {
  it("zwraca pierwszy sukces, ignorując wcześniejsze odrzucenia", async () => {
    expect(await firstSuccess([Promise.reject(new Error("a")), Promise.resolve("ok")])).toBe("ok");
  });

  it("czeka na sukces, nie odrzuca się na pierwszym błędzie", async () => {
    // Błąd przychodzi szybko, sukces wolno — wynik ma być sukcesem, nie błędem.
    expect(
      await firstSuccess([fail(1, "szybki błąd"), wait(20, "wolny sukces")]),
      "pojedyncze odrzucenie nie może zakończyć całości — trzeba doczekać sukcesu",
    ).toBe("wolny sukces");
  });

  it("gdy wszystkie się odrzucą, rzuca AggregateError ze wszystkimi przyczynami", async () => {
    let caught;
    try {
      await firstSuccess([Promise.reject(new Error("a")), Promise.reject(new Error("b"))]);
    } catch (e) {
      caught = e;
    }
    expect(caught, "brak sukcesu → odrzucenie").toBeInstanceOf(AggregateError);
    expect(
      caught.errors.map((x) => x.message),
      "AggregateError.errors ma zebrać wszystkie przyczyny w kolejności wejścia",
    ).toEqual(["a", "b"]);
  });

  it("dla pustej listy odrzuca się AggregateError z pustym errors", async () => {
    await expect(firstSuccess([])).rejects.toBeInstanceOf(AggregateError);
  });

  it("nie używa Promise.any ani Promise.race (ma być ręczna implementacja)", () => {
    expect(
      /Promise\.any|Promise\.race/.test(src),
      "to zadanie ćwiczy ręczne zliczanie odrzuceń i budowę AggregateError — bez Promise.any/Promise.race",
    ).toBe(false);
  });
});
