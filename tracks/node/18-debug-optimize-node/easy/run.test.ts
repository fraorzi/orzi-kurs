import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("[O] deduplikacja po id", () => {
  it("zachowuje pierwszy egzemplarz i kolejność", () => {
    expect(
      solve(
        [
          { id: "a", n: 1 },
          { id: "b", n: 2 },
          { id: "a", n: 3 },
        ],
        () => undefined,
      ),
    ).toEqual([
      { id: "a", n: 1 },
      { id: "b", n: 2 },
    ]);
  });

  it("obsługuje wejście bez duplikatów i puste", () => {
    expect(solve([{ id: "x" }], () => undefined)).toEqual([{ id: "x" }]);
    expect(solve([], () => undefined)).toEqual([]);
  });

  it("[quality] łączny koszt rośnie liniowo, nie kwadratowo", () => {
    const items = Array.from({ length: 100 }, (_, index) => ({
      id: String(index % 50),
    }));
    let work = 0;
    const result = solve(items, (count) => {
      work += count;
    });
    expect(result).toHaveLength(50);
    expect(work).toBeLessThanOrEqual(110);
  });
});
