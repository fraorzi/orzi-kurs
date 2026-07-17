import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Zbuduj bezpieczne parametry findOne", () => {
  it("spełnia kontrakt Strapi 5", async () => {
    expect(solve("a1b2c3d4e5f6g7h8i9j0klmn", "pl")).toEqual({ documentId: "a1b2c3d4e5f6g7h8i9j0klmn", locale: "pl", status: "published" });
    expect(() => solve("12", "pl")).toThrow(/documentId/);
  });
});

