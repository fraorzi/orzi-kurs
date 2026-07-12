import { describe, it, expect } from "vitest";
import { User } from "./starter.js";

describe("User", () => {
  it("sayHi wita po imieniu", () => {
    expect(new User("Ala").sayHi()).toBe("Cześć, Ala");
  });

  it("getter name zwraca imię", () => {
    expect(new User("Ala").name).toBe("Ala");
  });

  it("setter waliduje długość imienia", () => {
    const user = new User("Ala");
    expect(() => {
      user.name = "X";
    }, "imię krótsze niż 2 znaki ma być odrzucone RangeErrorem w setterze").toThrow(RangeError);
    user.name = "Ola";
    expect(user.sayHi(), "po udanym przypisaniu setter ma zaktualizować stan").toBe("Cześć, Ola");
  });

  it("konstruktor też waliduje (przechodzi przez setter)", () => {
    expect(
      () => new User("A"),
      "this.name = name w konstruktorze uruchamia setter — walidacja działa też przy tworzeniu",
    ).toThrow(RangeError);
  });

  it("metody są współdzielone przez prototyp", () => {
    expect(new User("Ala").sayHi, "metody klasy żyją na User.prototype, nie na instancjach").toBe(
      new User("Ola").sayHi,
    );
  });

  it("statyczna fabryka createGuest", () => {
    const guest = User.createGuest();
    expect(guest).toBeInstanceOf(User);
    expect(guest.name).toBe("Gość");
    expect(
      Object.hasOwn(User.prototype, "createGuest"),
      "createGuest ma być metodą STATYCZNĄ — na klasie, nie na prototypie instancji",
    ).toBe(false);
  });
});
