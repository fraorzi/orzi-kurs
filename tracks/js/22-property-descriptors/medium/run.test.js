import { describe, it, expect } from "vitest";
import { createUser, createTemperature } from "./starter.js";

describe("createUser — akcesor fullName", () => {
  it("getter składa imię i nazwisko", () => {
    expect(createUser("Ala", "Kowalska").fullName).toBe("Ala Kowalska");
  });

  it("setter rozbija fullName na name i surname", () => {
    const u = createUser("Ala", "Kowalska");
    u.fullName = "Jan Nowak";
    expect(u.name, "setter ma zaktualizować name z pierwszego słowa").toBe("Jan");
    expect(u.surname).toBe("Nowak");
  });

  it("getter odzwierciedla zmiany pól po ustawieniu przez setter", () => {
    const u = createUser("Ala", "Kowalska");
    u.fullName = "Ewa Lis";
    expect(
      u.fullName,
      "getter ma czytać aktualne this.name/this.surname, nie zapamiętaną wartość",
    ).toBe("Ewa Lis");
  });
});

describe("createTemperature — akcesor fahrenheit", () => {
  it("getter przelicza Celsjusze na Fahrenheity", () => {
    expect(createTemperature(100).fahrenheit).toBe(212);
    expect(createTemperature(0).fahrenheit).toBe(32);
  });

  it("setter przelicza Fahrenheity z powrotem na Celsjusze", () => {
    const t = createTemperature(100);
    t.fahrenheit = 32;
    expect(t.celsius, "setter fahrenheit ma zapisać wynik (F-32)*5/9 do celsius").toBe(0);
  });

  it("odczyt fahrenheit po zmianie celsius jest aktualny", () => {
    const t = createTemperature(0);
    t.celsius = 100;
    expect(t.fahrenheit).toBe(212);
  });
});
