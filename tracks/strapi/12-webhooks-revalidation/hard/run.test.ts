import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Wyznacz precyzyjne tagi rewalidacji", () => {
  it("publikacja artykułu z kategorią zwraca tagi dokumentu, listy i kategorii", () => {
    expect(
      solve({ model: "article", action: "publish", documentId: "doc", locale: "pl", category: "news" }),
    ).toEqual(expect.arrayContaining(["article:doc", "articles:pl", "category:news:pl"]));
  });

  it("unpublish generuje ten sam zestaw tagów co publish", () => {
    expect(
      solve({ model: "article", action: "unpublish", documentId: "doc", locale: "pl", category: "news" }),
    ).toEqual(expect.arrayContaining(["article:doc", "articles:pl", "category:news:pl"]));
  });

  it("model inny niż article nigdy nie generuje tagów", () => {
    expect(solve({ model: "media", action: "publish", documentId: "m", locale: "pl" })).toEqual([]);
  });

  it("akcja inna niż publish/unpublish (np. update) nie generuje tagów", () => {
    expect(solve({ model: "article", action: "update", documentId: "doc", locale: "pl" })).toEqual([]);
  });

  it("artykuł bez kategorii nie zwraca tagu kategorii", () => {
    const tags = solve({ model: "article", action: "publish", documentId: "doc", locale: "pl" });
    expect(tags).toEqual(expect.arrayContaining(["article:doc", "articles:pl"]));
    expect(tags.some((tag) => tag.startsWith("category:"))).toBe(false);
  });
});
