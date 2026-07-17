import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Waliduj payload publikacji", () => {
  it("spełnia kontrakt warstwy backendowej", async () => {
    expect(solve({ title: " Artykuł ", locale: "pl" })).toEqual({ title: "Artykuł", locale: "pl" });
    expect(() => solve({ title: "x", locale: "pl" })).toThrow(/title/);
  });
});

