import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  ok,
  err,
  mapResult,
  flatMapResult,
  unwrapOr,
  collect,
  type Result,
} from "./starter";

const half = (n: number): Result<number> =>
  n % 2 === 0 ? ok(n / 2) : err("nieparzysta");

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("Result<T> to unia rozłączna z wartością typu T", () => {
    type _t = Expect<
      Equal<
        Result<number>,
        | { readonly ok: true; readonly value: number }
        | { readonly ok: false; readonly error: string }
      >
    >;
    expect(ok(1)).toEqual({ ok: true, value: 1 });
  });

  it("err zwraca Result<never> — pasuje do każdego Result<T>", () => {
    const parsed: Result<number> = err("nie liczba");
    type _t = Expect<Equal<ReturnType<typeof err>, Result<never>>>;
    expect(parsed).toEqual({ ok: false, error: "nie liczba" });
  });

  it("sprawdzenie result.ok zawęża wariant", () => {
    const result = ok(2);
    if (result.ok) {
      const value: number = result.value;
      expect(value).toBe(2);
    } else {
      const error: string = result.error;
      expect(error).toBe("nieosiągalne");
    }
  });

  it("mapResult zmienia parametr typu na typ zwracany przez fn", () => {
    const mapped = mapResult(ok(2), (n) => n.toFixed(2));
    type _t = Expect<Equal<typeof mapped, Result<string>>>;
    expect(mapped).toEqual({ ok: true, value: "2.00" });
  });

  it("flatMapResult nie zagnieżdża — daje Result<U>, nie Result<Result<U>>", () => {
    const chained = flatMapResult(ok(8), half);
    type _t = Expect<Equal<typeof chained, Result<number>>>;
    expect(chained).toEqual({ ok: true, value: 4 });
  });

  it("unwrapOr wymaga fallbacku tego samego typu co wartość", () => {
    const illegal = (): void => {
      // @ts-expect-error T jest już ustalone na number przez pierwszy argument
      unwrapOr(ok(1), "abc");
    };
    expect(illegal).toBeTypeOf("function");
    expect(unwrapOr(ok(1), 0)).toBe(1);
  });

  it("collect zamienia listę wyników w wynik z listą", () => {
    const collected = collect([ok(1), ok(2)]);
    type _t = Expect<Equal<typeof collected, Result<number[]>>>;
    expect(collected).toEqual({ ok: true, value: [1, 2] });
  });
});

describe("ok / err", () => {
  it("ok pakuje wartość w wariant sukcesu", () => {
    expect(ok("x")).toEqual({ ok: true, value: "x" });
  });

  it("err pakuje komunikat w wariant błędu", () => {
    expect(err("boom")).toEqual({ ok: false, error: "boom" });
  });

  it("ok(false) to nadal sukces", () => {
    expect(
      ok(false).ok,
      "o wariancie decyduje pole ok, nie truthiness wartości",
    ).toBe(true);
  });
});

describe("mapResult", () => {
  it("przekształca wartość sukcesu", () => {
    expect(mapResult(ok(2), (n) => n * 5)).toEqual({ ok: true, value: 10 });
  });

  it("na błędzie przepuszcza błąd bez zmian", () => {
    const failed: Result<number> = err("boom");
    expect(mapResult(failed, (n) => n * 5)).toEqual({
      ok: false,
      error: "boom",
    });
  });

  it("na błędzie w ogóle nie woła fn", () => {
    let calls = 0;
    const failed: Result<number> = err("boom");
    mapResult(failed, (n) => {
      calls += 1;
      return n;
    });
    expect(
      calls,
      "fn dotyczy tylko wartości sukcesu — na błędzie nie ma czego przekształcać",
    ).toBe(0);
  });
});

describe("flatMapResult", () => {
  it("spłaszcza wynik zwrócony przez fn", () => {
    expect(flatMapResult(ok(8), half)).toEqual({ ok: true, value: 4 });
  });

  it("błąd zwrócony przez fn staje się wynikiem", () => {
    expect(
      flatMapResult(ok(7), half),
      "fn samo zwraca Result — nie owijaj go drugi raz w ok()",
    ).toEqual({ ok: false, error: "nieparzysta" });
  });

  it("na błędzie wejściowym nie woła fn", () => {
    let calls = 0;
    const failed: Result<number> = err("boom");
    const result = flatMapResult(failed, (n) => {
      calls += 1;
      return ok(n);
    });
    expect(calls).toBe(0);
    expect(result).toEqual({ ok: false, error: "boom" });
  });

  it("łańcuchuje operacje, z których każda może się nie udać", () => {
    expect(flatMapResult(flatMapResult(ok(8), half), half)).toEqual({
      ok: true,
      value: 2,
    });
  });
});

describe("unwrapOr", () => {
  it("na sukcesie zwraca wartość", () => {
    expect(unwrapOr(ok(1), 0)).toBe(1);
  });

  it("na błędzie zwraca fallback", () => {
    const failed: Result<number> = err("boom");
    expect(unwrapOr(failed, 0)).toBe(0);
  });

  it("nie myli wartości 0 z błędem", () => {
    expect(
      unwrapOr(ok(0), 42),
      "o wyborze decyduje pole ok, nie truthiness wartości",
    ).toBe(0);
  });
});

describe("collect", () => {
  it("same sukcesy dają listę wartości w oryginalnej kolejności", () => {
    expect(collect([ok(1), ok(2), ok(3)])).toEqual({
      ok: true,
      value: [1, 2, 3],
    });
  });

  it("zwraca PIERWSZY napotkany błąd", () => {
    const results: Result<number>[] = [ok(1), err("x"), err("y")];
    expect(
      collect(results),
      "kolejne błędy nie nadpisują pierwszego — przerywasz na pierwszym",
    ).toEqual({ ok: false, error: "x" });
  });

  it("pusta lista to sukces z pustą tablicą", () => {
    expect(collect([])).toEqual({ ok: true, value: [] });
  });
});
