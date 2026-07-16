import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  compact,
  type ElementType,
  type MyExclude,
  type MyExtract,
  type MyNonNullable,
} from "./starter";

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("MyExclude usuwa z unii wskazane składniki", () => {
    type _t = Expect<Equal<MyExclude<"a" | "b" | "c", "a">, "b" | "c">>;
    type _many = Expect<
      Equal<MyExclude<"a" | "b" | "c", "a" | "c">, "b">
    >;
    expect(true).toBe(true);
  });

  it("MyExclude nic nie robi, gdy nie ma czego usunąć", () => {
    type _t = Expect<Equal<MyExclude<string | number, boolean>, string | number>>;
    expect(true).toBe(true);
  });

  it("MyExtract zostawia tylko pasujące składniki", () => {
    type _t = Expect<
      Equal<MyExtract<string | number | boolean, string | number>, string | number>
    >;
    type _none = Expect<Equal<MyExtract<string, number>, never>>;
    expect(true).toBe(true);
  });

  it("MyNonNullable usuwa null i undefined", () => {
    type _t = Expect<
      Equal<MyNonNullable<string | null | undefined>, string>
    >;
    type _all = Expect<Equal<MyNonNullable<null | undefined>, never>>;
    expect(true).toBe(true);
  });

  it("ElementType wyciąga typ elementu tablicy, także readonly", () => {
    type _mutable = Expect<Equal<ElementType<number[]>, number>>;
    type _readonly = Expect<Equal<ElementType<readonly string[]>, string>>;
    expect(true).toBe(true);
  });

  it("ElementType dla nie-tablicy daje never", () => {
    type _t = Expect<Equal<ElementType<string>, never>>;
    expect(true).toBe(true);
  });

  it("compact zwraca tablicę bez null i undefined w typie", () => {
    const values: (string | null | undefined)[] = ["a", null, "b"];
    const clean = compact(values);
    type _t = Expect<Equal<typeof clean, string[]>>;
    expect(clean).toEqual(["a", "b"]);
  });
});

describe("compact", () => {
  it("usuwa null", () => {
    expect(compact(["a", null, "b"])).toEqual(["a", "b"]);
  });

  it("usuwa undefined", () => {
    expect(compact([1, undefined, 2])).toEqual([1, 2]);
  });

  it("zostawia wartości falsy inne niż null i undefined", () => {
    expect(
      compact([0, null, false, "", undefined]),
      "0, false i pusty string to poprawne wartości — filtr ma sprawdzać null/undefined, nie truthiness",
    ).toEqual([0, false, ""]);
  });

  it("zachowuje kolejność", () => {
    expect(compact(["c", null, "a", "b"])).toEqual(["c", "a", "b"]);
  });

  it("nie mutuje wejścia", () => {
    const input = ["a", null, "b"];
    compact(input);
    expect(input, "compact ma zwracać nową tablicę").toEqual(["a", null, "b"]);
  });

  it("dla pustej listy zwraca pustą listę", () => {
    expect(compact([])).toEqual([]);
  });

  it("dla listy samych null zwraca pustą listę", () => {
    expect(compact([null, undefined])).toEqual([]);
  });
});
