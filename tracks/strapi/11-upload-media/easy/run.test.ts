import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("walidacja metadanych uploadu", () => {
  it("akceptuje dozwolone MIME w granicach rozmiaru", () => {
    expect(solve({ mime: "image/webp", size: 1024 })).toBe(true);
    expect(solve({ mime: "image/jpeg", size: 1 })).toBe(true);
  });

  it("odrzuca MIME spoza allow-list, w tym SVG", () => {
    expect(solve({ mime: "image/svg+xml", size: 1024 })).toBe(false);
    expect(solve({ mime: "application/pdf", size: 1024 })).toBe(false);
  });

  it("odrzuca plik przekraczający limit 5 MiB", () => {
    expect(solve({ mime: "image/png", size: 6 * 1024 * 1024 })).toBe(false);
  });

  it("akceptuje plik dokładnie na granicy 5 MiB, odrzuca o bajt większy", () => {
    expect(solve({ mime: "image/png", size: 5 * 1024 * 1024 })).toBe(true);
    expect(solve({ mime: "image/png", size: 5 * 1024 * 1024 + 1 })).toBe(false);
  });

  it("odrzuca zerowy, ujemny i niecałkowity rozmiar", () => {
    expect(solve({ mime: "image/png", size: 0 })).toBe(false);
    expect(solve({ mime: "image/png", size: -1024 })).toBe(false);
    expect(solve({ mime: "image/png", size: 1024.5 })).toBe(false);
  });
});
