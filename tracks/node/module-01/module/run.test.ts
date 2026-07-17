import { describe, expect, it } from "vitest";
import { analyzeLog, lines } from "./src/index";

function chunked(parts: readonly string[]) {
  let pulled = 0;
  const iterable: AsyncIterable<Uint8Array> = {
    async *[Symbol.asyncIterator]() {
      for (const part of parts) {
        pulled++;
        yield Buffer.from(part, "utf8");
      }
    },
  };
  return { iterable, pulledCount: () => pulled };
}

const record = (level: string, message: string) =>
  JSON.stringify({ level, message });

const options = {
  maxTotalBytes: 10_000,
  maxLineBytes: 200,
  maxParseErrors: 2,
};

describe("analizator NDJSON", () => {
  it("agreguje poziomy z chunków przecinających znaki i linie", async () => {
    const body = [
      record("info", "start żółwia"),
      record("error", "awaria"),
      record("info", "koniec"),
    ].join("\n");
    const bytes = Buffer.from(body, "utf8");
    const parts = [bytes.subarray(0, 34), bytes.subarray(34, 40), bytes.subarray(40)];
    const result = await analyzeLog(
      (async function* () {
        for (const part of parts) yield part;
      })(),
      options,
    );
    expect(result.processed).toBe(3);
    expect(result.counts.info).toBe(2);
    expect(result.counts.error).toBe(1);
    expect(result.counts.debug).toBe(0);
    expect(result.parseErrors).toEqual([]);
  });

  it("toleruje zepsute linie w ramach budżetu i raportuje numer oraz powód", async () => {
    const { iterable } = chunked([
      [record("info", "ok"), "{zepsute", record("warn", "uwaga"), ""].join("\n") + "\n",
    ]);
    const result = await analyzeLog(iterable, options);
    expect(result.processed).toBe(2);
    expect(result.parseErrors).toEqual([{ line: 2, reason: "invalid-json" }]);
  });

  it("rozróżnia powody błędów: zły level i brak message", async () => {
    const { iterable } = chunked([
      [record("critical", "x"), JSON.stringify({ level: "info" })].join("\n"),
    ]);
    const result = await analyzeLog(iterable, options);
    expect(result.parseErrors.map((e) => e.reason)).toEqual([
      "unknown-level",
      "missing-message",
    ]);
  });

  it("przekroczenie budżetu błędów przerywa analizę", async () => {
    const { iterable } = chunked([
      ["{a", "{b", "{c"].join("\n"),
    ]);
    await expect(analyzeLog(iterable, options)).rejects.toThrow(/budżet/i);
  });

  it("limit łączny bajtów przerywa bez dociągania kolejnych chunków", async () => {
    const { iterable, pulledCount } = chunked([
      "x".repeat(100),
      "y".repeat(100),
      "z".repeat(100),
    ]);
    await expect(
      analyzeLog(iterable, { ...options, maxTotalBytes: 150 }),
    ).rejects.toThrow(/maxTotalBytes/);
    expect(pulledCount()).toBe(2);
  });

  it("za długa linia zużywa budżet jako line-too-long, reszta się liczy", async () => {
    const { iterable } = chunked([
      [record("info", "m".repeat(300)), record("info", "ok")].join("\n"),
    ]);
    const result = await analyzeLog(iterable, options);
    expect(result.processed).toBe(1);
    expect(result.parseErrors).toEqual([{ line: 1, reason: "line-too-long" }]);
  });

  it("przerwany sygnał odrzuca analizę jego powodem", async () => {
    const { iterable } = chunked([record("info", "x") + "\n"]);
    await expect(
      analyzeLog(iterable, {
        ...options,
        signal: AbortSignal.abort(new Error("shutdown")),
      }),
    ).rejects.toThrow("shutdown");
  });

  it("lines dekoduje znak przecięty między chunkami i numeruje wiersze", async () => {
    const bytes = Buffer.from("ż\npo", "utf8");
    const parts = [bytes.subarray(0, 1), bytes.subarray(1)];
    const seen: Array<{ line: number; text: string }> = [];
    for await (const entry of lines(
      (async function* () {
        for (const part of parts) yield part;
      })(),
    )) {
      seen.push(entry);
    }
    expect(seen).toEqual([
      { line: 1, text: "ż" },
      { line: 2, text: "po" },
    ]);
  });
});
