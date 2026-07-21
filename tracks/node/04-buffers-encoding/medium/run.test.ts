import { describe, expect, it } from "vitest";
import { solve } from "./starter";

async function* from(chunks: readonly Uint8Array[]): AsyncGenerator<Uint8Array> {
  for (const chunk of chunks) yield chunk;
}

describe("dekodowanie chunków UTF-8", () => {
  it("skleja tekst z wielu chunków", async () => {
    const bytes = Buffer.from("ala ma kota", "utf8");
    await expect(
      solve(from([bytes.subarray(0, 4), bytes.subarray(4)])),
    ).resolves.toBe("ala ma kota");
  });

  it("dekoduje znak przecięty między chunkami bez U+FFFD", async () => {
    const bytes = Buffer.from("żółć", "utf8");
    const result = await solve(from([bytes.subarray(0, 3), bytes.subarray(3)]));
    expect(result).toBe("żółć");
    expect(result).not.toContain("�");
  });

  it("radzi sobie z chunkami o rozmiarze jednego bajta", async () => {
    const bytes = Buffer.from("🚀", "utf8");
    const single = [...bytes].map((byte) => Uint8Array.of(byte));
    await expect(solve(from(single))).resolves.toBe("🚀");
  });

  it("puste wejście daje pusty string", async () => {
    await expect(solve(from([]))).resolves.toBe("");
  });
});
