import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("budowanie bezpiecznych parametrów findOne", () => {
  it("zwraca status published dla poprawnego documentId i locale", () => {
    expect(solve("a1b2c3d4e5f6g7h8i9j0klmn", "pl")).toEqual({
      documentId: "a1b2c3d4e5f6g7h8i9j0klmn",
      locale: "pl",
      status: "published",
    });
  });

  it("akceptuje locale z regionem", () => {
    expect(solve("a1b2c3d4e5f6g7h8i9j0klmn", "en-US").locale).toBe("en-US");
  });

  it("odrzuca zbyt krótki documentId", () => {
    expect(() => solve("12", "pl")).toThrow(/documentId/);
  });

  it("odrzuca zbyt długi documentId", () => {
    expect(() => solve("a1b2c3d4e5f6g7h8i9j0klmnX", "pl")).toThrow(/documentId/);
  });

  it("odrzuca nieprawidłowy format locale", () => {
    expect(() => solve("a1b2c3d4e5f6g7h8i9j0klmn", "PL")).toThrow(/locale/);
    expect(() => solve("a1b2c3d4e5f6g7h8i9j0klmn", "pl_PL")).toThrow(/locale/);
  });
});
