import { describe, it, expect } from "vitest";
import { observable } from "./starter.js";

describe("observable — zmiany płaskie", () => {
  it("woła onChange z kluczem i nową wartością przy zapisie", () => {
    const changes = [];
    const s = observable({ count: 0 }, (p, v) => changes.push([p, v]));
    s.count = 5;
    expect(changes, "zapis count → onChange('count', 5)").toEqual([["count", 5]]);
    expect(s.count, "wartość faktycznie się zapisała").toBe(5);
  });

  it("woła onChange przy delete z wartością undefined", () => {
    const changes = [];
    const s = observable({ a: 1 }, (p, v) => changes.push([p, v]));
    delete s.a;
    expect(changes).toEqual([["a", undefined]]);
    expect("a" in s, "klucz faktycznie usunięty").toBe(false);
  });
});

describe("observable — głębokość", () => {
  it("śledzi zmiany w zagnieżdżonym obiekcie z pełną ścieżką", () => {
    const changes = [];
    const s = observable({ user: { name: "a" }, count: 0 }, (p, v) => changes.push([p, v]));
    s.count = 5;
    s.user.name = "bob";
    delete s.user.name;
    expect(
      changes,
      "ścieżka zagnieżdżonego klucza to 'user.name', budowana w pułapce get przez owijanie",
    ).toEqual([
      ["count", 5],
      ["user.name", "bob"],
      ["user.name", undefined],
    ]);
  });

  it("mutacja tablicy zgłasza indeks i length", () => {
    const changes = [];
    const s = observable({ tags: ["x"] }, (p, v) => changes.push([p, v]));
    s.tags.push("y");
    expect(
      changes,
      "push to zapis indeksu 1 i aktualizacja length — dwie zmiany na ścieżce tags.*",
    ).toEqual([
      ["tags.1", "y"],
      ["tags.length", 2],
    ]);
  });
});
