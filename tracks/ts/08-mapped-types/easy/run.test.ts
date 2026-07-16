import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  toDraft,
  clearFields,
  type MyPartial,
  type MyReadonly,
  type Mutable,
  type Nullable,
} from "./starter";

interface User {
  name: string;
  age: number;
}

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("MyPartial robi każde pole opcjonalnym", () => {
    type _t = Expect<
      Equal<MyPartial<User>, { name?: string; age?: number }>
    >;
    const patch: MyPartial<User> = {};
    expect(patch).toEqual({});
  });

  it("MyReadonly robi każde pole tylko do odczytu", () => {
    type _t = Expect<
      Equal<MyReadonly<User>, { readonly name: string; readonly age: number }>
    >;
    const frozen: MyReadonly<User> = { name: "Ala", age: 30 };
    const illegal = (): void => {
      // @ts-expect-error pole readonly — zapis musi być błędem typu
      frozen.age = 31;
    };
    expect(illegal).toBeTypeOf("function");
  });

  it("Mutable zdejmuje readonly", () => {
    type _t = Expect<Equal<Mutable<MyReadonly<User>>, User>>;
    const draft: Mutable<MyReadonly<User>> = { name: "Ala", age: 30 };
    draft.age = 31;
    expect(draft.age).toBe(31);
  });

  it("Nullable dopuszcza null w każdej wartości", () => {
    type _t = Expect<
      Equal<Nullable<User>, { name: string | null; age: number | null }>
    >;
    const empty: Nullable<User> = { name: null, age: null };
    expect(empty).toEqual({ name: null, age: null });
  });

  it("Nullable nie robi pól opcjonalnymi", () => {
    const illegal = (): void => {
      // @ts-expect-error brakuje pola age — null to wartość, nie brak pola
      const wrong: Nullable<User> = { name: null };
      void wrong;
    };
    expect(illegal).toBeTypeOf("function");
  });

  it("toDraft zwraca typ mutowalny", () => {
    const frozen: MyReadonly<User> = { name: "Ala", age: 30 };
    const draft = toDraft(frozen);
    type _t = Expect<Equal<typeof draft, User>>;
    draft.name = "Ola";
    expect(draft.name).toBe("Ola");
  });

  it("clearFields zwraca Nullable<T>", () => {
    const cleared = clearFields({ name: "Ala", age: 30 });
    type _t = Expect<
      Equal<typeof cleared, Nullable<{ name: string; age: number }>>
    >;
    expect(cleared).toEqual({ name: null, age: null });
  });
});

describe("toDraft", () => {
  it("kopiuje wszystkie pola", () => {
    expect(toDraft<User>({ name: "Ala", age: 30 })).toEqual({
      name: "Ala",
      age: 30,
    });
  });

  it("zwraca nowy obiekt, nie źródło", () => {
    const source: MyReadonly<User> = { name: "Ala", age: 30 };
    expect(
      toDraft(source),
      "kopia ma być NOWYM obiektem — inaczej mutacja draftu zmieni 'zamrożone' źródło",
    ).not.toBe(source);
  });

  it("mutacja kopii nie rusza źródła", () => {
    const source: MyReadonly<User> = { name: "Ala", age: 30 };
    const draft = toDraft(source);
    draft.age = 99;
    expect(source.age).toBe(30);
  });
});

describe("clearFields", () => {
  it("ustawia każde pole na null", () => {
    expect(clearFields({ name: "Ala", age: 30 })).toEqual({
      name: null,
      age: null,
    });
  });

  it("zachowuje komplet kluczy", () => {
    expect(
      Object.keys(clearFields({ a: 1, b: 2, c: 3 })).sort(),
      "Nullable<T> obiecuje te same klucze — żadnego nie wolno zgubić",
    ).toEqual(["a", "b", "c"]);
  });

  it("nie mutuje źródła", () => {
    const source = { name: "Ala", age: 30 };
    clearFields(source);
    expect(source).toEqual({ name: "Ala", age: 30 });
  });

  it("dla pustego obiektu zwraca pusty obiekt", () => {
    expect(clearFields({})).toEqual({});
  });
});
