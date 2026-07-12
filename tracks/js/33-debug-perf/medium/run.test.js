import { describe, it, expect } from "vitest";
import { subscribeAll } from "./starter.js";

function makeEmitter() {
  const events = new Map();
  return {
    on(event, handler) {
      if (!events.has(event)) events.set(event, []);
      events.get(event).push(handler);
    },
    off(event, handler) {
      const list = events.get(event);
      if (list) events.set(event, list.filter((h) => h !== handler));
    },
    emit(event) {
      for (const h of [...(events.get(event) ?? [])]) h();
    },
    listenerCount(event) {
      return events.get(event)?.length ?? 0;
    },
  };
}

describe("subscribeAll — rejestracja", () => {
  it("rejestruje handler dla każdego zdarzenia z listy", () => {
    const emitter = makeEmitter();
    subscribeAll(emitter, ["open", "close"], () => {});
    expect(emitter.listenerCount("open")).toBe(1);
    expect(emitter.listenerCount("close")).toBe(1);
  });
});

describe("subscribeAll — wypisanie", () => {
  it("unsubscribe wypisuje handler ze WSZYSTKICH zdarzeń", () => {
    const emitter = makeEmitter();
    const unsubscribe = subscribeAll(emitter, ["open", "close"], () => {});
    unsubscribe();
    expect(emitter.listenerCount("open")).toBe(0);
    expect(
      emitter.listenerCount("close"),
      "unsubscribe musi cofnąć dokładnie to, co zrobił subscribe — wypisz z każdego zdarzenia, nie tylko z pierwszego",
    ).toBe(0);
  });

  it("powtarzane cykle subscribe/unsubscribe nie zostawiają słuchaczy (brak wycieku)", () => {
    const emitter = makeEmitter();
    for (let i = 0; i < 100; i++) {
      const unsubscribe = subscribeAll(emitter, ["open", "close"], () => {});
      unsubscribe();
    }
    expect(emitter.listenerCount("open")).toBe(0);
    expect(
      emitter.listenerCount("close"),
      "po 100 cyklach zostało 100 słuchaczy 'close' — każdy trzyma swoje domknięcie przy życiu",
    ).toBe(0);
  });

  it("po unsubscribe handler nie jest już wywoływany", () => {
    const emitter = makeEmitter();
    let calls = 0;
    const unsubscribe = subscribeAll(emitter, ["open", "close"], () => {
      calls += 1;
    });
    unsubscribe();
    emitter.emit("open");
    emitter.emit("close");
    expect(calls, "wypisany handler nie może reagować na żadne ze zdarzeń").toBe(0);
  });
});
