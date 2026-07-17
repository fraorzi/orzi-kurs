import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { reducer, useCart } from "./starter";

describe("reducer i Context", () => {
  it("modeluje akcje bez ujemnego stanu", () => {
    expect(reducer({ count: 2 }, { type: "add", amount: 3 })).toEqual({ count: 5 });
    expect(reducer({ count: 2 }, { type: "remove", amount: 9 })).toEqual({ count: 0 });
    expect(reducer({ count: 4 }, { type: "reset" })).toEqual({ count: 0 });
  });
  it("odrzuca użycie hooka poza Providerem", () => {
    expect(() => renderHook(() => useCart())).toThrow(/CartProvider/);
  });
});

