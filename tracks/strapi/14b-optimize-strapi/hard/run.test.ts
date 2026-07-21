import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("[O] precyzyjne tagi rewalidacji", () => {
  it("unieważnia dokument, listę locale i kategorię", () => {
    expect(solve("doc", "pl", "news")).toEqual(
      expect.arrayContaining(["article:doc", "articles:pl", "category:news:pl"]),
    );
  });

  it("bez kategorii pomija jej tag", () => {
    const tags = solve("doc", "pl");
    expect(tags).toEqual(expect.arrayContaining(["article:doc", "articles:pl"]));
    expect(tags.some((tag) => tag.startsWith("category:"))).toBe(false);
  });

  it("[quality] nie wykonuje globalnego purge", () => {
    expect(solve("doc", "pl", "news")).not.toContain("content");
  });
});
