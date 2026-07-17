import { describe, expect, it } from "vitest";
import { solve } from "./starter";

async function* from(lines: readonly string[]): AsyncGenerator<string> {
  for (const line of lines) yield line;
}

describe("strumieniowy parser NDJSON", () => {
  it("wydaje rekordy z numerami linii", async () => {
    const records: unknown[] = [];
    for await (const record of solve(from(['{"a":1}', '{"b":2}']))) {
      records.push(record);
    }
    expect(records).toEqual([
      { line: 1, value: { a: 1 } },
      { line: 2, value: { b: 2 } },
    ]);
  });

  it("pomija puste wiersze, ale liczy je w numeracji", async () => {
    const records: Array<{ line: number }> = [];
    for await (const record of solve(from(['{"a":1}', "", "   ", '{"b":2}']))) {
      records.push(record);
    }
    expect(records.map((r) => r.line)).toEqual([1, 4]);
  });

  it("raportuje dokładną linię błędnego JSON", async () => {
    const iterate = async () => {
      for await (const record of solve(from(['{"ok":1}', "", "{zepsute"]))) {
        void record;
      }
    };
    await expect(iterate()).rejects.toThrow(/3/);
  });

  it("rekordy sprzed błędu są wydane zanim poleci wyjątek", async () => {
    const seen: number[] = [];
    await expect(
      (async () => {
        for await (const record of solve(from(['{"a":1}', "zepsute"]))) {
          seen.push(record.line);
        }
      })(),
    ).rejects.toThrow();
    expect(seen).toEqual([1]);
  });
});
