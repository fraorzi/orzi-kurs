import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Zmapuj błąd na odpowiedź", () => {
  it("spełnia kontrakt zadania", async () => {
    const validation = new Error("email jest wymagany");
    validation.name = "ValidationError";
    expect(solve(validation, "r1")).toEqual({
      status: 400,
      body: { error: "email jest wymagany", requestId: "r1" },
    });
    expect(
      JSON.stringify(solve(new Error("DB_PASSWORD=secret"), "r2")),
    ).not.toContain("secret");
  });
});
