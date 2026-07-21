import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("wykrywanie driftu typów generowanych", () => {
  it("wykrywa zmieniony fingerprint dla tego samego UID", () => {
    expect(solve({ a: "1", b: "2" }, { a: "1", b: "old" })).toEqual(["b"]);
  });

  it("traktuje brakujący wygenerowany typ jako drift", () => {
    expect(solve({ a: "1", b: "2" }, { a: "1" })).toEqual(["b"]);
  });

  it("traktuje nadmiarowy wygenerowany typ jako drift", () => {
    expect(solve({ a: "1" }, { a: "1", c: "3" })).toEqual(["c"]);
  });

  it("zwraca pustą listę, gdy schemat i typy są zgodne", () => {
    expect(solve({ a: "1", b: "2" }, { a: "1", b: "2" })).toEqual([]);
  });

  it("zwraca stabilną, posortowaną listę bez duplikatów przy wielu rozbieżnościach", () => {
    expect(solve({ a: "1", b: "2" }, { a: "1", b: "old", c: "3" })).toEqual([
      "b",
      "c",
    ]);
  });
});
