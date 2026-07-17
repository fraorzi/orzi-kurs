import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Wykonaj update i publish", () => {
  it("spełnia kontrakt Strapi 5", async () => {
    const calls: string[] = [];
    const service = { update: async () => { calls.push("update"); }, publish: async () => { calls.push("publish"); } };
    await solve(service, "doc", "pl", { title: "T" });
    expect(calls).toEqual(["update", "publish"]);
  });
});

