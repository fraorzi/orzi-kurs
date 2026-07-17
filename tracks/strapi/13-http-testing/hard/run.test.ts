import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Izoluj stan testu integracyjnego", () => {
  it("spełnia kontrakt produkcyjny", async () => {
    const events: string[] = [];
    await expect(solve(async () => { events.push("setup"); }, async () => { events.push("run"); throw new Error("test"); }, async () => { events.push("cleanup"); })).rejects.toThrow("test");
    expect(events).toEqual(["setup", "run", "cleanup"]);
  });
});

