import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Parsuj NDJSON strumieniowo", () => {
  it("spełnia kontrakt zadania", async () => {
    async function* lines() {
      yield '{"id":1}';
      yield "";
      yield "[2]";
    }
    const records = [];
    for await (const record of solve(lines())) records.push(record);
    expect(records).toEqual([
      { line: 1, value: { id: 1 } },
      { line: 3, value: [2] },
    ]);
    async function* bad() {
      yield "{}";
      yield "{";
    }
    const consume = async () => {
      for await (const _ of solve(bad())) void _;
    };
    await expect(consume()).rejects.toThrow(/linii 2/);
  });
});
