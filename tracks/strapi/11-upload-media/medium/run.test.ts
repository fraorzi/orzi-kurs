import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Nadaj bezpieczną nazwę pliku", () => {
  it("spełnia kontrakt produkcyjny", async () => {
    expect(solve("../../Moje zdjęcie.JPEG")).toBe("Moje-zdjecie.jpg");
    expect(() => solve("payload.html")).toThrow(/Niedozwolony/);
  });
});

