import { describe, it, expect } from "vitest";
import { addDays, daysBetween } from "./starter.js";

describe("addDays", () => {
  it("przesuwa datę o podaną liczbę dni", () => {
    const d = new Date(Date.UTC(2020, 0, 1));
    expect(addDays(d, 5).toISOString().slice(0, 10)).toBe("2020-01-06");
  });

  it("nie mutuje wejściowej daty", () => {
    const d = new Date(Date.UTC(2020, 0, 1));
    addDays(d, 5);
    expect(
      d.toISOString().slice(0, 10),
      "twórz NOWY Date z przeliczonego timestampu — nie używaj setterów na wejściu",
    ).toBe("2020-01-01");
  });

  it("działa dla ujemnego przesunięcia", () => {
    const d = new Date(Date.UTC(2020, 0, 10));
    expect(addDays(d, -3).toISOString().slice(0, 10)).toBe("2020-01-07");
  });
});

describe("daysBetween", () => {
  it("liczy pełne dni między datami", () => {
    expect(
      daysBetween(new Date(Date.UTC(2020, 0, 1)), new Date(Date.UTC(2020, 0, 6))),
      "różnica timestampów podzielona przez długość doby w ms",
    ).toBe(5);
  });

  it("jest ujemna, gdy b jest wcześniej niż a", () => {
    expect(daysBetween(new Date(Date.UTC(2020, 0, 6)), new Date(Date.UTC(2020, 0, 1)))).toBe(-5);
  });
});
