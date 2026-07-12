import { describe, it, expect } from "vitest";
import { deepClone, setIn } from "./starter.js";

describe("deepClone", () => {
  it("kopiuje głęboko — mutacja kopii nie dotyka oryginału", () => {
    const orig = { user: { tags: ["a"] } };
    const copy = deepClone(orig);
    copy.user.tags.push("b");
    expect(
      orig.user.tags,
      "structuredClone kopiuje w głąb, więc zagnieżdżona tablica kopii jest niezależna",
    ).toEqual(["a"]);
  });

  it("zachowuje typ Date (inaczej niż JSON.stringify)", () => {
    const copy = deepClone({ created: new Date(2020, 0, 1) });
    expect(
      copy.created instanceof Date,
      "structuredClone zachowuje Date jako Date — JSON zamieniłby go na string",
    ).toBe(true);
  });

  it("zwraca inną referencję najwyższego poziomu", () => {
    const orig = { a: 1 };
    expect(deepClone(orig)).not.toBe(orig);
  });
});

describe("setIn", () => {
  it("ustawia wartość pod zagnieżdżoną ścieżką w nowym obiekcie", () => {
    const state = { user: { name: "Ala", address: { city: "Wwa" } } };
    const next = setIn(state, ["user", "address", "city"], "Kraków");
    expect(next.user.address.city).toBe("Kraków");
  });

  it("nie mutuje oryginału na żadnym poziomie ścieżki", () => {
    const state = { user: { address: { city: "Wwa" } } };
    setIn(state, ["user", "address", "city"], "Kraków");
    expect(
      state.user.address.city,
      "kopiuj każdy obiekt na ścieżce (spread na każdym poziomie) — oryginał ma zostać nietknięty",
    ).toBe("Wwa");
  });

  it("zachowuje rodzeństwo (structural sharing) i kopiuje tylko ścieżkę", () => {
    const state = { user: { name: "Ala", address: { city: "Wwa" } }, other: { x: 1 } };
    const next = setIn(state, ["user", "address", "city"], "Kraków");
    expect(next.user.name, "pola poza ścieżką mają zostać zachowane").toBe("Ala");
    expect(next.other, "gałąź poza ścieżką może być współdzielona referencją").toBe(state.other);
  });
});
