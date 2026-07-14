import { describe, it, expect } from "vitest";
import { paginate } from "./starter.js";

function makeSource() {
  const pages = {
    start: { items: [1, 2], next: "p1" },
    p1: { items: [3], next: "p2" },
    p2: { items: [4, 5], next: null },
  };
  const state = { fetches: 0 };
  async function fetchPage(cursor) {
    state.fetches += 1;
    return pages[cursor ?? "start"];
  }
  return { fetchPage, state };
}

describe("paginate", () => {
  it("wylewa elementy wszystkich stron w kolejności", async () => {
    const { fetchPage } = makeSource();
    const out = [];
    for await (const x of paginate(fetchPage)) out.push(x);
    expect(out, "elementy z kolejnych stron sklejone w jeden strumień").toEqual([1, 2, 3, 4, 5]);
  });

  it("pobiera dokładnie tyle stron, ile jest (bez pobrań w zapas)", async () => {
    const { fetchPage, state } = makeSource();
    // eslint-disable-next-line no-unused-vars
    for await (const _ of paginate(fetchPage)) { /* konsumuj do końca */ }
    expect(
      state.fetches,
      "3 strony → 3 wywołania fetchPage; zatrzymanie na next === null, nie 4. pobranie",
    ).toBe(3);
  });

  it("nie pobiera kolejnej strony, gdy konsument przerwie po pierwszym elemencie (leniwość)", async () => {
    const { fetchPage, state } = makeSource();
    for await (const x of paginate(fetchPage)) {
      expect(x).toBe(1);
      break; // przerywamy zaraz na starcie
    }
    expect(
      state.fetches,
      "przerwanie po 1. elemencie pobiera tylko 1. stronę — generator jest leniwy",
    ).toBe(1);
  });
});
