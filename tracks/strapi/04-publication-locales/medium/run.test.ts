import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("planowanie publikacji lokalizacji", () => {
  it("usuwa duplikaty i sortuje istniejące locale", () => {
    expect(solve(["pl", "en"], ["en", "de", "en"])).toEqual(["en"]);
  });

  it("zwraca * wprost bez rozwijania do listy", () => {
    expect(solve(["pl", "en", "de"], "*")).toBe("*");
  });

  it("pomija nieistniejące locale bez rzucania błędu", () => {
    expect(solve(["pl"], ["pl", "xx-nieznane"])).toEqual(["pl"]);
  });

  it("sortuje wynik alfabetycznie niezależnie od kolejności żądania", () => {
    expect(solve(["pl", "en", "de"], ["pl", "de"])).toEqual(["de", "pl"]);
  });

  it("zwraca pustą listę, gdy żadne żądane locale nie istnieje", () => {
    expect(solve(["pl"], ["en", "de"])).toEqual([]);
  });
});
