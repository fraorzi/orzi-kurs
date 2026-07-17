import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Autoryzuj bezpieczne powiązanie media", () => {
  it("spełnia kontrakt produkcyjny", async () => {
    const events: string[] = [];
    await expect(solve({ authorize: async () => true, upload: async () => "m1", link: async () => { throw new Error("link"); }, remove: async (id) => { events.push(`remove:${id}`); } })).rejects.toThrow("link");
    expect(events).toEqual(["remove:m1"]);
    await expect(solve({ authorize: async () => false, upload: async () => { throw new Error("should not"); }, link: async () => {}, remove: async () => {} })).rejects.toThrow("Forbidden");
  });
});

