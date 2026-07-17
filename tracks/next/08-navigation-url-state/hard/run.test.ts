import { describe, expect, it } from "vitest";
import { readCatalogState } from "./starter";

describe("readCatalogState", () => {
  it("waliduje tablicowe wejście i zachowuje stan w linkach", async () => {
    await expect(readCatalogState(Promise.resolve({
      query: [" monitor ", "ignored"],
      sort: "price-desc",
      page: "3",
    }), 5)).resolves.toEqual({
      query: "monitor",
      sort: "price-desc",
      page: 3,
      previousHref: "/catalog?query=monitor&sort=price-desc&page=2",
      nextHref: "/catalog?query=monitor&sort=price-desc&page=4",
    });
  });

  it("normalizuje błędy i nie serializuje domyślnych wartości", async () => {
    await expect(readCatalogState(Promise.resolve({ sort: "newest", page: "nan" }), 2))
      .resolves.toEqual({
        query: "",
        sort: "relevance",
        page: 1,
        previousHref: null,
        nextHref: "/catalog?page=2",
      });
  });

  it("ogranicza stronę do końca zbioru", async () => {
    const state = await readCatalogState(Promise.resolve({ page: "99" }), 4);
    expect(state.page).toBe(4);
    expect(state.previousHref).toBe("/catalog?page=3");
    expect(state.nextHref).toBeNull();
  });
});
