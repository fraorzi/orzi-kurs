import { describe, expect, it } from "vitest";
import { withStrapiHttp } from "@harness/strapi-test";
import { solve } from "./starter";

describe("mapowanie błędów domenowych na bezpieczne API", () => {
  it("mapuje conflict na 409 z publicznym kodem, ukrywając oryginalną treść", () => {
    expect(solve(Object.assign(new Error("SQL secret"), { kind: "conflict" }))).toEqual({
      status: 409,
      code: "CONFLICT",
      message: "Konflikt danych",
    });
  });

  it("mapuje notFound i validation na odpowiednie statusy i kody", () => {
    expect(solve(Object.assign(new Error("x"), { kind: "notFound" }))).toEqual({
      status: 404,
      code: "NOT_FOUND",
      message: "Nie znaleziono zasobu",
    });
    expect(solve(Object.assign(new Error("x"), { kind: "validation" }))).toEqual({
      status: 400,
      code: "VALIDATION_ERROR",
      message: "Nieprawidłowe dane",
    });
  });

  it("nieznany błąd (bez kind albo z nieoczekiwanym kind) zawsze daje 500 bez szczegółów", () => {
    expect(solve(new Error("password=secret"))).toEqual({
      status: 500,
      code: "INTERNAL_ERROR",
      message: "Błąd serwera",
    });
    expect(solve(Object.assign(new Error("boom"), { kind: "bogus" }))).toEqual({
      status: 500,
      code: "INTERNAL_ERROR",
      message: "Błąd serwera",
    });
  });

  it("wynik nigdy nie zawiera fragmentu oryginalnej treści błędu", () => {
    const mapped = solve(new Error("stack trace with /etc/passwd and db credentials"));
    expect(JSON.stringify(mapped)).not.toContain("/etc/passwd");
    expect(JSON.stringify(mapped)).not.toContain("credentials");
  });

  it("mapowanie trafia do rzeczywistej odpowiedzi HTTP z poprawnym statusem", async () => {
    await withStrapiHttp(
      async () => {
        const mapped = solve(Object.assign(new Error("db password=hunter2"), { kind: "conflict" }));
        return Response.json({ error: mapped }, { status: mapped.status });
      },
      async ({ request }) => {
        const response = await request("/api/articles/publish", { method: "PUT" });
        expect(response.status).toBe(409);
        const body = await response.text();
        expect(body).not.toContain("hunter2");
        expect(JSON.parse(body)).toEqual({
          error: { status: 409, code: "CONFLICT", message: "Konflikt danych" },
        });
      },
    );
  });
});
