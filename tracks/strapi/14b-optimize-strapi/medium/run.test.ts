import { describe, expect, it } from "vitest";
import { solve } from "./starter";

function fixture() {
  let calls = 0;
  return {
    calls: () => calls,
    fetchMany: async (ids: string[]) => {
      calls += 1;
      return Object.fromEntries(ids.map((id) => [id, id.toUpperCase()]));
    },
  };
}

describe("[O] batching relacji", () => {
  it("zachowuje kolejność i duplikaty wyniku", async () => {
    const api = fixture();
    expect(await solve(["a", "b", "a"], api.fetchMany)).toEqual(["A", "B", "A"]);
  });

  it("pusta lista nie dotyka zależności", async () => {
    const api = fixture();
    expect(await solve([], api.fetchMany)).toEqual([]);
    expect(api.calls()).toBe(0);
  });

  it("[quality] wykonuje najwyżej jedno wywołanie zależności", async () => {
    const api = fixture();
    await solve(["a", "b", "a", "c", "b"], api.fetchMany);
    expect(api.calls()).toBe(1);
  });
});
