import { describe, expect, it } from "vitest";
import { patchCatalogQuery } from "./starter";

describe("patchCatalogQuery", () => {
  it("zachowuje niezależne filtry i resetuje stronę", () => {
    expect(patchCatalogQuery("query=monitor&sort=price-asc&page=4&stock=1", {
      query: "  keyboard ",
    })).toBe("query=keyboard&sort=price-asc&stock=1");
  });

  it("usuwa wartości domyślne", () => {
    expect(patchCatalogQuery("query=x&sort=price-desc&page=3", {
      query: "",
      sort: "relevance",
      page: 1,
    })).toBe("");
  });

  it("pozwala zmienić wyłącznie stronę", () => {
    expect(patchCatalogQuery("query=monitor&stock=1", { page: 2 }))
      .toBe("query=monitor&stock=1&page=2");
  });
});
