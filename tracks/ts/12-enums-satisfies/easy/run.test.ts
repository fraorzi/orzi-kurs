import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { ROUTES, THEME, pathOf, isDark, type RouteName } from "./starter";

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("ROUTES zachowuje literalne wartości tras", () => {
    type _home = Expect<Equal<(typeof ROUTES)["home"], "/">>;
    type _post = Expect<Equal<(typeof ROUTES)["post"], "/posts/:id">>;
    expect(ROUTES.home).toBe("/");
  });

  it("RouteName to unia kluczy ROUTES", () => {
    type _t = Expect<Equal<RouteName, "home" | "posts" | "post" | "about">>;
    const name: RouteName = "post";
    expect(pathOf(name)).toBe("/posts/:id");
  });

  it("nieistniejąca trasa jest błędem typu", () => {
    const illegal = (): void => {
      // @ts-expect-error "kontakt" nie jest kluczem ROUTES
      pathOf("kontakt");
    };
    expect(illegal).toBeTypeOf("function");
  });

  it("THEME.mode ma typ literalny \"dark\", nie unię", () => {
    type _t = Expect<Equal<(typeof THEME)["mode"], "dark">>;
    expect(THEME.mode).toBe("dark");
  });

  it("THEME jest tylko do odczytu (as const)", () => {
    const illegal = (): void => {
      // @ts-expect-error as const czyni pola readonly
      THEME.radiusPx = 12;
    };
    expect(illegal).toBeTypeOf("function");
    expect(THEME.radiusPx).toBe(8);
  });
});

describe("ROUTES", () => {
  it("zawiera cztery trasy", () => {
    expect(ROUTES).toEqual({
      home: "/",
      posts: "/posts",
      post: "/posts/:id",
      about: "/o-nas",
    });
  });
});

describe("pathOf", () => {
  it("zwraca ścieżkę dla nazwy trasy", () => {
    expect(pathOf("home")).toBe("/");
    expect(pathOf("about")).toBe("/o-nas");
  });
});

describe("THEME i isDark", () => {
  it("motyw jest ciemny", () => {
    expect(isDark()).toBe(true);
  });

  it("konfiguracja ma komplet pól", () => {
    expect(THEME).toEqual({
      mode: "dark",
      radiusPx: 8,
      fontFamily: "JetBrains Mono",
    });
  });
});
