import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Ogranicz zasoby wejścia", () => {
  it("spełnia kontrakt zadania", async () => {
    expect(solve({ type: "report", text: "ok", cost: 2 })).toEqual({
      type: "report",
      text: "ok",
      cost: 2,
    });
    expect(() => solve({ type: "shell", text: "x", cost: 1 })).toThrow(/typ/);
    expect(() => solve({ type: "email", text: "x", cost: Infinity })).toThrow(
      /koszt/,
    );
  });
});
