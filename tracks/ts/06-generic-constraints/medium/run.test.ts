import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { pluck, indexBy, countBy, sumBy } from "./starter";

interface User {
  name: string;
  age: number;
}

const users: User[] = [
  { name: "Ala", age: 30 },
  { name: "Ola", age: 25 },
];

const orders = [
  { id: 1, total: 10 },
  { id: 2, total: 5 },
];

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("pluck zwraca tablicę wartości wskazanego pola", () => {
    const names = pluck(users, "name");
    const ages = pluck(users, "age");
    type _names = Expect<Equal<typeof names, string[]>>;
    type _ages = Expect<Equal<typeof ages, number[]>>;
    expect([names, ages]).toEqual([
      ["Ala", "Ola"],
      [30, 25],
    ]);
  });

  it("pluck odrzuca klucz spoza elementu", () => {
    const illegal = (): unknown =>
      // @ts-expect-error "wiek" nie jest kluczem User
      pluck(users, "wiek");
    expect(illegal).toBeTypeOf("function");
  });

  it("indexBy typuje klucz mapy typem pola", () => {
    const byName = indexBy(users, "name");
    type _t = Expect<Equal<typeof byName, Map<string, User>>>;
    expect(byName.get("Ala")).toEqual({ name: "Ala", age: 30 });
  });

  it("countBy wymaga klucza będącego PropertyKey", () => {
    const illegal = (): unknown =>
      // @ts-expect-error boolean nie jest PropertyKey (string | number | symbol)
      countBy(users, (u: User) => u.age >= 30);
    expect(illegal).toBeTypeOf("function");
  });

  it("countBy przenosi typ klucza do mapy wyników", () => {
    const counts = countBy(users, (u) => (u.age >= 30 ? "30+" : "<30"));
    type _t = Expect<Equal<typeof counts, Map<"30+" | "<30", number>>>;
    expect(counts.get("30+")).toBe(1);
  });

  it("sumBy odrzuca pole, które nie jest liczbą", () => {
    const illegal = (): number =>
      // @ts-expect-error name jest stringiem, a ograniczenie wymaga Record<K, number>
      sumBy(users, "name");
    expect(illegal).toBeTypeOf("function");
  });
});

describe("pluck", () => {
  it("zachowuje kolejność elementów", () => {
    expect(pluck(users, "name")).toEqual(["Ala", "Ola"]);
  });

  it("dla pustej listy zwraca pustą tablicę", () => {
    expect(pluck([] as User[], "name")).toEqual([]);
  });

  it("nie mutuje wejścia", () => {
    const source = [...users];
    pluck(source, "age");
    expect(source).toEqual(users);
  });
});

describe("indexBy", () => {
  it("mapuje wartość pola na element", () => {
    expect(indexBy(users, "age").get(25)).toEqual({ name: "Ola", age: 25 });
  });

  it("przy powtórzonym kluczu wygrywa ostatni element", () => {
    const duplicates: User[] = [
      { name: "Ala", age: 30 },
      { name: "Ala", age: 31 },
    ];
    expect(
      indexBy(duplicates, "name").get("Ala"),
      "indeks trzyma jeden element na klucz — kolejny zapis nadpisuje poprzedni",
    ).toEqual({ name: "Ala", age: 31 });
  });

  it("rozmiar indeksu to liczba unikalnych kluczy", () => {
    expect(indexBy(users, "name").size).toBe(2);
  });
});

describe("countBy", () => {
  it("zlicza elementy według wyliczonego klucza", () => {
    const counts = countBy(users, (u) => (u.age >= 30 ? "30+" : "<30"));
    expect([counts.get("30+"), counts.get("<30")]).toEqual([1, 1]);
  });

  it("sumuje powtórzenia tego samego klucza", () => {
    const counts = countBy(["a", "b", "a"], (letter) => letter);
    expect(
      counts.get("a"),
      "kolejne wystąpienie klucza ma zwiększyć licznik, a nie go nadpisać",
    ).toBe(2);
  });

  it("dla pustej listy zwraca pustą mapę", () => {
    expect(countBy([] as User[], (u) => u.name).size).toBe(0);
  });
});

describe("sumBy", () => {
  it("sumuje pole liczbowe", () => {
    expect(sumBy(orders, "total")).toBe(15);
  });

  it("dla pustej listy zwraca 0", () => {
    expect(
      sumBy([] as { total: number }[], "total"),
      "suma pustego zbioru to 0 — reduce potrzebuje wartości początkowej",
    ).toBe(0);
  });

  it("nie mutuje wejścia", () => {
    const source = [...orders];
    sumBy(source, "total");
    expect(source).toEqual(orders);
  });
});
