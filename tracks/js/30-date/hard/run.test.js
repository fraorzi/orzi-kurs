import { describe, it, expect } from "vitest";
import { relativeTime } from "./starter.js";

const now = new Date(Date.UTC(2020, 0, 10, 12, 0, 0));

describe("relativeTime", () => {
  it("wybiera dni dla różnic ≥ doby (przyszłość: dodatnia)", () => {
    expect(relativeTime(new Date(Date.UTC(2020, 0, 12, 12, 0, 0)), now)).toEqual({
      value: 2,
      unit: "day",
    });
  });

  it("wybiera godziny dla różnic < doby, ≥ godziny (przeszłość: ujemna)", () => {
    expect(
      relativeTime(new Date(Date.UTC(2020, 0, 10, 9, 0, 0)), now),
      "3 godziny wstecz to { value: -3, unit: 'hour' } — znak ujemny dla przeszłości",
    ).toEqual({ value: -3, unit: "hour" });
  });

  it("wybiera minuty i zaokrągla w dół co do wielkości", () => {
    expect(
      relativeTime(new Date(now.getTime() + 90_000), now),
      "90 s to 1 pełna minuta (floor 1.5) — { value: 1, unit: 'minute' }",
    ).toEqual({ value: 1, unit: "minute" });
  });

  it("wybiera sekundy dla małych różnic", () => {
    expect(relativeTime(new Date(now.getTime() - 30_000), now)).toEqual({
      value: -30,
      unit: "second",
    });
  });

  it("dla różnicy < 1 s zwraca value 0", () => {
    expect(relativeTime(new Date(now.getTime() + 500), now)).toEqual({ value: 0, unit: "second" });
  });
});
