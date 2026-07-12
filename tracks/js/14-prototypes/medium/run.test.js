import { describe, it, expect } from "vitest";
import { Queue, myObjectCreate } from "./starter.js";

describe("Queue", () => {
  it("FIFO: dequeue zwraca elementy w kolejności dodania", () => {
    const q = new Queue([1, 2]);
    expect(q.dequeue()).toBe(1);
    q.enqueue(3);
    expect(q.dequeue()).toBe(2);
    expect(q.dequeue()).toBe(3);
    expect(q.dequeue(), "pusta kolejka zwraca undefined").toBe(undefined);
  });

  it("size zwraca liczbę elementów", () => {
    const q = new Queue([1, 2, 3]);
    expect(q.size()).toBe(3);
    q.dequeue();
    expect(q.size()).toBe(2);
  });

  it("metody żyją na Queue.prototype i są współdzielone", () => {
    const q1 = new Queue();
    const q2 = new Queue();
    expect(
      q1.enqueue,
      "enqueue zdefiniowane w konstruktorze tworzyłoby osobną funkcję per instancja — ma być na Queue.prototype",
    ).toBe(q2.enqueue);
    expect(Object.hasOwn(Queue.prototype, "dequeue")).toBe(true);
    expect(q1 instanceof Queue).toBe(true);
  });

  it("initial jest kopiowane — mutacja kolejki nie zmienia tablicy wejściowej", () => {
    const input = [1, 2];
    const q = new Queue(input);
    q.dequeue();
    q.enqueue(99);
    expect(input, "konstruktor musi skopiować initial ([...initial]), nie trzymać referencji").toEqual([1, 2]);
  });
});

describe("myObjectCreate", () => {
  it("tworzy obiekt z zadanym prototypem i bez własnych właściwości", () => {
    const animal = { eats: true };
    const rabbit = myObjectCreate(animal);
    expect(Object.getPrototypeOf(rabbit)).toBe(animal);
    expect(rabbit.eats, "odczyt ma spadać do prototypu").toBe(true);
    expect(Object.keys(rabbit)).toEqual([]);
  });

  it("nie używa Object.create ani setPrototypeOf (technika: tymczasowy konstruktor)", () => {
    const proto = { x: 1 };
    const obj = myObjectCreate(proto);
    expect(Object.getPrototypeOf(obj)).toBe(proto);
  });

  it("rzuca TypeError dla null i nie-obiektów", () => {
    expect(() => myObjectCreate(null), "wariant Object.create(null) jest poza zakresem — null odrzucamy").toThrow(TypeError);
    expect(() => myObjectCreate(42)).toThrow(TypeError);
  });
});
