import { describe, it, expect, vi } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  once,
  resolveAll,
  type FirstParam,
  type MyAwaited,
  type MyParameters,
  type MyReturnType,
} from "./starter";

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("MyReturnType wyłuskuje typ zwracany", () => {
    type _t = Expect<Equal<MyReturnType<() => Date>, Date>>;
    type _void = Expect<Equal<MyReturnType<(a: string) => void>, void>>;
    expect(true).toBe(true);
  });

  it("MyParameters zwraca krotkę parametrów", () => {
    type _t = Expect<
      Equal<MyParameters<(a: string, b: number) => void>, [a: string, b: number]>
    >;
    type _empty = Expect<Equal<MyParameters<() => void>, []>>;
    expect(true).toBe(true);
  });

  it("MyAwaited rozpakowuje zagnieżdżone obietnice", () => {
    type _t = Expect<Equal<MyAwaited<Promise<Promise<number>>>, number>>;
    expect(true).toBe(true);
  });

  it("MyAwaited zostawia nie-obietnicę bez zmian", () => {
    type _t = Expect<Equal<MyAwaited<string>, string>>;
    expect(true).toBe(true);
  });

  it("FirstParam bierze typ pierwszego parametru", () => {
    type _t = Expect<
      Equal<FirstParam<(id: number, all?: boolean) => void>, number>
    >;
    expect(true).toBe(true);
  });

  it("FirstParam dla funkcji bez parametrów daje never", () => {
    type _t = Expect<Equal<FirstParam<() => void>, never>>;
    expect(true).toBe(true);
  });

  it("once zachowuje sygnaturę opakowanej funkcji", () => {
    const load = once((id: number) => ({ id }));
    type _t = Expect<Equal<typeof load, (id: number) => { id: number }>>;
    expect(load(1)).toEqual({ id: 1 });
  });

  it("once odrzuca argument złego typu", () => {
    const load = once((id: number) => id);
    const illegal = (): number =>
      // @ts-expect-error parametr ma typ number, nie string
      load("1");
    expect(illegal).toBeTypeOf("function");
  });

  it("resolveAll zachowuje pozycje krotki i rozpakowuje obietnice", async () => {
    const result = await resolveAll([
      Promise.resolve(1),
      "x",
      Promise.resolve(true),
    ]);
    type _t = Expect<Equal<typeof result, [number, string, boolean]>>;
    expect(result).toEqual([1, "x", true]);
  });
});

describe("once", () => {
  it("wywołuje funkcję tylko raz", () => {
    const fn = vi.fn((id: number) => ({ id }));
    const load = once(fn);

    load(1);
    load(2);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("kolejne wywołania oddają wynik pierwszego, ignorując nowe argumenty", () => {
    const load = once((id: number) => ({ id }));
    load(1);
    expect(
      load(2),
      "once zapamiętuje wynik PIERWSZEGO wywołania — argumenty kolejnych są ignorowane",
    ).toEqual({ id: 1 });
  });

  it("zwraca dokładnie tę samą referencję przy każdym wywołaniu", () => {
    const load = once(() => ({ value: 1 }));
    expect(
      load(),
      "wynik jest zapamiętany, więc to musi być ten sam obiekt, nie nowa kopia",
    ).toBe(load());
  });

  it("zapamiętuje też undefined jako wynik", () => {
    const fn = vi.fn(() => undefined);
    const call = once(fn);

    call();
    call();
    expect(
      fn,
      "undefined to poprawny wynik — flaga 'czy wywołano' nie może opierać się na wartości",
    ).toHaveBeenCalledTimes(1);
  });

  it("gdy funkcja rzuci, kolejne wywołanie próbuje ponownie", () => {
    let attempts = 0;
    const call = once(() => {
      attempts += 1;
      if (attempts === 1) throw new Error("pierwsze podejście");
      return attempts;
    });

    expect(() => call()).toThrow("pierwsze podejście");
    expect(
      call(),
      "nieudane wywołanie nie ma czego zapamiętać — flagę ustawiaj PO powrocie z fn",
    ).toBe(2);
  });

  it("każde opakowanie ma własną pamięć", () => {
    const make = () => once(() => ({}));
    const a = make();
    const b = make();
    expect(a()).not.toBe(b());
  });
});

describe("resolveAll", () => {
  it("czeka na obietnice i zachowuje kolejność", async () => {
    const slow = new Promise<string>((resolve) =>
      setTimeout(() => resolve("wolne"), 20),
    );
    const fast = Promise.resolve("szybkie");

    expect(
      await resolveAll([slow, fast]),
      "kolejność wyniku ma odpowiadać kolejności wejścia, nie kolejności rozwiązania",
    ).toEqual(["wolne", "szybkie"]);
  });

  it("przepuszcza wartości niebędące obietnicami", async () => {
    expect(await resolveAll([1, "x", true])).toEqual([1, "x", true]);
  });

  it("dla pustej listy zwraca pustą listę", async () => {
    expect(await resolveAll([])).toEqual([]);
  });

  it("odrzucona obietnica odrzuca całość", async () => {
    await expect(
      resolveAll([Promise.resolve(1), Promise.reject(new Error("bum"))]),
    ).rejects.toThrow("bum");
  });

  it("nie mutuje wejścia", async () => {
    const values = [1, 2];
    await resolveAll(values);
    expect(values).toEqual([1, 2]);
  });
});
