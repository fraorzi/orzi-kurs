import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Zawęź rewalidację cache", () => {
  it("unieważnia dokument, listę locale i kategorię", () => {
    expect(solve("doc", "pl", "news")).toEqual(expect.arrayContaining(["article:doc", "articles:pl", "category:news:pl"]));
  });
  it("[quality] nie wykonuje globalnego purge", () => {
    expect(solve("doc", "pl", "news")).not.toContain("content");
  });
});

