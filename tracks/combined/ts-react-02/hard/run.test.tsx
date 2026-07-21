import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { createElement, type ReactNode } from "react";
import { reducer, useCart, CartProvider } from "./starter";

describe("reducer koszyka", () => {
  it("dodaje i odejmuje ilość", () => {
    expect(reducer({ count: 2 }, { type: "add", amount: 3 })).toEqual({ count: 5 });
    expect(reducer({ count: 5 }, { type: "remove", amount: 2 })).toEqual({ count: 3 });
  });

  it("nie pozwala zejść poniżej zera", () => {
    expect(reducer({ count: 2 }, { type: "remove", amount: 9 })).toEqual({ count: 0 });
  });

  it("traktuje ujemny amount jak zero i resetuje", () => {
    expect(reducer({ count: 4 }, { type: "add", amount: -3 })).toEqual({ count: 4 });
    expect(reducer({ count: 4 }, { type: "reset" })).toEqual({ count: 0 });
  });
});

describe("useCart i Context", () => {
  it("rzuca czytelny błąd poza Providerem", () => {
    expect(() => renderHook(() => useCart())).toThrow(/CartProvider/);
  });

  it("zwraca stan wewnątrz Providera", () => {
    const wrapper = ({ children }: { children: ReactNode }) =>
      createElement(CartProvider, null, children);
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current).toEqual({ count: 0 });
  });
});
