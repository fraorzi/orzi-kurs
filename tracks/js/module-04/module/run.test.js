import { describe, it, expect } from "vitest";
import { createStore, createHistory } from "./src/index.js";

describe("createHistory — undo/redo", () => {
  it("push przesuwa present i pozwala cofnąć oraz ponowić", () => {
    const h = createHistory("a");
    expect(h.present).toBe("a");
    expect(h.canUndo).toBe(false);
    expect(h.canRedo).toBe(false);

    h.push("b");
    h.push("c");
    expect(h.present).toBe("c");
    expect(h.canUndo).toBe(true);

    expect(h.undo()).toBe("b");
    expect(h.undo()).toBe("a");
    expect(h.canUndo).toBe(false);
    expect(h.canRedo).toBe(true);

    expect(h.redo()).toBe("b");
    expect(h.present).toBe("b");
  });

  it("nowy push kasuje możliwość redo (nowa gałąź)", () => {
    const h = createHistory("a");
    h.push("b");
    h.undo(); // present = "a", future = ["b"]
    expect(h.canRedo).toBe(true);
    h.push("c"); // nowa gałąź
    expect(h.canRedo).toBe(false);
    expect(h.present).toBe("c");
  });

  it("undo/redo na krańcach nie psują present", () => {
    const h = createHistory("a");
    expect(h.undo()).toBe("a");
    expect(h.redo()).toBe("a");
    expect(h.present).toBe("a");
  });
});

describe("createStore — odczyt i niemutowalny zapis", () => {
  it("get/getState czytają stan", () => {
    const store = createStore({ a: 1, b: 2 });
    expect(store.get("a")).toBe(1);
    expect(store.getState()).toEqual({ a: 1, b: 2 });
  });

  it("set jest niemutowalny — nowy obiekt, stary nietknięty", () => {
    const store = createStore({ a: 1 });
    const before = store.getState();
    store.set("a", 2);
    const after = store.getState();
    expect(after).not.toBe(before);
    expect(before).toEqual({ a: 1 });
    expect(after).toEqual({ a: 2 });
  });

  it("update liczy nową wartość z bieżącej", () => {
    const store = createStore({ n: 10 });
    store.update("n", (v) => v + 5);
    expect(store.get("n")).toBe(15);
  });
});

describe("createStore — subskrypcje (pub/sub)", () => {
  it("subscribe powiadamia bieżącym stanem po zmianie", () => {
    const store = createStore({ a: 1 });
    const seen = [];
    store.subscribe((state) => seen.push(state));
    store.set("a", 2);
    expect(seen).toEqual([{ a: 2 }]);
  });

  it("subscribe zwraca funkcję odsubskrybowującą", () => {
    const store = createStore({ a: 1 });
    let count = 0;
    const off = store.subscribe(() => {
      count += 1;
    });
    store.set("a", 2);
    off();
    store.set("a", 3);
    expect(count).toBe(1);
  });

  it("brak realnej zmiany (===) ⇒ brak powiadomienia i brak wpisu w historii", () => {
    const store = createStore({ a: 1 });
    let count = 0;
    store.subscribe(() => {
      count += 1;
    });
    store.set("a", 1);
    store.update("a", (v) => v);
    expect(count).toBe(0);
    expect(store.canUndo).toBe(false);
  });
});

describe("createStore — undo/redo powiązane z historią i pub/sub", () => {
  it("undo/redo przywracają stan i powiadamiają subskrybentów", () => {
    const store = createStore({ count: 0 });
    const seen = [];
    store.subscribe((state) => seen.push(state.count));

    store.update("count", (n) => n + 1); // 1
    store.update("count", (n) => n + 1); // 2
    expect(store.get("count")).toBe(2);

    store.undo();
    expect(store.get("count")).toBe(1);
    store.undo();
    expect(store.get("count")).toBe(0);

    store.redo();
    expect(store.get("count")).toBe(1);

    expect(seen).toEqual([1, 2, 1, 0, 1]);
  });

  it("canUndo/canRedo odzwierciedlają stan historii", () => {
    const store = createStore({ a: 0 });
    expect(store.canUndo).toBe(false);
    expect(store.canRedo).toBe(false);

    store.set("a", 1);
    expect(store.canUndo).toBe(true);
    expect(store.canRedo).toBe(false);

    store.undo();
    expect(store.canUndo).toBe(false);
    expect(store.canRedo).toBe(true);

    store.set("a", 9); // nowa gałąź kasuje redo
    expect(store.canRedo).toBe(false);
  });
});
