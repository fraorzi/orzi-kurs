import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Odczytaj Bearer token bez wycieku", () => {
  it("spełnia kontrakt warstwy backendowej", async () => {
    expect(solve("Bearer abc.def")).toBe("abc.def");
    expect(solve("Basic abc")).toBeNull();
    expect(solve("Bearer ")).toBeNull();
  });
});

