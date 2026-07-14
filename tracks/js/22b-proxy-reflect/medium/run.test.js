import { describe, it, expect } from "vitest";
import { withValidation } from "./starter.js";

const rules = { age: (v) => Number.isInteger(v) && v >= 0 && v <= 150 };

describe("withValidation", () => {
  it("pozwala na poprawny zapis", () => {
    const user = withValidation({ age: 30 }, rules);
    user.age = 40;
    expect(user.age).toBe(40);
  });

  it("przepuszcza klucze bez reguły", () => {
    const user = withValidation({ age: 30 }, rules);
    user.name = "Ala";
    expect(user.name, "brak reguły dla 'name' → zapis przechodzi").toBe("Ala");
  });

  it("rzuca TypeError dla wartości łamiącej regułę", () => {
    const user = withValidation({ age: 30 }, rules);
    expect(() => {
      user.age = -5;
    }, "age = -5 łamie regułę → set ma rzucić TypeError").toThrow(TypeError);
  });

  it("nieudany zapis nie zmienia wartości", () => {
    const user = withValidation({ age: 30 }, rules);
    user.age = 40;
    try {
      user.age = 999;
    } catch {
      // oczekiwany TypeError
    }
    expect(user.age, "rzucenie w set przerywa zapis przed Reflect.set — zostaje 40").toBe(40);
  });

  it("komunikat błędu wskazuje klucz", () => {
    const user = withValidation({ age: 30 }, rules);
    expect(() => {
      user.age = 3.5;
    }).toThrow(/age/);
  });
});
