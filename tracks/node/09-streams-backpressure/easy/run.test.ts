import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Iteruj po liniach z chunków", () => {
  it("spełnia kontrakt zadania", async () => {
    async function* chunks() {
      yield "a\nb";
      yield "\r\nc";
    }
    const lines: string[] = [];
    for await (const line of solve(chunks())) lines.push(line);
    expect(lines).toEqual(["a", "b", "c"]);
  });
});
