import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";

describe("Wykonaj transakcję z rollbackiem", () => {
  it("spełnia kontrakt elective", async () => {
    const exec = vi.fn();
    const run = vi.fn().mockReturnValue({ changes: 1 });
    solve({ exec, run }, "a", "b", 10);
    expect(exec.mock.calls.map(([sql]) => sql)).toEqual([
      "BEGIN IMMEDIATE",
      "COMMIT",
    ]);
    expect(run).toHaveBeenCalledTimes(2);
    const failingExec = vi.fn();
    expect(() =>
      solve(
        { exec: failingExec, run: vi.fn().mockReturnValue({ changes: 0 }) },
        "a",
        "b",
        10,
      ),
    ).toThrow(/środków/);
    expect(failingExec).toHaveBeenLastCalledWith("ROLLBACK");
  });
});
