import { describe, it, expect } from "vitest";
import { reverse, equalIgnoringForm } from "./starter.js";

describe("reverse", () => {
  it("odwraca zwykły tekst", () => {
    expect(reverse("hello")).toBe("olleh");
    expect(reverse("")).toBe("");
  });

  it("nie rozrywa emoji przy odwracaniu", () => {
    expect(
      reverse("a😀b"),
      'split("").reverse() rozbija parę zastępczą emoji — odwracaj tablicę punktów kodowych [...str]',
    ).toBe("b😀a");
  });
});

describe("equalIgnoringForm", () => {
  // "é" jako jeden punkt kodowy U+00E9 (NFC) vs "e" + łączący akcent U+0301 (NFD).
  // Wyglądają identycznie na ekranie, ale to różne ciągi jednostek. Escapes \u
  // zamiast literałów — edytor mógłby znormalizować literały do NFC i unieważnić test.
  const nfc = "\u00e9";
  const nfd = "e\u0301";

  it("te same znaki w różnych formach normalizacji są równe", () => {
    expect(nfc === nfd, "bez normalizacji === rozróżnia formy NFC i NFD").toBe(false);
    expect(
      equalIgnoringForm(nfc, nfd),
      "po normalize('NFC') obie formy 'é' mają być równe",
    ).toBe(true);
  });

  it("realnie różne napisy nie są równe", () => {
    expect(equalIgnoringForm("a", "b")).toBe(false);
    expect(equalIgnoringForm("abc", "abc")).toBe(true);
  });
});
