import { describe, expect, it } from "vitest";
import { guard } from "./starter";

describe("security gate: authn, authz, rate limit", () => {
  it("wpuszcza uwierzytelnionego editora poniżej limitu prób", () => {
    const result = guard({
      requestId: "r1",
      role: "editor",
      attempts: 2,
      token: "secret-token",
      password: "hunter2",
    });

    expect(result).toEqual({
      allowed: true,
      status: 200,
      log: { requestId: "r1", role: "editor", outcome: "allow" },
    });
  });

  it("odrzuca żądanie bez tokenu jako nieuwierzytelnione", () => {
    const result = guard({ requestId: "r2", attempts: 0 });

    expect(result.allowed).toBe(false);
    expect(result.status).toBe(401);
  });

  it("odrzuca uwierzytelnioną rolę bez uprawnień editora", () => {
    const result = guard({
      requestId: "r3",
      role: "viewer",
      attempts: 0,
      token: "secret-token",
    });

    expect(result.allowed).toBe(false);
    expect(result.status).toBe(403);
  });

  it("zwraca 429 po wyczerpaniu budżetu prób, nawet dla editora", () => {
    const result = guard({
      requestId: "r4",
      role: "editor",
      attempts: 10,
      token: "secret-token",
    });

    expect(result.status).toBe(429);
    expect(result.allowed).toBe(false);
  });

  it("nigdy nie loguje tokenu ani hasła, także przy odmowie", () => {
    const allowLog = guard({
      requestId: "r5",
      role: "editor",
      attempts: 0,
      token: "secret-token",
      password: "hunter2",
    }).log;
    const denyLog = guard({
      requestId: "r6",
      role: "viewer",
      attempts: 0,
      token: "secret-token",
      password: "hunter2",
    }).log;

    const serialized = JSON.stringify(allowLog) + JSON.stringify(denyLog);
    expect(serialized).not.toContain("secret-token");
    expect(serialized).not.toContain("hunter2");
  });

  it("domyślnie loguje rolę jako anonymous, gdy nie została podana", () => {
    const result = guard({ requestId: "r7", attempts: 0 });

    expect(result.log).toEqual({
      requestId: "r7",
      role: "anonymous",
      outcome: "deny",
    });
  });
});
