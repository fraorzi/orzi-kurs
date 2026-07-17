import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Połącz RBAC z własnością dokumentu", () => {
  it("spełnia kontrakt warstwy backendowej", async () => {
    expect(solve({ role: "editor", userId: "u1", action: "update", ownerId: "u1", status: "draft" })).toBe(true);
    expect(solve({ role: "editor", userId: "u2", action: "update", ownerId: "u1", status: "draft" })).toBe(false);
    expect(solve({ role: "public", action: "find", ownerId: "u1", status: "draft" })).toBe(false);
  });
});

