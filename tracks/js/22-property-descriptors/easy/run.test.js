import { describe, it, expect } from "vitest";
import { defineConstant, hide } from "./starter.js";

describe("defineConstant", () => {
  it("ustawia wartość i zwraca obiekt", () => {
    const o = defineConstant({}, "PI", 3.14);
    expect(o.PI).toBe(3.14);
  });

  it("właściwość jest niezmienna (writable: false → TypeError w strict)", () => {
    const o = defineConstant({}, "PI", 3.14);
    expect(
      () => {
        o.PI = 1;
      },
      "writable: false w trybie strict (moduł ES) ma powodować TypeError przy przypisaniu",
    ).toThrow(TypeError);
    expect(o.PI, "wartość stałej nie może się zmienić").toBe(3.14);
  });

  it("właściwość jest niekonfigurowalna", () => {
    const o = defineConstant({}, "PI", 3.14);
    const d = Object.getOwnPropertyDescriptor(o, "PI");
    expect(d.writable).toBe(false);
    expect(d.configurable, "stała ma mieć configurable: false").toBe(false);
  });
});

describe("hide", () => {
  it("wartość jest odczytywalna", () => {
    expect(hide({}, "secret", 42).secret).toBe(42);
  });

  it("właściwość nie pojawia się w Object.keys ani JSON.stringify", () => {
    const o = hide({ visible: 1 }, "secret", 42);
    expect(Object.keys(o), "enumerable: false ukrywa klucz przed Object.keys").toEqual(["visible"]);
    expect(
      JSON.stringify(o),
      "właściwości nieenumerowalne nie trafiają do JSON",
    ).toBe('{"visible":1}');
  });

  it("deskryptor ma enumerable: false", () => {
    const o = hide({}, "secret", 42);
    expect(Object.getOwnPropertyDescriptor(o, "secret").enumerable).toBe(false);
  });
});
