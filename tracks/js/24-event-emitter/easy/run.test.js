import { describe, it, expect } from "vitest";
import { createEmitter } from "./starter.js";

describe("createEmitter — on/emit", () => {
  it("emit woła zapisanego słuchacza z payloadem", () => {
    const bus = createEmitter();
    const received = [];
    bus.on("message", (msg) => received.push(msg));
    bus.emit("message", "a");
    expect(received).toEqual(["a"]);
  });

  it("woła wielu słuchaczy w kolejności zapisania", () => {
    const bus = createEmitter();
    const order = [];
    bus.on("e", () => order.push(1));
    bus.on("e", () => order.push(2));
    bus.emit("e");
    expect(order, "słuchacze mają być wołani w kolejności on() — użyj tablicy, nie Set").toEqual([
      1, 2,
    ]);
  });

  it("emit zdarzenia bez słuchaczy nie rzuca", () => {
    const bus = createEmitter();
    expect(() => bus.emit("brak", 1), "brak słuchaczy to nie błąd — potraktuj jak pustą listę").not.toThrow();
  });
});

describe("createEmitter — off", () => {
  it("off wypisuje słuchacza po referencji", () => {
    const bus = createEmitter();
    const received = [];
    const handler = (msg) => received.push(msg);
    bus.on("message", handler);
    bus.emit("message", "a");
    bus.off("message", handler);
    bus.emit("message", "b");
    expect(received, "po off słuchacz nie może już reagować — usuń go z listy zdarzenia").toEqual([
      "a",
    ]);
  });

  it("off zostawia pozostałych słuchaczy", () => {
    const bus = createEmitter();
    const received = [];
    const a = () => received.push("a");
    const b = () => received.push("b");
    bus.on("e", a);
    bus.on("e", b);
    bus.off("e", a);
    bus.emit("e");
    expect(received).toEqual(["b"]);
  });
});
