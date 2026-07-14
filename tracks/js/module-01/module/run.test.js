import { describe, it, expect } from "vitest";
import { createEmitter, createStore } from "./src/index.js";

describe("createEmitter — pub/sub", () => {
  it("woła słuchaczy w kolejności dodania i przekazuje wszystkie argumenty", () => {
    const em = createEmitter();
    const log = [];
    em.on("x", (a, b) => log.push(["first", a, b]));
    em.on("x", (a, b) => log.push(["second", a, b]));
    em.emit("x", 1, 2);
    expect(log).toEqual([
      ["first", 1, 2],
      ["second", 1, 2],
    ]);
  });

  it("emit zwraca true gdy byli słuchacze, false gdy nie", () => {
    const em = createEmitter();
    em.on("x", () => {});
    expect(em.emit("x"), "emit z aktywnym słuchaczem ma zwrócić true").toBe(true);
    expect(em.emit("brak"), "emit bez słuchaczy ma zwrócić false").toBe(false);
  });

  it("off usuwa konkretnego słuchacza", () => {
    const em = createEmitter();
    let count = 0;
    const handler = () => {
      count += 1;
    };
    em.on("x", handler);
    em.emit("x");
    em.off("x", handler);
    em.emit("x");
    expect(count).toBe(1);
  });

  it("on zwraca funkcję odsubskrybowującą", () => {
    const em = createEmitter();
    let count = 0;
    const unsubscribe = em.on("x", () => {
      count += 1;
    });
    expect(typeof unsubscribe, "on ma zwrócić funkcję do wypisania słuchacza").toBe("function");
    em.emit("x");
    unsubscribe();
    em.emit("x");
    expect(count).toBe(1);
  });
});

describe("createStore — odczyt i zapis", () => {
  it("get czyta pola stanu początkowego, getState zwraca cały obiekt", () => {
    const store = createStore({ a: 1, b: 2 });
    expect(store.get("a")).toBe(1);
    expect(store.getState()).toEqual({ a: 1, b: 2 });
  });

  it("set aktualizuje pole", () => {
    const store = createStore({ a: 1 });
    store.set("a", 9);
    expect(store.get("a")).toBe(9);
  });

  it("set jest niemutowalny — tworzy nowy obiekt stanu, nie mutuje poprzedniego", () => {
    const store = createStore({ a: 1 });
    const before = store.getState();
    store.set("a", 2);
    const after = store.getState();
    expect(after, "setState ma podmienić referencję na nowy obiekt").not.toBe(before);
    expect(before, "poprzedni obiekt stanu ma pozostać niezmieniony").toEqual({ a: 1 });
  });

  it("update stosuje funkcję do bieżącej wartości pola", () => {
    const store = createStore({ n: 10 });
    store.update("n", (v) => v + 5);
    expect(store.get("n")).toBe(15);
  });
});

describe("createStore — subskrypcje (przez emitter)", () => {
  it("subscribe powiadamia po set z (nextState, prevState, changedKey)", () => {
    const store = createStore({ a: 1 });
    const calls = [];
    store.subscribe((next, prev, key) => calls.push({ next, prev, key }));
    store.set("a", 2);
    expect(calls).toHaveLength(1);
    expect(calls[0].key).toBe("a");
    expect(calls[0].next).toEqual({ a: 2 });
    expect(calls[0].prev).toEqual({ a: 1 });
  });

  it("subscribe zwraca funkcję odsubskrybowującą", () => {
    const store = createStore({ a: 1 });
    let count = 0;
    const unsubscribe = store.subscribe(() => {
      count += 1;
    });
    store.set("a", 2);
    unsubscribe();
    store.set("a", 3);
    expect(count).toBe(1);
  });

  it("set/update nie powiadamiają, gdy wartość się nie zmienia (===)", () => {
    const store = createStore({ a: 1 });
    let count = 0;
    store.subscribe(() => {
      count += 1;
    });
    store.set("a", 1);
    store.update("a", (v) => v);
    expect(count, "brak realnej zmiany ⇒ brak zdarzenia change").toBe(0);
  });

  it("update też powiadamia subskrybentów", () => {
    const store = createStore({ n: 0 });
    const seen = [];
    store.subscribe((next) => seen.push(next.n));
    store.update("n", (v) => v + 1);
    store.update("n", (v) => v + 1);
    expect(seen).toEqual([1, 2]);
  });
});
