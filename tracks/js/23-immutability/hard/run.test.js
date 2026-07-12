import { describe, it, expect } from "vitest";
import { deepFreeze } from "./starter.js";

describe("deepFreeze", () => {
  it("zamraża obiekt najwyższego poziomu i zwraca go", () => {
    const obj = { a: 1 };
    const result = deepFreeze(obj);
    expect(result, "deepFreeze zamraża w miejscu — ma zwrócić ten sam obiekt").toBe(obj);
    expect(Object.isFrozen(obj)).toBe(true);
  });

  it("zamraża zagnieżdżone obiekty i tablice (freeze nie jest płytki)", () => {
    const config = deepFreeze({ api: { url: "x", retries: [1, 2, 3] } });
    expect(
      Object.isFrozen(config.api),
      "zagnieżdżony obiekt musi być zamrożony — rekurencyjnie wejdź w każdą właściwość",
    ).toBe(true);
    expect(Object.isFrozen(config.api.retries), "zagnieżdżona tablica też ma być zamrożona").toBe(
      true,
    );
  });

  it("zapis na dowolnym poziomie rzuca TypeError (strict)", () => {
    const config = deepFreeze({ api: { url: "x", retries: [1, 2, 3] } });
    expect(() => {
      config.api.url = "y";
    }, "zapis do zamrożonej właściwości w trybie strict ma rzucać TypeError").toThrow(TypeError);
    expect(() => config.api.retries.push(4), "push na zamrożonej tablicy ma rzucać").toThrow(
      TypeError,
    );
  });

  it("radzi sobie z cyklem (nie zapętla się)", () => {
    const a = { name: "a" };
    a.self = a; // cykl
    expect(() => deepFreeze(a), "pomijaj już zamrożone wartości, by cykl nie dał nieskończonej rekurencji").not.toThrow();
    expect(Object.isFrozen(a)).toBe(true);
  });
});
