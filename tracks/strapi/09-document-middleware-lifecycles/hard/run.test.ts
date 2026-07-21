import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("outbox po sukcesie operacji dokumentu", () => {
  it("nie emituje niczego, gdy next rzuca błąd", async () => {
    const emitted: string[] = [];
    await expect(
      solve(async () => { throw new Error("db"); }, async () => { emitted.push("x"); }),
    ).rejects.toThrow("db");
    expect(emitted).toEqual([]);
  });

  it("emituje dokładnie raz i zwraca wynik next po sukcesie", async () => {
    const emitted: string[] = [];
    const result = await solve(async () => "doc", async (value) => { emitted.push(value); });
    expect(result).toBe("doc");
    expect(emitted).toEqual(["doc"]);
  });

  it("wywołuje next dokładnie raz, niezależnie od wyniku", async () => {
    let nextCalls = 0;
    await solve(
      async () => { nextCalls += 1; return "ok"; },
      async () => {},
    );
    expect(nextCalls).toBe(1);
  });

  it("emituje jedno zdarzenie na dokument, niezależnie od liczby rekordów bazy zapisanych w next", async () => {
    let recordsWrittenByLocale = 0;
    const next = async () => {
      // symuluje publish trzech wariantów locale (pl, en, de) jednego dokumentu
      recordsWrittenByLocale += 3;
      return "doc-1";
    };
    const emitted: string[] = [];
    await solve(next, async (value) => { emitted.push(value); });
    expect(recordsWrittenByLocale).toBe(3);
    expect(emitted).toEqual(["doc-1"]);
  });

  it("nie tłumi ani nie zmienia oryginalnego błędu z next", async () => {
    const original = new Error("constraint violation");
    await expect(solve(async () => { throw original; }, async () => {})).rejects.toBe(original);
  });
});
