import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { once, compose, memoize, type Fn, type Memoized } from "./starter";

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("Memoized jest wywoływalny i ma liczniki oraz clear", () => {
    type _call = Expect<
      Equal<Parameters<Memoized>, [key: string]>
    >;
    type _ret = Expect<Equal<ReturnType<Memoized>, number>>;
    const m: Memoized = memoize((key) => key.length);
    const value: number = m("abc");
    const hits: number = m.hits;
    const misses: number = m.misses;
    m.clear();
    expect([value, hits, misses]).toEqual([3, 0, 1]);
  });

  it("liczniki są tylko do odczytu", () => {
    const m = memoize((key) => key.length);
    const illegal = (): void => {
      // @ts-expect-error hits jest readonly
      m.hits = 99;
    };
    expect(illegal).toBeTypeOf("function");
    expect(m.hits).toBe(0);
  });

  it("once zwraca funkcję o tym samym typie co wejście", () => {
    type _t = Expect<Equal<ReturnType<typeof once>, Fn>>;
    expect(once((n) => n)(1)).toBe(1);
  });
});

describe("once", () => {
  it("woła fn tylko przy pierwszym wywołaniu", () => {
    let calls = 0;
    const init = once((n) => {
      calls += 1;
      return n * 2;
    });
    init(5);
    init(9);
    init(11);
    expect(
      calls,
      "kolejne wywołania mają zwracać zapamiętany wynik, nie wołać fn ponownie",
    ).toBe(1);
  });

  it("kolejne wywołania zwracają wynik z pierwszego", () => {
    const init = once((n) => n * 2);
    expect(init(5)).toBe(10);
    expect(
      init(9),
      "argument kolejnego wywołania jest ignorowany — liczy się pierwszy wynik",
    ).toBe(10);
  });

  it("zapamiętuje też wynik 0 (nie myli go z brakiem wyniku)", () => {
    let calls = 0;
    const init = once(() => {
      calls += 1;
      return 0;
    });
    expect(init(1)).toBe(0);
    expect(init(2)).toBe(0);
    expect(calls, "0 jest falsy — nie sprawdzaj cache'u przez truthiness").toBe(
      1,
    );
  });
});

describe("compose", () => {
  it("składa funkcje od prawej do lewej", () => {
    const inc: Fn = (n) => n + 1;
    const double: Fn = (n) => n * 2;
    expect(
      compose(inc, double)(5),
      "compose(f, g)(x) to f(g(x)) — najpierw double, potem inc",
    ).toBe(11);
  });

  it("kolejność ma znaczenie", () => {
    const inc: Fn = (n) => n + 1;
    const double: Fn = (n) => n * 2;
    expect(compose(double, inc)(5)).toBe(12);
  });
});

describe("memoize", () => {
  it("liczy wynik raz na klucz", () => {
    let calls = 0;
    const fast = memoize((key) => {
      calls += 1;
      return key.length;
    });
    expect(fast("abc")).toBe(3);
    expect(fast("abc")).toBe(3);
    expect(calls).toBe(1);
  });

  it("różne klucze liczy osobno", () => {
    let calls = 0;
    const fast = memoize((key) => {
      calls += 1;
      return key.length;
    });
    fast("a");
    fast("bb");
    fast("a");
    expect(calls).toBe(2);
  });

  it("zlicza trafienia i chybienia", () => {
    const fast = memoize((key) => key.length);
    fast("a");
    fast("a");
    fast("bb");
    expect([fast.hits, fast.misses]).toEqual([1, 2]);
  });

  it("clear czyści cache i zeruje liczniki", () => {
    let calls = 0;
    const fast = memoize((key) => {
      calls += 1;
      return key.length;
    });
    fast("a");
    fast("a");
    fast.clear();
    expect([fast.hits, fast.misses]).toEqual([0, 0]);
    fast("a");
    expect(calls, "po clear wynik ma być policzony na nowo").toBe(2);
  });

  it("cache'uje wynik 0", () => {
    let calls = 0;
    const fast = memoize((key) => {
      calls += 1;
      return key.length;
    });
    fast("");
    fast("");
    expect(calls, "Map.has odróżnia brak klucza od wartości 0").toBe(1);
  });
});
