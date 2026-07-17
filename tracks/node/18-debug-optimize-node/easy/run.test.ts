import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("[O] Usuń kwadratowe wyszukiwanie", () => {
  it("[quality] spełnia kontrakt i bramkę wydajności", async () => {
    const items = Array.from({ length: 100 }, (_, index) => ({
      id: String(index % 50),
    }));
    let work = 0;
    expect(
      solve(items, (count) => {
        work += count;
      }),
    ).toHaveLength(50);
    expect(work).toBeLessThanOrEqual(110);
    expect(solve([{ id: "a" }, { id: "a" }], () => undefined)).toEqual([
      { id: "a" },
    ]);
  });
});
