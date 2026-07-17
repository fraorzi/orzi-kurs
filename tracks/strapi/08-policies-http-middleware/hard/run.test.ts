import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Skomponuj middleware z poprawną kolejnością", () => {
  it("spełnia kontrakt warstwy backendowej", async () => {
    const events: string[] = [];
    const make = (name: string) => async (next: () => Promise<void>) => { events.push(`before-${name}`); await next(); events.push(`after-${name}`); };
    await solve([make("a"), make("b")], async () => { events.push("handler"); })();
    expect(events).toEqual(["before-a", "before-b", "handler", "after-b", "after-a"]);
  });
});

