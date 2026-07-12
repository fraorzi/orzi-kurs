import { describe, it, expect } from "vitest";
import { getAge, readAgeOrDefault, withCleanup } from "./starter.js";

describe("getAge", () => {
  it("zwraca wiek, gdy pole age istnieje", () => {
    expect(getAge({ age: 30 })).toBe(30);
    expect(getAge({ age: 0 }), "age === 0 to poprawny wiek, nie brak pola").toBe(0);
  });

  it("rzuca Error z komunikatem 'brak pola: age', gdy age jest undefined", () => {
    expect(
      () => getAge({ name: "Ala" }),
      "brakujące pole age ma zgłaszać wyjątek przez throw, nie zwracać undefined",
    ).toThrow("brak pola: age");
  });

  it("rzucony obiekt jest instancją Error (ma name/message/stack)", () => {
    let thrown;
    try {
      getAge({});
    } catch (e) {
      thrown = e;
    }
    expect(
      thrown instanceof Error,
      "rzucaj obiekty Error, nie stringi — inaczej tracisz name i stack",
    ).toBe(true);
  });
});

describe("readAgeOrDefault", () => {
  it("zwraca wiek, gdy user go ma", () => {
    expect(readAgeOrDefault({ age: 42 })).toBe(42);
  });

  it("łapie błąd z getAge i zwraca 0 zamiast się wywalać", () => {
    expect(
      readAgeOrDefault({}),
      "brak age ma być złapany w catch i zamieniony na wartość domyślną 0",
    ).toBe(0);
  });
});

describe("withCleanup", () => {
  it("zwraca wynik fn i wywołuje cleanup, gdy fn kończy się normalnie", () => {
    let cleaned = false;
    const result = withCleanup(
      () => 42,
      () => {
        cleaned = true;
      },
    );
    expect(result).toBe(42);
    expect(cleaned, "cleanup ma się wykonać także przy sukcesie fn").toBe(true);
  });

  it("wywołuje cleanup RÓWNIEŻ, gdy fn rzuca, a potem przepuszcza błąd dalej", () => {
    let cleaned = false;
    const boom = new Error("boom");
    expect(
      () =>
        withCleanup(
          () => {
            throw boom;
          },
          () => {
            cleaned = true;
          },
        ),
      "błąd z fn ma poleceć dalej — finally sprząta, ale nie połyka wyjątku",
    ).toThrow("boom");
    expect(
      cleaned,
      "cleanup w finally musi wykonać się nawet gdy fn rzuca (finally działa zawsze)",
    ).toBe(true);
  });
});
