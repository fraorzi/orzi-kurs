import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  buildPath,
  matchPath,
  type ParamKeys,
  type PathParams,
} from "./starter";

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("ParamKeys wyciąga unię nazw parametrów ze wzorca", () => {
    type _many = Expect<
      Equal<ParamKeys<"/users/:id/posts/:postId">, "id" | "postId">
    >;
    type _one = Expect<Equal<ParamKeys<"/users/:id">, "id">>;
    expect(buildPath("/users/:id", { id: "7" })).toBe("/users/7");
  });

  it("wzorzec bez parametrów daje never", () => {
    type _t = Expect<Equal<ParamKeys<"/health">, never>>;
    expect(buildPath("/health", {})).toBe("/health");
  });

  it("PathParams zamienia unię nazw na obiekt z polami string", () => {
    type _t = Expect<
      Equal<
        PathParams<"/users/:id/posts/:postId">,
        { id: string; postId: string }
      >
    >;
    const params: PathParams<"/users/:id"> = { id: "7" };
    expect(params.id).toBe("7");
  });

  it("brakujący parametr to błąd typu", () => {
    const illegal = (): string =>
      // @ts-expect-error wzorzec wymaga id — pusty obiekt musi być błędem typu
      buildPath("/users/:id", {});
    expect(illegal).toBeTypeOf("function");
  });

  it("nadmiarowy parametr to błąd typu", () => {
    const illegal = (): string =>
      // @ts-expect-error "page" nie występuje we wzorcu
      buildPath("/users/:id", { id: "7", page: "2" });
    expect(illegal).toBeTypeOf("function");
  });

  it("matchPath zwraca parametry wzorca albo null", () => {
    const params = matchPath("/users/:id", "/users/7");
    type _t = Expect<Equal<typeof params, { id: string } | null>>;
    expect(params).toEqual({ id: "7" });
  });
});

describe("buildPath", () => {
  it("podstawia jeden parametr", () => {
    expect(buildPath("/users/:id", { id: "7" })).toBe("/users/7");
  });

  it("podstawia wiele parametrów w kolejności wzorca", () => {
    expect(
      buildPath("/users/:id/posts/:postId", { id: "7", postId: "3" }),
    ).toBe("/users/7/posts/3");
  });

  it("zostawia segmenty stałe nietknięte", () => {
    expect(buildPath("/health", {})).toBe("/health");
  });

  it("koduje wartość parametru", () => {
    expect(
      buildPath("/search/:query", { query: "kot i pies" }),
      "wartość parametru trafia do URL-a — użyj encodeURIComponent",
    ).toBe("/search/kot%20i%20pies");
  });

  it("koduje ukośnik w wartości, zamiast rozbijać ścieżkę", () => {
    expect(
      buildPath("/files/:name", { name: "a/b" }),
      "niezakodowany / zrobiłby z jednego segmentu dwa",
    ).toBe("/files/a%2Fb");
  });
});

describe("matchPath", () => {
  it("wyciąga parametr z pasującej ścieżki", () => {
    expect(matchPath("/users/:id", "/users/7")).toEqual({ id: "7" });
  });

  it("wyciąga wiele parametrów", () => {
    expect(matchPath("/users/:id/posts/:postId", "/users/7/posts/3")).toEqual({
      id: "7",
      postId: "3",
    });
  });

  it("zwraca pusty obiekt dla wzorca bez parametrów", () => {
    expect(matchPath("/health", "/health")).toEqual({});
  });

  it("zwraca null przy innej liczbie segmentów", () => {
    expect(
      matchPath("/users/:id", "/users/7/posts"),
      "wzorzec ma 2 segmenty, ścieżka 3 — to nie jest dopasowanie",
    ).toBeNull();
  });

  it("zwraca null, gdy segment stały się nie zgadza", () => {
    expect(
      matchPath("/users/:id", "/orders/7"),
      "segment bez dwukropka musi zgadzać się dosłownie",
    ).toBeNull();
  });

  it("dekoduje wartość parametru", () => {
    expect(
      matchPath("/search/:query", "/search/kot%20i%20pies"),
      "wartość z URL-a jest zakodowana — odwróć to przez decodeURIComponent",
    ).toEqual({ query: "kot i pies" });
  });

  it("matchPath(wzorzec, buildPath(wzorzec, params)) oddaje te same params", () => {
    const params = { name: "a/b c" };
    const path = buildPath("/files/:name", params);
    expect(
      matchPath("/files/:name", path),
      "kodowanie i dekodowanie muszą być swoimi odwrotnościami",
    ).toEqual(params);
  });
});
