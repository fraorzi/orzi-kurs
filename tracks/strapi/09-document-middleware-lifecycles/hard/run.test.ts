import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Zapisz outbox po sukcesie dokumentu", () => {
  it("spełnia kontrakt warstwy backendowej", async () => {
    const emitted: string[] = [];
    await expect(solve(async () => { throw new Error("db"); }, async () => { emitted.push("x"); })).rejects.toThrow("db");
    expect(emitted).toEqual([]);
    await solve(async () => "doc", async (value) => { emitted.push(value); });
    expect(emitted).toEqual(["doc"]);
  });
});

