import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("deduplikacja powiadomień lifecycle", () => {
  it("łączy rekordowe hooki jednej operacji w jedno powiadomienie", () => {
    expect(
      solve([
        { documentId: "doc", operationId: "publish-1" },
        { documentId: "doc", operationId: "publish-1" },
        { documentId: "doc", operationId: "publish-1" },
      ]),
    ).toEqual(["doc"]);
  });

  it("zachowuje osobne publikacje tego samego dokumentu", () => {
    expect(
      solve([
        { documentId: "doc", operationId: "publish-1" },
        { documentId: "doc", operationId: "publish-1" },
        { documentId: "doc", operationId: "publish-2" },
      ]),
    ).toEqual(["doc", "doc"]);
  });

  it("nie miesza powiadomień różnych dokumentów w jednej operacji", () => {
    expect(
      solve([
        { documentId: "a", operationId: "op" },
        { documentId: "b", operationId: "op" },
      ]),
    ).toEqual(["a", "b"]);
  });

  it("zachowuje kolejność pierwszego wystąpienia i obsługuje pustą listę", () => {
    expect(
      solve([
        { documentId: "z", operationId: "op-z" },
        { documentId: "a", operationId: "op-a" },
        { documentId: "z", operationId: "op-z" },
      ]),
    ).toEqual(["z", "a"]);
    expect(solve([])).toEqual([]);
  });
});
