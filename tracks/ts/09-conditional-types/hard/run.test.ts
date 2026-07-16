import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  pickByType,
  type DeepPartialSafe,
  type KeysOfType,
  type OmitByType,
  type PickByType,
} from "./starter";

interface Row {
  id: number;
  name: string;
  score: number;
  active: boolean;
}

const row: Row = { id: 1, name: "Ala", score: 9, active: true };

const isNumber = (value: unknown): value is number =>
  typeof value === "number";
const isString = (value: unknown): value is string =>
  typeof value === "string";

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("KeysOfType zbiera klucze o wartości danego typu", () => {
    type _num = Expect<Equal<KeysOfType<Row, number>, "id" | "score">>;
    type _str = Expect<Equal<KeysOfType<Row, string>, "name">>;
    expect(true).toBe(true);
  });

  it("KeysOfType bez pasujących pól daje never", () => {
    type _t = Expect<Equal<KeysOfType<Row, Date>, never>>;
    expect(true).toBe(true);
  });

  it("PickByType zostawia tylko pola danego typu", () => {
    type _t = Expect<
      Equal<PickByType<Row, number>, { id: number; score: number }>
    >;
    expect(true).toBe(true);
  });

  it("OmitByType usuwa pola danego typu", () => {
    type _t = Expect<
      Equal<OmitByType<Row, number>, { name: string; active: boolean }>
    >;
    expect(true).toBe(true);
  });

  it("DeepPartialSafe zostawia tablicę tablicą (bez undefined w elementach)", () => {
    type _t = Expect<
      Equal<
        DeepPartialSafe<{ tags: string[]; theme: { color: string } }>,
        { tags?: string[]; theme?: { color?: string } }
      >
    >;
    expect(true).toBe(true);
  });

  it("DeepPartialSafe schodzi w głąb elementów tablicy obiektów", () => {
    type _t = Expect<
      Equal<
        DeepPartialSafe<{ items: { id: number }[] }>,
        { items?: { id?: number }[] }
      >
    >;
    expect(true).toBe(true);
  });

  it("DeepPartialSafe zostawia prymityw bez zmian", () => {
    type _t = Expect<Equal<DeepPartialSafe<string>, string>>;
    expect(true).toBe(true);
  });

  it("pickByType zwraca typ zawężony przez strażnik", () => {
    const picked = pickByType(row, isNumber);
    type _t = Expect<Equal<typeof picked, { id: number; score: number }>>;
    expect(picked).toEqual({ id: 1, score: 9 });
  });
});

describe("pickByType", () => {
  it("zostawia pola liczbowe", () => {
    expect(pickByType(row, isNumber)).toEqual({ id: 1, score: 9 });
  });

  it("zostawia pola tekstowe", () => {
    expect(pickByType(row, isString)).toEqual({ name: "Ala" });
  });

  it("gdy nic nie pasuje, zwraca pusty obiekt", () => {
    const isDate = (value: unknown): value is Date => value instanceof Date;
    expect(pickByType(row, isDate)).toEqual({});
  });

  it("nie mutuje źródła", () => {
    const source = { ...row };
    pickByType(source, isNumber);
    expect(
      source,
      "pickByType ma budować nowy obiekt — usuwanie pól ze źródła to mutacja",
    ).toEqual(row);
  });

  it("nie gubi pól o wartościach falsy, które pasują do strażnika", () => {
    expect(
      pickByType({ zero: 0, empty: "", flag: false }, isNumber),
      "0 jest falsy, ale to poprawna liczba — decyduje strażnik, nie truthiness",
    ).toEqual({ zero: 0 });
  });

  it("zwraca nowy obiekt, nie referencję do źródła", () => {
    expect(pickByType(row, isNumber)).not.toBe(row);
  });
});
