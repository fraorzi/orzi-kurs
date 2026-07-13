import { describe, it, expect } from "vitest";
import { collect } from "./starter.js";

describe("collect", () => {
  it("dzieli wyniki na values i errors, zachowując kolejność", async () => {
    const a = new Error("a");
    const result = await collect([
      Promise.resolve(1),
      Promise.reject(a),
      Promise.resolve(3),
    ]);
    expect(result).toEqual({ values: [1, 3], errors: [a] });
  });

  it("nie odrzuca się mimo błędów w środku (kontrast z Promise.all)", async () => {
    await expect(
      collect([Promise.reject(new Error("x")), Promise.resolve(2)]),
      "allSettled nigdy nie odrzuca — collect ma zwrócić wynik, nie rzucić",
    ).resolves.toMatchObject({ values: [2] });
  });

  it("gdy wszystkie się spełniają, errors jest puste", async () => {
    expect(await collect([Promise.resolve("a"), Promise.resolve("b")])).toEqual({
      values: ["a", "b"],
      errors: [],
    });
  });

  it("gdy wszystkie się odrzucają, values jest puste, a wszystkie błędy są zebrane", async () => {
    const e1 = new Error("1");
    const e2 = new Error("2");
    expect(
      await collect([Promise.reject(e1), Promise.reject(e2)]),
      "każde odrzucenie ma trafić do errors — żadne nie może przerwać zbierania",
    ).toEqual({ values: [], errors: [e1, e2] });
  });

  it("dla pustej listy zwraca puste values i errors", async () => {
    expect(await collect([])).toEqual({ values: [], errors: [] });
  });
});
