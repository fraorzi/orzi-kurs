import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Mapuj błędy domenowe na bezpieczne API", () => {
  it("spełnia kontrakt warstwy backendowej", async () => {
    expect(solve(Object.assign(new Error("SQL secret"), { kind: "conflict" }))).toEqual({ status: 409, code: "CONFLICT", message: "Konflikt danych" });
    expect(solve(new Error("password=secret")).message).toBe("Błąd serwera");
  });
});

