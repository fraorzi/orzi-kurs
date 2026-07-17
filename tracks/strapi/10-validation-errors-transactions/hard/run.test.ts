import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Wykonaj atomową operację redakcyjną", () => {
  it("spełnia kontrakt warstwy backendowej", async () => {
    const events: string[] = [];
    await expect(solve({ update: async () => { events.push("update"); }, audit: async () => { throw new Error("audit"); }, commit: async () => { events.push("commit"); }, rollback: async () => { events.push("rollback"); } })).rejects.toThrow("audit");
    expect(events).toEqual(["update", "rollback"]);
  });
});

