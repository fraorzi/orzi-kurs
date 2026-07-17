import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("kontrakt stdout/stderr/exitCode", () => {
  it("sukces pisze wynik na stdout i kończy zerem", () => {
    expect(solve({ ok: true, data: "42 rekordy" }, false)).toEqual({
      stdout: "42 rekordy\n",
      stderr: "",
      exitCode: 0,
    });
  });

  it("sukces w trybie json serializuje dane", () => {
    const result = solve({ ok: true, data: { count: 42 } }, true);
    expect(JSON.parse(result.stdout)).toEqual({ count: 42 });
    expect(result.exitCode).toBe(0);
  });

  it("błąd użycia idzie na stderr z kodem 2, stdout zostaje pusty", () => {
    const result = solve(
      { ok: false, kind: "usage", message: "brak pliku wejściowego" },
      false,
    );
    expect(result.stdout).toBe("");
    expect(result.stderr).toContain("brak pliku wejściowego");
    expect(result.exitCode).toBe(2);
  });

  it("błąd wewnętrzny ma kod 1, a w trybie json niesie code", () => {
    const result = solve(
      { ok: false, kind: "internal", message: "awaria zapisu" },
      true,
    );
    expect(result.exitCode).toBe(1);
    expect(JSON.parse(result.stderr)).toEqual({
      error: "awaria zapisu",
      code: "internal",
    });
  });

  it("niepuste strumienie kończą się nową linią", () => {
    expect(solve({ ok: true, data: "x" }, false).stdout.endsWith("\n")).toBe(true);
    expect(
      solve({ ok: false, kind: "usage", message: "m" }, false).stderr.endsWith("\n"),
    ).toBe(true);
  });
});
