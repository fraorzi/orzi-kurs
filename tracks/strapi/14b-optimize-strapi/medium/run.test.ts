import { describe, expect, it } from "vitest";
import { solve } from "./starter";

function fixture() {
  let calls = 0;
  return { calls: () => calls, fetchMany: async (ids: string[]) => { calls += 1; return Object.fromEntries(ids.map((id) => [id, id.toUpperCase()])); } };
}

describe("Usuń N+1 przez batching", () => {
  it("zachowuje kolejność i duplikaty wyniku", async () => {
    const api = fixture();
    expect(await solve(["a", "b", "a"], api.fetchMany)).toEqual(["A", "B", "A"]);
  });
  it("[quality] wykonuje najwyżej jedno wywołanie zależności", async () => {
    const api = fixture();
    await solve(["a", "b", "a"], api.fetchMany);
    expect(api.calls()).toBe(1);
  });
});

