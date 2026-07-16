import { describe, it, expect, vi } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { EventBus } from "./starter";

// Uwaga: mapa zdarzeń musi być aliasem (`type`), nie `interface` — interfejs nie ma
// niejawnej index signature, więc nie spełnia ograniczenia Record<string, unknown>.
type AppEvents = {
  login: { userId: number };
  logout: null;
  error: { message: string; code: number };
};

function makeBus(): EventBus<AppEvents> {
  return new EventBus<AppEvents>();
}

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("handler dostaje ładunek dokładnie z mapy zdarzeń", () => {
    const bus = makeBus();
    let seen: unknown = null;
    bus.on("login", (payload) => {
      type _t = Expect<Equal<typeof payload, { userId: number }>>;
      seen = payload;
    });
    bus.emit("login", { userId: 7 });
    expect(seen).toEqual({ userId: 7 });
  });

  it("emit z ładunkiem złego typu to błąd kompilacji", () => {
    const bus = makeBus();
    const illegal = (): number =>
      // @ts-expect-error userId jest number, nie string
      bus.emit("login", { userId: "7" });
    expect(illegal).toBeTypeOf("function");
  });

  it("nieznane zdarzenie to błąd kompilacji", () => {
    const bus = makeBus();
    const illegal = (): number =>
      // @ts-expect-error "register" nie występuje w AppEvents
      bus.emit("register", null);
    expect(illegal).toBeTypeOf("function");
  });

  it("on zwraca funkcję odpinającą", () => {
    const bus = makeBus();
    const unsubscribe = bus.on("logout", () => {});
    type _t = Expect<Equal<typeof unsubscribe, () => void>>;
    expect(unsubscribe).toBeTypeOf("function");
  });

  it("mapa zdarzeń musi spełniać ograniczenie EventMap", () => {
    const bus = new EventBus<{ tick: number }>();
    expect(bus.emit("tick", 1)).toBe(0);
  });
});

describe("on / emit", () => {
  it("emit woła zarejestrowany handler z ładunkiem", () => {
    const bus = makeBus();
    const handler = vi.fn();
    bus.on("login", handler);

    bus.emit("login", { userId: 7 });
    expect(handler).toHaveBeenCalledWith({ userId: 7 });
  });

  it("emit zwraca liczbę wywołanych handlerów", () => {
    const bus = makeBus();
    bus.on("login", () => {});
    bus.on("login", () => {});
    expect(bus.emit("login", { userId: 1 })).toBe(2);
  });

  it("emit bez handlerów zwraca 0 i nie rzuca", () => {
    expect(
      makeBus().emit("logout", null),
      "zdarzenie bez słuchaczy to normalna sytuacja, nie błąd",
    ).toBe(0);
  });

  it("handlery odpalają się w kolejności rejestracji", () => {
    const bus = new EventBus<{ tick: number }>();
    const log: string[] = [];
    bus.on("tick", (n) => log.push(`a${n}`));
    bus.on("tick", (n) => log.push(`c${n}`));

    bus.emit("tick", 1);
    expect(log).toEqual(["a1", "c1"]);
  });

  it("ten sam handler zapisany dwa razy odpala się dwa razy", () => {
    const bus = makeBus();
    const handler = vi.fn();
    bus.on("login", handler);
    bus.on("login", handler);

    bus.emit("login", { userId: 1 });
    expect(
      handler,
      "on nie deduplikuje — dwa zapisy to dwa wywołania (jak w Node EventEmitter)",
    ).toHaveBeenCalledTimes(2);
  });

  it("handlery różnych zdarzeń nie mieszają się", () => {
    const bus = makeBus();
    const onLogin = vi.fn();
    bus.on("login", onLogin);

    bus.emit("logout", null);
    expect(onLogin).not.toHaveBeenCalled();
  });
});

describe("off i funkcja odpinająca", () => {
  it("unsubscribe odpina handler", () => {
    const bus = makeBus();
    const handler = vi.fn();
    const unsubscribe = bus.on("login", handler);

    unsubscribe();
    expect(bus.emit("login", { userId: 1 })).toBe(0);
    expect(handler).not.toHaveBeenCalled();
  });

  it("unsubscribe wywołany dwa razy nic nie psuje", () => {
    const bus = makeBus();
    const unsubscribe = bus.on("login", () => {});
    unsubscribe();
    expect(() => unsubscribe()).not.toThrow();
  });

  it("off zwraca true tylko wtedy, gdy coś odpiął", () => {
    const bus = makeBus();
    const handler = vi.fn();
    bus.on("login", handler);

    expect([bus.off("login", handler), bus.off("login", handler)]).toEqual([
      true,
      false,
    ]);
  });

  it("off na zdarzeniu bez handlerów zwraca false", () => {
    expect(makeBus().off("error", () => {})).toBe(false);
  });
});

describe("once", () => {
  it("odpala się najwyżej raz", () => {
    const bus = new EventBus<{ tick: number }>();
    const handler = vi.fn();
    bus.once("tick", handler);

    bus.emit("tick", 1);
    bus.emit("tick", 2);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("dostaje ładunek pierwszego zdarzenia", () => {
    const bus = new EventBus<{ tick: number }>();
    const handler = vi.fn();
    bus.once("tick", handler);

    bus.emit("tick", 41);
    expect(handler).toHaveBeenCalledWith(41);
  });

  it("można odpiąć przed pierwszym emitem", () => {
    const bus = new EventBus<{ tick: number }>();
    const handler = vi.fn();
    const unsubscribe = bus.once("tick", handler);

    unsubscribe();
    expect(bus.emit("tick", 1)).toBe(0);
    expect(handler).not.toHaveBeenCalled();
  });

  it("liczy się do listenerCount, dopóki się nie odpali", () => {
    const bus = new EventBus<{ tick: number }>();
    bus.once("tick", () => {});
    expect(bus.listenerCount("tick")).toBe(1);

    bus.emit("tick", 1);
    expect(
      bus.listenerCount("tick"),
      "once ma odpiąć samego siebie po pierwszym wywołaniu",
    ).toBe(0);
  });
});

describe("modyfikacje w trakcie emit", () => {
  it("handler dopisany w trakcie emit nie dostaje bieżącego zdarzenia", () => {
    const bus = new EventBus<{ tick: number }>();
    const late = vi.fn();
    bus.on("tick", () => {
      bus.on("tick", late);
    });

    bus.emit("tick", 1);
    expect(
      late,
      "iteruj po KOPII listy — inaczej handler dopisany w trakcie odpali się natychmiast",
    ).not.toHaveBeenCalled();

    bus.emit("tick", 2);
    expect(late).toHaveBeenCalledTimes(1);
  });

  it("handler odpięty w trakcie emit już się nie odpala", () => {
    const bus = new EventBus<{ tick: number }>();
    const second = vi.fn();
    bus.on("tick", () => {
      bus.off("tick", second);
    });
    bus.on("tick", second);

    bus.emit("tick", 1);
    expect(
      second,
      "przed wywołaniem sprawdź, czy handler nadal jest zarejestrowany",
    ).not.toHaveBeenCalled();
  });

  it("emit zwraca liczbę faktycznie wywołanych handlerów", () => {
    const bus = new EventBus<{ tick: number }>();
    const second = vi.fn();
    bus.on("tick", () => {
      bus.off("tick", second);
    });
    bus.on("tick", second);

    expect(bus.emit("tick", 1)).toBe(1);
  });
});

describe("listenerCount / removeAll", () => {
  it("listenerCount liczy handlery zdarzenia", () => {
    const bus = makeBus();
    bus.on("login", () => {});
    bus.on("login", () => {});
    bus.on("logout", () => {});

    expect([bus.listenerCount("login"), bus.listenerCount("logout")]).toEqual([
      2, 1,
    ]);
  });

  it("listenerCount nieznanego zdarzenia to 0", () => {
    expect(makeBus().listenerCount("error")).toBe(0);
  });

  it("removeAll czyści wszystkie zdarzenia", () => {
    const bus = makeBus();
    bus.on("login", () => {});
    bus.on("logout", () => {});

    bus.removeAll();
    expect([
      bus.listenerCount("login"),
      bus.emit("logout", null),
    ]).toEqual([0, 0]);
  });

  it("rejestr jest prywatny w runtime", () => {
    const bus = makeBus();
    bus.on("login", () => {});
    expect(
      Object.keys(bus),
      "pole z # nie jest widoczne z zewnątrz — private z TS znika dopiero przy kompilacji",
    ).toEqual([]);
  });
});
