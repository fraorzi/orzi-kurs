import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Zaimplementuj policy dla redaktora", () => {
  it("spełnia kontrakt warstwy backendowej", async () => {
    expect(solve({ role: "editor" })).toBe(true);
    expect(solve({ role: "public" })).toBe(false);
    expect(solve(undefined)).toBe(false);
  });
});

