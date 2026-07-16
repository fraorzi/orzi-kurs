import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { tagCounts, type Entry, type TagCounts } from "./starter";

// Asercja typu: alias TagCounts musi być mapą tag → liczba wystąpień.
type _tagCountsShape = Expect<Equal<TagCounts, Record<string, number>>>;

const entries: Entry[] = [
  { id: 1, tags: ["ts", "js"] },
  { id: 2, tags: ["ts"] },
  { id: 3, tags: [] },
];

describe("tagCounts", () => {
  it("zlicza wystąpienia każdego tagu", () => {
    const counts: Record<string, number> = tagCounts(entries);
    expect(counts, "ts występuje 2×, js 1×").toEqual({ ts: 2, js: 1 });
  });

  it("zwraca pustą mapę dla wpisów bez tagów i pustej listy", () => {
    expect(tagCounts([{ id: 1, tags: [] }]), "brak tagów → {}").toEqual({});
    expect(tagCounts([]), "pusta lista → {}").toEqual({});
  });

  it("nie mutuje wejścia", () => {
    const input: Entry[] = [{ id: 1, tags: ["a", "a"] }];
    const copy = structuredClone(input);
    tagCounts(input);
    expect(input, "funkcja zmodyfikowała wejście").toEqual(copy);
  });
});
