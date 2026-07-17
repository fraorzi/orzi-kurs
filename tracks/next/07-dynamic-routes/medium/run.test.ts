import { describe, expect, it } from "vitest";
import { readCatalogSegments } from "./starter";

describe("readCatalogSegments", () => {
  it("obsługuje pusty optional catch-all", async () => {
    await expect(readCatalogSegments(Promise.resolve({}))).resolves.toEqual([]);
  });

  it("dekoduje i normalizuje bezpieczne segmenty", async () => {
    await expect(readCatalogSegments(Promise.resolve({
      slug: ["sprz%C4%99t", " monitory "],
    }))).resolves.toEqual(["sprzęt", "monitory"]);
  });

  it.each(["..", ".", "%2Fetc", "folder%5Cplik", "%E0%A4%A"])(
    "odrzuca segment %s",
    async (segment) => {
      await expect(readCatalogSegments(Promise.resolve({ slug: [segment] })))
        .rejects.toThrow("Nieprawidłowy segment katalogu");
    },
  );
});
