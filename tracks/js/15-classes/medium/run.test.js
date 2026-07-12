import { describe, it, expect } from "vitest";
import { Animal, Rabbit } from "./starter.js";

describe("Animal", () => {
  it("startuje z prędkością 0 i biega", () => {
    const animal = new Animal("Rex");
    expect(animal.speed).toBe(0);
    expect(animal.run(8)).toBe("Rex biegnie z prędkością 8");
    expect(animal.speed).toBe(8);
  });

  it("stop zeruje prędkość", () => {
    const animal = new Animal("Rex");
    animal.run(5);
    expect(animal.stop()).toBe("Rex stoi");
    expect(animal.speed).toBe(0);
  });
});

describe("Rabbit", () => {
  it("dziedziczy po Animal i dokłada earLength", () => {
    const rabbit = new Rabbit("Bunia", 10);
    expect(rabbit, "Rabbit ma rozszerzać Animal (extends)").toBeInstanceOf(Animal);
    expect(rabbit.name, "konstruktor musi wywołać super(name), żeby Animal ustawił pola").toBe("Bunia");
    expect(rabbit.earLength).toBe(10);
    expect(rabbit.run(5)).toBe("Bunia biegnie z prędkością 5");
  });

  it("hide działa", () => {
    expect(new Rabbit("Bunia", 10).hide()).toBe("Bunia się chowa");
  });

  it("nadpisane stop używa super.stop() i zeruje prędkość", () => {
    const rabbit = new Rabbit("Bunia", 10);
    rabbit.run(5);
    expect(
      rabbit.stop(),
      "stop podklasy ma sklejać wynik super.stop() z hide() — nie duplikuj logiki zatrzymania",
    ).toBe("Bunia stoi i Bunia się chowa");
    expect(rabbit.speed, "zerowanie prędkości ma się dziać w Animal.stop, wywołanym przez super").toBe(0);
  });
});
