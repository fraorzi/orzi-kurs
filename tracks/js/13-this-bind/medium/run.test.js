import { describe, it, expect } from "vitest";
import { partial, user, callTwice, greetTwiceBroken } from "./starter.js";

describe("partial", () => {
  it("dokleja preset z przodu argumentów", () => {
    const add = (a, b, c) => a + b + c;
    const add5 = partial(add, 5);
    expect(add5(1, 2)).toBe(8);
    const add56 = partial(add, 5, 6);
    expect(add56(9)).toBe(20);
  });

  it("przekazuje this z miejsca wywołania wrappera", () => {
    const person = {
      name: "Ala",
      greet: partial(function (greeting, punct) {
        return `${greeting}, ${this.name}${punct}`;
      }, "Cześć"),
    };
    expect(
      person.greet("!"),
      "wrapper wywołany jako person.greet(...) ma this = person — użyj zwykłej funkcji (nie arrow) i fn.call(this, ...)",
    ).toBe("Cześć, Ala!");
  });
});

describe("greetTwiceBroken (naprawa utraty this)", () => {
  it("zwraca poprawne powitanie dwa razy", () => {
    expect(
      greetTwiceBroken(),
      "callTwice(user.greet) przekazuje SAMĄ funkcję bez obiektu — this ginie; przekaż wersję związaną (bind) albo arrow wywołującą przez kropkę",
    ).toEqual(["Cześć, Ala", "Cześć, Ala"]);
  });

  it("user i callTwice pozostają nietknięte", () => {
    expect(user.greet.call({ name: "Bob" }), "metoda user.greet ma zostać w oryginalnej formie").toBe("Cześć, Bob");
    const fn = () => "x";
    expect(callTwice(fn), "callTwice ma dalej wywoływać fn dwa razy bez żadnego kontekstu").toEqual(["x", "x"]);
  });
});
