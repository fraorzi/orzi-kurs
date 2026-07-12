import { describe, it, expect } from "vitest";
import { isWeekend, formatISODate } from "./starter.js";

describe("isWeekend", () => {
  it("true dla soboty i niedzieli", () => {
    expect(isWeekend(new Date(Date.UTC(2020, 0, 4))), "2020-01-04 to sobota").toBe(true);
    expect(isWeekend(new Date(Date.UTC(2020, 0, 5))), "2020-01-05 to niedziela").toBe(true);
  });

  it("false dla dni roboczych", () => {
    expect(
      isWeekend(new Date(Date.UTC(2020, 0, 6))),
      "2020-01-06 to poniedziałek — getUTCDay() === 1",
    ).toBe(false);
    expect(isWeekend(new Date(Date.UTC(2020, 0, 3)))).toBe(false); // piątek
  });
});

describe("formatISODate", () => {
  it("zwraca samą datę YYYY-MM-DD, ignorując czas", () => {
    expect(formatISODate(new Date(Date.UTC(2020, 0, 1, 15, 30)))).toBe("2020-01-01");
  });

  it("działa dla końca roku", () => {
    expect(
      formatISODate(new Date(Date.UTC(2023, 11, 31))),
      "miesiące są od 0, więc 11 to grudzień; toISOString jest w UTC",
    ).toBe("2023-12-31");
  });
});
