import { describe, it, expect } from "vitest";
import { EventEmitter } from "./starter.js";

describe("EventEmitter — on/emit", () => {
  it("woła słuchaczy w kolejności i przekazuje argumenty", () => {
    const ee = new EventEmitter();
    const log = [];
    ee.on("x", (n) => log.push(n));
    ee.on("x", (n) => log.push(n * 2));
    ee.emit("x", 5);
    expect(log).toEqual([5, 10]);
  });

  it("on zwraca this (łańcuchowanie)", () => {
    const ee = new EventEmitter();
    expect(ee.on("a", () => {}), "on ma zwracać this, by dało się łańcuchować on().on()").toBe(ee);
  });

  it("emit zwraca true, gdy byli słuchacze, false gdy nie", () => {
    const ee = new EventEmitter();
    ee.on("x", () => {});
    expect(ee.emit("x"), "emit ma zwrócić true przy istniejących słuchaczach").toBe(true);
    expect(ee.emit("brak"), "emit bez słuchaczy ma zwrócić false").toBe(false);
  });
});

describe("EventEmitter — once", () => {
  it("słuchacz once reaguje raz i znika z listenerCount", () => {
    const ee = new EventEmitter();
    let count = 0;
    ee.once("y", () => {
      count += 1;
    });
    ee.emit("y");
    ee.emit("y");
    expect(count).toBe(1);
    expect(ee.listenerCount("y"), "po wypaleniu once liczba słuchaczy ma spaść do 0").toBe(0);
  });
});

describe("EventEmitter — off / listenerCount / removeAllListeners", () => {
  it("off usuwa słuchacza po referencji", () => {
    const ee = new EventEmitter();
    const h = () => {};
    ee.on("x", h);
    expect(ee.listenerCount("x")).toBe(1);
    ee.off("x", h);
    expect(ee.listenerCount("x")).toBe(0);
  });

  it("removeAllListeners(event) czyści jedno zdarzenie", () => {
    const ee = new EventEmitter();
    ee.on("x", () => {}).on("x", () => {});
    ee.removeAllListeners("x");
    expect(ee.listenerCount("x")).toBe(0);
  });

  it("removeAllListeners() bez argumentu czyści wszystkie zdarzenia", () => {
    const ee = new EventEmitter();
    ee.on("a", () => {});
    ee.on("b", () => {});
    ee.removeAllListeners();
    expect(ee.listenerCount("a")).toBe(0);
    expect(ee.listenerCount("b"), "bez argumentu removeAllListeners czyści wszystko").toBe(0);
  });

  it("iteracja po kopii — once nie gubi kolejnych słuchaczy podczas emit", () => {
    const ee = new EventEmitter();
    const log = [];
    ee.once("e", () => log.push("a"));
    ee.on("e", () => log.push("b"));
    ee.emit("e");
    expect(
      log,
      "usuwanie once w trakcie emit nie może przestawić indeksów — iteruj po kopii listy",
    ).toEqual(["a", "b"]);
  });
});
