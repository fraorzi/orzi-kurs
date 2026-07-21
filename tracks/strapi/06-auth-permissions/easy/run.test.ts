import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("odczyt Bearer token bez wycieku", () => {
  it("zwraca token dla poprawnego schematu Bearer", () => {
    expect(solve("Bearer abc.def")).toBe("abc.def");
  });

  it("odrzuca inny schemat autoryzacji", () => {
    expect(solve("Basic abc")).toBeNull();
  });

  it("odrzuca pusty token po Bearer", () => {
    expect(solve("Bearer ")).toBeNull();
  });

  it("odrzuca brak nagłówka", () => {
    expect(solve(undefined)).toBeNull();
  });

  it("odrzuca nagłówek z dodatkowym segmentem po tokenie", () => {
    expect(solve("Bearer abc def")).toBeNull();
  });
});
