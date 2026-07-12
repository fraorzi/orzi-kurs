import { describe, it, expect } from "vitest";
import { LinkedList } from "./starter.js";

describe("LinkedList", () => {
  it("push łańcuchuje i zlicza rozmiar", () => {
    const list = new LinkedList();
    const returned = list.push(1).push(2).push(3);
    expect(returned, "push ma zwracać this, by dało się łańcuchować").toBe(list);
    expect(list.size).toBe(3);
  });

  it("jest iterowalna spreadem w kolejności dodawania", () => {
    const list = new LinkedList();
    list.push("a").push("b").push("c");
    expect(
      [...list],
      "iterator ma przechodzić od głowy do ogona, więc kolejność = kolejność push",
    ).toEqual(["a", "b", "c"]);
  });

  it("działa z for..of, Array.from i destrukturyzacją", () => {
    const list = new LinkedList();
    list.push(10).push(20).push(30);

    const collected = [];
    for (const v of list) collected.push(v);
    expect(collected).toEqual([10, 20, 30]);

    expect(Array.from(list)).toEqual([10, 20, 30]);

    const [first, second] = list;
    expect([first, second]).toEqual([10, 20]);
  });

  it("pusta lista iteruje się do pustej tablicy", () => {
    expect([...new LinkedList()]).toEqual([]);
    expect(new LinkedList().size).toBe(0);
  });

  it("iteracja jest powtarzalna (każde przejście od głowy)", () => {
    const list = new LinkedList();
    list.push(1).push(2);
    expect([...list]).toEqual([1, 2]);
    expect(
      [...list],
      "drugie przejście dało inny wynik — wskaźnik węzła trzymaj w iteratorze, nie w instancji listy",
    ).toEqual([1, 2]);
  });
});
