import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  applyDefaults,
  type Optional,
  type Prettify,
  type RequiredOnly,
} from "./starter";

interface Config {
  url: string;
  timeoutMs: number;
  retries: number;
}

const defaults = { timeoutMs: 5000, retries: 3 };

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("Prettify spłaszcza przecięcie do jednego obiektu", () => {
    type _t = Expect<
      Equal<Prettify<{ a: string } & { b: number }>, { a: string; b: number }>
    >;
    const value: Prettify<{ a: string } & { b: number }> = { a: "x", b: 1 };
    expect(value).toEqual({ a: "x", b: 1 });
  });

  it("Optional robi opcjonalnymi tylko wskazane klucze", () => {
    type _t = Expect<
      Equal<
        Optional<Config, "timeoutMs" | "retries">,
        { url: string; timeoutMs?: number; retries?: number }
      >
    >;
    const input: Optional<Config, "timeoutMs" | "retries"> = { url: "/api" };
    expect(input.url).toBe("/api");
  });

  it("Optional nie rusza kluczy spoza K", () => {
    const illegal = (): void => {
      // @ts-expect-error url nie jest w K, więc pozostaje wymagany
      const wrong: Optional<Config, "retries"> = { timeoutMs: 1 };
      void wrong;
    };
    expect(illegal).toBeTypeOf("function");
  });

  it("RequiredOnly zostawia wymagane tylko wskazane klucze", () => {
    type _t = Expect<
      Equal<
        RequiredOnly<Config, "url">,
        { url: string; timeoutMs?: number; retries?: number }
      >
    >;
    const patch: RequiredOnly<Config, "url"> = { url: "/api" };
    expect(patch).toEqual({ url: "/api" });
  });

  it("Optional i RequiredOnly to różne reguły, nie ten sam typ", () => {
    type _optional = Expect<
      Equal<
        Optional<Config, "url">,
        { timeoutMs: number; retries: number; url?: string }
      >
    >;
    type _required = Expect<
      Equal<
        RequiredOnly<Config, "url">,
        { url: string; timeoutMs?: number; retries?: number }
      >
    >;
    expect(true).toBe(true);
  });

  it("applyDefaults zwraca komplet T", () => {
    const config = applyDefaults<Config, "timeoutMs" | "retries">(
      { url: "/api" },
      defaults,
    );
    type _t = Expect<Equal<typeof config, Config>>;
    expect(config.retries).toBe(3);
  });
});

describe("applyDefaults", () => {
  it("uzupełnia brakujące pola wartościami domyślnymi", () => {
    expect(
      applyDefaults<Config, "timeoutMs" | "retries">({ url: "/api" }, defaults),
    ).toEqual({ url: "/api", timeoutMs: 5000, retries: 3 });
  });

  it("wartość podana przez użytkownika wygrywa z domyślną", () => {
    expect(
      applyDefaults<Config, "timeoutMs" | "retries">(
        { url: "/api", timeoutMs: 100 },
        defaults,
      ).timeoutMs,
    ).toBe(100);
  });

  it("zero z wejścia wygrywa z domyślną trójką", () => {
    expect(
      applyDefaults<Config, "timeoutMs" | "retries">(
        { url: "/api", retries: 0 },
        defaults,
      ).retries,
      "0 jest falsy — użycie || zamiast sprawdzenia undefined nadpisałoby je domyślną wartością",
    ).toBe(0);
  });

  it("pole ustawione na undefined traktuje jak brak", () => {
    expect(
      applyDefaults<Config, "timeoutMs" | "retries">(
        { url: "/api", timeoutMs: undefined },
        defaults,
      ).timeoutMs,
    ).toBe(5000);
  });

  it("nie mutuje wejścia", () => {
    const input = { url: "/api" };
    applyDefaults<Config, "timeoutMs" | "retries">(input, defaults);
    expect(
      input,
      "applyDefaults ma zbudować nowy obiekt — dopisanie pól do wejścia to mutacja",
    ).toEqual({ url: "/api" });
  });

  it("nie mutuje obiektu z wartościami domyślnymi", () => {
    const source = { ...defaults };
    applyDefaults<Config, "timeoutMs" | "retries">(
      { url: "/api", retries: 9 },
      source,
    );
    expect(source).toEqual(defaults);
  });
});
