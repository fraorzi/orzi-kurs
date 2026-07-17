// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { readTextValue } from "./starter";

function dispatchValue(element: HTMLElement): string | null {
  let value: string | null = "not-called";
  element.addEventListener("input", (event) => {
    value = readTextValue(event);
  });
  element.dispatchEvent(new Event("input", { bubbles: true }));
  return value;
}

describe("readTextValue", () => {
  it("odczytuje input i textarea", () => {
    const input = document.createElement("input");
    input.value = "Ala";
    const textarea = document.createElement("textarea");
    textarea.value = "Opis";
    expect(dispatchValue(input)).toBe("Ala");
    expect(dispatchValue(textarea)).toBe("Opis");
  });

  it("zwraca null dla innego elementu", () => {
    expect(dispatchValue(document.createElement("button"))).toBeNull();
  });
});
