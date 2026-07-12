import { describe, it, expect } from "vitest";
import { flattenTree, findPath } from "./starter.js";

const tree = {
  value: "a",
  children: [
    { value: "b", children: [{ value: "d" }, { value: "e" }] },
    { value: "c", children: [{ value: "f" }] },
  ],
};

describe("flattenTree", () => {
  it("zwraca wartości w kolejności pre-order DFS", () => {
    expect(
      flattenTree(tree),
      "pre-order: najpierw węzeł, potem kolejno jego poddrzewa (a, potem całe b, potem całe c)",
    ).toEqual(["a", "b", "d", "e", "c", "f"]);
  });

  it("dla liścia zwraca jednoelementową tablicę", () => {
    expect(flattenTree({ value: "x" })).toEqual(["x"]);
  });
});

describe("findPath", () => {
  it("znajduje ścieżkę od korzenia do węzła", () => {
    expect(findPath(tree, "e"), "ścieżka a -> b -> e").toEqual(["a", "b", "e"]);
    expect(findPath(tree, "f")).toEqual(["a", "c", "f"]);
  });

  it("dla korzenia zwraca ścieżkę jednoelementową", () => {
    expect(findPath(tree, "a")).toEqual(["a"]);
  });

  it("zwraca null, gdy węzła nie ma", () => {
    expect(
      findPath(tree, "zzz"),
      "gdy żadne poddrzewo nie zawiera targetu, funkcja ma zwrócić null (a nie np. [])",
    ).toBe(null);
  });
});
