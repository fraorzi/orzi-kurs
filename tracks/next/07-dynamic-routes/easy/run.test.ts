import { describe, expect, it } from "vitest";
import { readProductSlug } from "./starter";

describe("readProductSlug", () => {
  it("odczytuje i normalizuje params Promise", async () => {
    await expect(readProductSlug(Promise.resolve({ slug: "  monitor-4k  " })))
      .resolves.toBe("monitor-4k");
  });

  it("odrzuca pusty segment", async () => {
    await expect(readProductSlug(Promise.resolve({ slug: "   " })))
      .rejects.toThrow("Nieprawidłowy slug produktu");
  });
});
