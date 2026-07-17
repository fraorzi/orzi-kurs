import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";

function adapter(runResults: readonly { changes: number }[]) {
  let call = 0;
  return {
    exec: vi.fn(),
    run: vi.fn(() => runResults[Math.min(call++, runResults.length - 1)]!),
  };
}

describe("transakcja przelewu", () => {
  it("wykonuje BEGIN IMMEDIATE, dwa UPDATE i COMMIT", () => {
    const db = adapter([{ changes: 1 }, { changes: 1 }]);
    solve(db, "a", "b", 10);
    expect(db.exec.mock.calls.map(([sql]) => sql)).toEqual([
      "BEGIN IMMEDIATE",
      "COMMIT",
    ]);
    expect(db.run).toHaveBeenCalledTimes(2);
  });

  it("brak środków (changes 0) robi ROLLBACK i rzuca", () => {
    const db = adapter([{ changes: 0 }]);
    expect(() => solve(db, "a", "b", 10)).toThrow();
    expect(db.exec).toHaveBeenLastCalledWith("ROLLBACK");
    expect(db.run).toHaveBeenCalledTimes(1);
  });

  it("brak konta docelowego też cofa transakcję", () => {
    const db = adapter([{ changes: 1 }, { changes: 0 }]);
    expect(() => solve(db, "a", "zombie", 10)).toThrow();
    expect(db.exec).toHaveBeenLastCalledWith("ROLLBACK");
  });

  it("waliduje kwotę zanim dotknie bazy", () => {
    for (const amount of [0, -5, Number.NaN, Number.POSITIVE_INFINITY]) {
      const db = adapter([{ changes: 1 }]);
      expect(() => solve(db, "a", "b", amount)).toThrow();
      expect(db.exec).not.toHaveBeenCalled();
    }
  });
});
