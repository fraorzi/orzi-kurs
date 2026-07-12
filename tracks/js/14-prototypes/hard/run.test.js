import { describe, it, expect } from "vitest";
import { myInstanceOf, getDefiningObject, listProps } from "./starter.js";

describe("myInstanceOf", () => {
  class Animal {}
  class Rabbit extends Animal {}

  it("wykrywa bezpośrednią i pośrednią instancję", () => {
    const r = new Rabbit();
    expect(myInstanceOf(r, Rabbit)).toBe(true);
    expect(
      myInstanceOf(r, Animal),
      "Animal.prototype jest dalej w łańcuchu — wspinaczka nie może zatrzymać się na pierwszym poziomie",
    ).toBe(true);
    expect(myInstanceOf(r, Date)).toBe(false);
  });

  it("prymitywy nigdy nie są instancją", () => {
    expect(myInstanceOf(42, Number), "42 to prymityw — instanceof zwraca false bez boxingu").toBe(false);
    expect(myInstanceOf("a", String)).toBe(false);
    expect(myInstanceOf(null, Object)).toBe(false);
    expect(myInstanceOf(undefined, Object)).toBe(false);
  });

  it("działa dla wbudowanych typów referencyjnych", () => {
    expect(myInstanceOf([], Array)).toBe(true);
    expect(myInstanceOf([], Object), "Array.prototype dziedziczy z Object.prototype").toBe(true);
    expect(myInstanceOf(() => 0, Function)).toBe(true);
  });
});

describe("getDefiningObject", () => {
  const base = { x: 1 };
  const mid = Object.create(base);
  const top = Object.create(mid);

  it("znajduje obiekt definiujący właściwość", () => {
    expect(getDefiningObject(top, "x")).toBe(base);
    expect(getDefiningObject(base, "x"), "obiekt startowy też się liczy — sprawdzaj od niego, nie od prototypu").toBe(base);
  });

  it("zwraca null dla nieistniejącej właściwości", () => {
    expect(getDefiningObject(top, "y")).toBe(null);
  });

  it("właściwość przesłonięta wskazuje na bliższy obiekt", () => {
    const child = Object.create(base);
    child.x = 2;
    expect(getDefiningObject(child, "x"), "własna kopia przesłania prototypową — wygrywa pierwszy obiekt z WŁASNYM kluczem").toBe(child);
  });
});

describe("listProps", () => {
  it("dzieli klucze na własne i odziedziczone", () => {
    const animal = { eats: true, alive: true };
    const rabbit = Object.create(animal);
    rabbit.jumps = true;
    rabbit.eats = false;
    expect(listProps(rabbit)).toEqual({
      own: ["eats", "jumps"],
      inherited: ["alive"],
    });
  });

  it("klucz przesłonięty własnym nie trafia do inherited", () => {
    const proto = { a: 1 };
    const obj = Object.create(proto);
    obj.a = 2;
    expect(
      listProps(obj).inherited,
      "for..in zobaczy 'a' tylko raz (własne przesłania) — ale gdyby zbierać z getPrototypeOf ręcznie, trzeba odfiltrować duplikaty",
    ).toEqual([]);
  });

  it("nie zbiera nic z Object.prototype i działa dla wielu poziomów", () => {
    const l1 = { deep: 1 };
    const l2 = Object.create(l1);
    l2.mid = 2;
    const l3 = Object.create(l2);
    expect(listProps(l3)).toEqual({ own: [], inherited: ["deep", "mid"] });
  });
});
