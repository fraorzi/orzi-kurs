import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Wyznacz precyzyjne tagi rewalidacji", () => {
  it("spełnia kontrakt produkcyjny", async () => {
    expect(solve({ model: "article", action: "publish", documentId: "doc", locale: "pl", category: "news" })).toEqual(["article:doc", "articles:pl", "category:news:pl"]);
    expect(solve({ model: "media", action: "update", documentId: "m", locale: "pl" })).toEqual([]);
  });
});

