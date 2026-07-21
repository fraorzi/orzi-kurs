import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("walidacja granicy paginacji REST", () => {
  it("akceptuje spójną paginację i zwraca jej kopię", () => {
    const value = { page: 2, pageSize: 10, pageCount: 3, total: 25 };
    expect(solve(value)).toEqual(value);
    expect(solve(value)).not.toBe(value);
  });

  it("odrzuca page wykraczający poza pageCount", () => {
    expect(() => solve({ page: 4, pageSize: 10, pageCount: 3, total: 25 })).toThrow(
      /paginac/i,
    );
  });

  it("odrzuca pageCount niespójny z total i pageSize", () => {
    expect(() => solve({ page: 1, pageSize: 10, pageCount: 5, total: 25 })).toThrow(
      /paginac/i,
    );
  });

  it("odrzuca pageSize niedodatni", () => {
    expect(() => solve({ page: 1, pageSize: 0, pageCount: 0, total: 0 })).toThrow(
      /paginac/i,
    );
  });

  it("akceptuje brak wyników jako poprawny stan (total i pageCount równe 0)", () => {
    expect(solve({ page: 1, pageSize: 10, pageCount: 0, total: 0 })).toEqual({
      page: 1,
      pageSize: 10,
      pageCount: 0,
      total: 0,
    });
  });
});
