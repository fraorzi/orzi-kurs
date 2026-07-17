import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Kompresuj przez pipeline", () => {
  it("spełnia kontrakt zadania", async () => {
    async function* input() {
      yield Buffer.from("hello ");
      yield Buffer.from("world");
    }
    const compressed = await solve(input());
    const { gunzip } = await import("node:zlib");
    const { promisify } = await import("node:util");
    expect((await promisify(gunzip)(compressed)).toString()).toBe(
      "hello world",
    );
  });
});
