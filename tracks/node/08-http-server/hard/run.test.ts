import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("bezpieczny envelope błędu", () => {
  it("błąd walidacji wraca jako 400 z własnym komunikatem", () => {
    const error = Object.assign(new Error("pole email jest wymagane"), {
      name: "ValidationError",
    });
    expect(solve(error, "req-11")).toEqual({
      status: 400,
      body: { error: "pole email jest wymagane", requestId: "req-11" },
    });
  });

  it("nieznany Error dostaje generyczny komunikat bez szczegółów", () => {
    const result = solve(new Error("ECONNREFUSED db:5432 password=tajne"), "req-12");
    expect(result.status).toBe(500);
    expect(result.body.error).toBe("Internal Server Error");
    expect(JSON.stringify(result)).not.toContain("ECONNREFUSED");
    expect(JSON.stringify(result)).not.toContain("tajne");
  });

  it("wartości nie będące Error też mapują się na 500", () => {
    expect(solve("wybuch", "req-13").status).toBe(500);
    expect(solve(undefined, "req-14").status).toBe(500);
  });

  it("requestId jest obecny w każdej odpowiedzi", () => {
    expect(solve(new Error("x"), "req-15").body.requestId).toBe("req-15");
    const validation = Object.assign(new Error("złe dane"), {
      name: "ValidationError",
    });
    expect(solve(validation, "req-16").body.requestId).toBe("req-16");
  });
});
