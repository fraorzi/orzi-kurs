import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("bezpieczna nazwa pliku uploadu", () => {
  it("odcina ścieżkę i transliteruje polskie znaki", () => {
    expect(solve("../../Moje zdjęcie.JPEG")).toBe("Moje-zdjecie.jpg");
  });

  it("odrzuca niedozwolone rozszerzenie", () => {
    expect(() => solve("payload.html")).toThrow(/Niedozwolony/);
    expect(() => solve("archive.svg")).toThrow(/Niedozwolony/);
  });

  it("normalizuje rozszerzenie jpeg do jpg niezależnie od wielkości liter", () => {
    expect(solve("cover.JPEG")).toBe("cover.jpg");
    expect(solve("cover.jpeg")).toBe("cover.jpg");
  });

  it("zamienia znaki sterujące i ryzykowne na myślnik, redukując powtórzenia", () => {
    expect(solve("my<>:file?.png")).toBe("my-file.png");
  });

  it("rzuca błąd, gdy po czyszczeniu z nazwy nic nie zostaje", () => {
    expect(() => solve("????.png")).toThrow(/Pusta/);
  });
});
