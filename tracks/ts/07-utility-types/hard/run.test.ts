import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  createForm,
  setField,
  setErrors,
  isDirty,
  pick,
  omit,
  type FieldErrors,
  type FormState,
} from "./starter";

interface Profile {
  name: string;
  age: number;
  active: boolean;
}

const initial: Profile = { name: "Ala", age: 30, active: true };

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("FieldErrors<T> to mapa klucz pola → komunikat, każdy klucz opcjonalny", () => {
    type _t = Expect<
      Equal<
        FieldErrors<Profile>,
        { name?: string; age?: string; active?: string }
      >
    >;
    const errors: FieldErrors<Profile> = { age: "za młody" };
    expect(errors.age).toBe("za młody");
  });

  it("FormState trzyma values jako Readonly<T>, a touched jako komplet flag", () => {
    type _values = Expect<
      Equal<FormState<Profile>["values"], Readonly<Profile>>
    >;
    type _touched = Expect<
      Equal<
        FormState<Profile>["touched"],
        Readonly<Record<keyof Profile, boolean>>
      >
    >;
    expect(createForm(initial).touched.name).toBe(false);
  });

  it("values są tylko do odczytu (zapis to błąd typu)", () => {
    const form = createForm(initial);
    const illegal = (): void => {
      // @ts-expect-error values jest Readonly<T> — zapis musi być błędem typu
      form.values.age = 31;
    };
    expect(illegal).toBeTypeOf("function");
  });

  it("setField pilnuje typu wartości przez T[K]", () => {
    const form = createForm(initial);
    const illegal = (): unknown =>
      // @ts-expect-error age jest number — string musi być błędem typu
      setField(form, "age", "31");
    expect(illegal).toBeTypeOf("function");
  });

  it("pick zwraca dokładnie Pick<T, K>, a nie cały obiekt", () => {
    const picked = pick(initial, ["name", "age"]);
    type _t = Expect<Equal<typeof picked, Pick<Profile, "name" | "age">>>;
    expect(picked).toEqual({ name: "Ala", age: 30 });
  });

  it("omit zwraca dokładnie Omit<T, K>", () => {
    const rest = omit(initial, ["age"]);
    type _t = Expect<Equal<typeof rest, Omit<Profile, "age">>>;
    expect(rest).toEqual({ name: "Ala", active: true });
  });

  it("pick odrzuca klucz spoza T", () => {
    const illegal = (): unknown =>
      // @ts-expect-error "nieistnieje" nie jest kluczem Profile
      pick(initial, ["nieistnieje"]);
    expect(illegal).toBeTypeOf("function");
  });
});

describe("createForm", () => {
  it("kopiuje wartości początkowe", () => {
    expect(createForm(initial).values).toEqual(initial);
  });

  it("oznacza wszystkie pola jako nietknięte", () => {
    expect(
      createForm(initial).touched,
      "touched ma mieć komplet kluczy T ustawionych na false — wyprowadź je z initial",
    ).toEqual({ name: false, age: false, active: false });
  });

  it("startuje bez błędów", () => {
    expect(createForm(initial).errors).toEqual({});
  });

  it("nie trzyma referencji do obiektu wejściowego", () => {
    const source = { ...initial };
    const form = createForm(source);
    expect(
      form.values,
      "values ma być kopią — inaczej mutacja wejścia zmieni stan formularza",
    ).not.toBe(source);
  });
});

describe("setField", () => {
  it("podmienia wartość pola", () => {
    const next = setField(createForm(initial), "age", 31);
    expect(next.values.age).toBe(31);
  });

  it("oznacza pole jako dotknięte", () => {
    const next = setField(createForm(initial), "age", 31);
    expect(next.touched).toEqual({ name: false, age: true, active: false });
  });

  it("kasuje błąd edytowanego pola", () => {
    const withError = setErrors(createForm(initial), { age: "za młody" });
    const next = setField(withError, "age", 31);
    expect(
      next.errors.age,
      "edycja pola unieważnia jego błąd walidacji — usuń wpis z mapy błędów",
    ).toBeUndefined();
  });

  it("nie rusza błędów pozostałych pól", () => {
    const withErrors = setErrors(createForm(initial), {
      age: "za młody",
      name: "za krótkie",
    });
    const next = setField(withErrors, "age", 31);
    expect(next.errors.name).toBe("za krótkie");
  });

  it("nie mutuje stanu wejściowego", () => {
    const form = createForm(initial);
    setField(form, "age", 31);
    expect(
      form.values.age,
      "setField ma zwracać NOWY stan — poprzedni musi zostać nietknięty",
    ).toBe(30);
    expect(form.touched.age).toBe(false);
  });
});

describe("setErrors / isDirty", () => {
  it("setErrors podmienia mapę błędów, zostawiając values i touched", () => {
    const form = setField(createForm(initial), "name", "Ola");
    const next = setErrors(form, { name: "zajęte" });
    expect(next.values.name).toBe("Ola");
    expect(next.touched.name).toBe(true);
    expect(next.errors).toEqual({ name: "zajęte" });
  });

  it("isDirty jest false dla świeżego formularza", () => {
    expect(isDirty(createForm(initial))).toBe(false);
  });

  it("isDirty jest true, gdy dotknięto choć jedno pole", () => {
    expect(isDirty(setField(createForm(initial), "active", false))).toBe(true);
  });

  it("isDirty patrzy na touched, nie na wartości", () => {
    const form = setField(createForm(initial), "age", 30);
    expect(
      isDirty(form),
      "pole dotknięte tą samą wartością nadal jest dotknięte — decyduje touched",
    ).toBe(true);
  });
});

describe("pick / omit", () => {
  it("pick bierze tylko wskazane klucze", () => {
    expect(pick(initial, ["name"])).toEqual({ name: "Ala" });
  });

  it("pick nie mutuje źródła", () => {
    const source = { ...initial };
    pick(source, ["name"]);
    expect(source).toEqual(initial);
  });

  it("omit usuwa wskazane klucze", () => {
    expect(omit(initial, ["age", "active"])).toEqual({ name: "Ala" });
  });

  it("omit nie mutuje źródła", () => {
    const source = { ...initial };
    omit(source, ["age"]);
    expect(
      source,
      "omit ma pracować na kopii — usunięcie klucza z oryginału to mutacja wejścia",
    ).toEqual(initial);
  });
});
