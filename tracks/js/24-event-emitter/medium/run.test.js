import { describe, it, expect } from "vitest";
import { createEmitter } from "./starter.js";

describe("on — unsubscribe", () => {
  it("on zwraca funkcję, która wypisuje słuchacza", () => {
    const bus = createEmitter();
    const calls = [];
    const unsub = bus.on("e", () => calls.push(1));
    expect(typeof unsub, "on ma zwracać funkcję unsubscribe").toBe("function");
    bus.emit("e");
    unsub();
    bus.emit("e");
    expect(calls, "po wywołaniu unsubscribe słuchacz nie może już reagować").toEqual([1]);
  });
});

describe("emit — wiele argumentów", () => {
  it("przekazuje wszystkie argumenty słuchaczom", () => {
    const bus = createEmitter();
    let result;
    bus.on("sum", (a, b) => {
      result = a + b;
    });
    bus.emit("sum", 2, 3);
    expect(result, "emit ma przekazać wszystkie argumenty (...args), nie tylko pierwszy").toBe(5);
  });
});

describe("once", () => {
  it("słuchacz once reaguje tylko na pierwszy emit", () => {
    const bus = createEmitter();
    let count = 0;
    bus.once("ready", () => {
      count += 1;
    });
    bus.emit("ready");
    bus.emit("ready");
    bus.emit("ready");
    expect(count, "once ma wypisać słuchacza po pierwszym wywołaniu").toBe(1);
  });

  it("once dostaje argumenty z emit", () => {
    const bus = createEmitter();
    let received;
    bus.once("data", (x) => {
      received = x;
    });
    bus.emit("data", 42);
    expect(received).toBe(42);
  });

  it("można wypisać once-słuchacza przez off zanim wypali", () => {
    const bus = createEmitter();
    let count = 0;
    const handler = () => {
      count += 1;
    };
    bus.once("e", handler);
    bus.off("e", handler);
    bus.emit("e");
    expect(count, "off po referencji ma usuwać także słuchacza zarejestrowanego przez once").toBe(0);
  });
});
