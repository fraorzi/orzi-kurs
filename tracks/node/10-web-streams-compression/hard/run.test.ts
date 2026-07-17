import { gunzipSync } from "node:zlib";
import { describe, expect, it } from "vitest";
import { solve } from "./starter";

async function* chunks(parts: readonly string[]): AsyncGenerator<Uint8Array> {
  for (const part of parts) yield Buffer.from(part);
}

describe("kompresja w pipeline", () => {
  it("roundtrip gunzip odtwarza wejście", async () => {
    const compressed = await solve(chunks(["ala ma kota, ", "kot ma alę"]));
    expect(gunzipSync(compressed).toString()).toBe("ala ma kota, kot ma alę");
  });

  it("wynik jest ramką gzip (magic bytes 1f 8b)", async () => {
    const compressed = await solve(chunks(["cokolwiek"]));
    expect(compressed[0]).toBe(0x1f);
    expect(compressed[1]).toBe(0x8b);
  });

  it("kompresja powtarzalnych danych realnie zmniejsza rozmiar", async () => {
    const big = "powtarzalny fragment ".repeat(500);
    const compressed = await solve(chunks([big]));
    expect(compressed.byteLength).toBeLessThan(Buffer.byteLength(big) / 5);
    expect(gunzipSync(compressed).toString()).toBe(big);
  });

  it("błąd źródła odrzuca pipeline", async () => {
    async function* broken(): AsyncGenerator<Uint8Array> {
      yield Buffer.from("początek");
      throw new Error("źródło padło");
    }
    await expect(solve(broken())).rejects.toThrow("źródło padło");
  });
});
