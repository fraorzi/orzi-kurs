import { describe, it, expect } from "vitest";
import { codePointCount, toCodePoints } from "./starter.js";

describe("codePointCount", () => {
  it("liczy zwykłe znaki ASCII", () => {
    expect(codePointCount("abc")).toBe(3);
    expect(codePointCount("")).toBe(0);
  });

  it("emoji spoza BMP liczy jako jeden punkt kodowy, nie dwa", () => {
    expect(
      codePointCount("a😀b"),
      '"a😀b".length to 4 (emoji = para zastępcza), ale punktów kodowych są 3 — iteruj po punktach, nie po jednostkach',
    ).toBe(3);
  });
});

describe("toCodePoints", () => {
  it("rozbija zwykły tekst na pojedyncze znaki", () => {
    expect(toCodePoints("xyz")).toEqual(["x", "y", "z"]);
  });

  it("nie rozrywa pary zastępczej emoji", () => {
    expect(
      toCodePoints("a😀"),
      'split("") rozbiłoby "😀" na dwie połówki — iterator stringa ([...str]) trzyma parę w całości',
    ).toEqual(["a", "😀"]);
  });
});
