import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  isRouteName,
  pathFor,
  type RouteName,
  type RoutePath,
} from "./starter";

describe("typy rejestru", () => {
  it("wyprowadza nazwy i wartości bez ręcznej unii", () => {
    type _names = Expect<Equal<RouteName, "home" | "account" | "order">>;
    type _paths = Expect<
      Equal<RoutePath, "/" | "/account" | "/orders/:id">
    >;
    expect(pathFor("account")).toBe("/account");
  });

  it("odrzuca nazwę spoza rejestru", () => {
    const illegal = (): RoutePath =>
      // @ts-expect-error nie ma trasy settings
      pathFor("settings");
    expect(illegal).toBeTypeOf("function");
  });
});

describe("isRouteName", () => {
  it("rozpoznaje własne klucze", () => {
    expect(isRouteName("home")).toBe(true);
    expect(isRouteName("toString")).toBe(false);
  });

  it("zawęża string do RouteName", () => {
    const value: string = "order";
    if (isRouteName(value)) {
      type _value = Expect<Equal<typeof value, RouteName>>;
      expect(pathFor(value)).toBe("/orders/:id");
    }
  });
});
