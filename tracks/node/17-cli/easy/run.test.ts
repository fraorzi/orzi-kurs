import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Rozdziel stdout i stderr", () => {
  it("spełnia kontrakt zadania", async () => {
    expect(solve({ ok: true, data: { id: 1 } }, true)).toEqual({
      stdout: '{"id":1}\n',
      stderr: "",
      exitCode: 0,
    });
    expect(
      solve({ ok: false, kind: "usage", message: "brak pliku" }, false),
    ).toEqual({ stdout: "", stderr: "Error: brak pliku\n", exitCode: 2 });
  });
});
