import { describe, it, expect } from "vitest";
import { groupBy } from "./starter.js";

describe("groupBy", () => {
  it("zwraca Map, nie zwykły obiekt", () => {
    expect(groupBy([1, 2, 3], (n) => n % 2)).toBeInstanceOf(Map);
  });

  it("zachowuje typ klucza (liczby zostają liczbami)", () => {
    const g = groupBy([1, 2, 3, 4, 5], (n) => n % 2);
    expect(
      [...g.keys()],
      "Map.groupBy nie rzutuje klucza na string — klucze mają być liczbami 1 i 0",
    ).toEqual([1, 0]);
    expect(g.get(1)).toEqual([1, 3, 5]);
    expect(g.get(0)).toEqual([2, 4]);
  });

  it("grupuje obiekty wg wyliczonego klucza, zachowując kolejność", () => {
    const users = [
      { name: "Ala", team: 1 },
      { name: "Ola", team: 2 },
      { name: "Ela", team: 1 },
    ];
    const g = groupBy(users, (u) => u.team);
    expect(g.get(1)).toEqual([
      { name: "Ala", team: 1 },
      { name: "Ela", team: 1 },
    ]);
    expect(g.get(2)).toEqual([{ name: "Ola", team: 2 }]);
  });

  it("dla pustej listy zwraca pustą Map", () => {
    expect(groupBy([], (x) => x).size).toBe(0);
  });
});
