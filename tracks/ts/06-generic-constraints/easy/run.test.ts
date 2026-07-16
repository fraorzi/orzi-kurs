import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  longest,
  getProp,
  ok,
  noContent,
  type ApiResponse,
} from "./starter";

const user = { name: "Ala", age: 30 };

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("longest zachowuje dokładny typ argumentu", () => {
    // Argumenty literalne → T = unia literałów (ograniczenie nie rozszerza typu).
    const text = longest("kot", "pies");
    const list = longest([1, 2], [1, 2, 3]);
    type _text = Expect<Equal<typeof text, "kot" | "pies">>;
    type _list = Expect<Equal<typeof list, number[]>>;
    expect([text, list]).toEqual(["pies", [1, 2, 3]]);
  });

  it("dla argumentów typu string wynik jest stringiem", () => {
    const a: string = "kot";
    const b: string = "pies";
    const result = longest(a, b);
    type _t = Expect<Equal<typeof result, string>>;
    expect(result).toBe("pies");
  });

  it("longest odrzuca argument bez pola length", () => {
    const illegal = (): unknown =>
      // @ts-expect-error number nie spełnia ograniczenia { length: number }
      longest(10, 100);
    expect(illegal).toBeTypeOf("function");
  });

  it("getProp zwraca typ pola, a nie unię wszystkich pól", () => {
    const name = getProp(user, "name");
    const age = getProp(user, "age");
    type _name = Expect<Equal<typeof name, string>>;
    type _age = Expect<Equal<typeof age, number>>;
    expect([name, age]).toEqual(["Ala", 30]);
  });

  it("getProp odrzuca klucz spoza obiektu", () => {
    const illegal = (): unknown =>
      // @ts-expect-error "wiek" nie jest kluczem user
      getProp(user, "wiek");
    expect(illegal).toBeTypeOf("function");
  });

  it("ApiResponse bez argumentu typu ma body: null", () => {
    type _t = Expect<Equal<ApiResponse, { status: number; body: null }>>;
    expect(noContent().body).toBeNull();
  });

  it("ApiResponse z argumentem typu przenosi typ ciała", () => {
    type _t = Expect<
      Equal<ApiResponse<string[]>, { status: number; body: string[] }>
    >;
    const response = ok(["Ala"]);
    type _ok = Expect<Equal<typeof response, ApiResponse<string[]>>>;
    expect(response.body).toEqual(["Ala"]);
  });
});

describe("longest", () => {
  it("zwraca dłuższy tekst", () => {
    expect(longest("kot", "pies")).toBe("pies");
  });

  it("zwraca dłuższą tablicę", () => {
    expect(longest([1, 2], [1, 2, 3])).toEqual([1, 2, 3]);
  });

  it("przy remisie zwraca pierwszy argument", () => {
    expect(
      longest("aa", "bb"),
      "kontrakt mówi: remis → pierwszy, więc porównanie musi być >=, nie >",
    ).toBe("aa");
  });

  it("zwraca tę samą referencję, nie kopię", () => {
    const a = [1, 2, 3];
    expect(longest(a, [1])).toBe(a);
  });
});

describe("getProp", () => {
  it("odczytuje wartość pola", () => {
    expect(getProp(user, "name")).toBe("Ala");
  });

  it("działa dla dowolnego obiektu", () => {
    expect(getProp({ active: true }, "active")).toBe(true);
  });

  it("nie mutuje obiektu", () => {
    const source = { ...user };
    getProp(source, "age");
    expect(source).toEqual(user);
  });
});

describe("ok / noContent", () => {
  it("ok pakuje ciało ze statusem 200", () => {
    expect(ok(["Ala"])).toEqual({ status: 200, body: ["Ala"] });
  });

  it("ok przepuszcza dowolne ciało bez kopiowania", () => {
    const body = { id: 1 };
    expect(ok(body).body).toBe(body);
  });

  it("noContent daje status 204 i puste ciało", () => {
    expect(
      noContent(),
      "204 No Content nie ma ciała — stąd null jako domyślny parametr typu",
    ).toEqual({ status: 204, body: null });
  });
});
