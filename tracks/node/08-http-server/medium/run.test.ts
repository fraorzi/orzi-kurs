import { describe, expect, it } from "vitest";
import { solve } from "./starter";

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

describe("body z limitem bajtów", () => {
  it("skleja chunki i parsuje JSON", async () => {
    const { iterable } = chunked(['{"name":', '"ala"}']);
    await expect(solve(iterable, 1024)).resolves.toEqual({ name: "ala" });
  });

  it("rozmiar równy limitowi przechodzi", async () => {
    const body = '{"a":1}';
    const { iterable } = chunked([body]);
    await expect(solve(iterable, Buffer.byteLength(body))).resolves.toEqual({
      a: 1,
    });
  });

  it("przerywa natychmiast po przekroczeniu limitu, bez dociągania chunków", async () => {
    const { iterable, pulledCount } = chunked(["aaaaaaaaaa", "b", "c", "d"]);
    await expect(solve(iterable, 5)).rejects.toThrow(/413/);
    expect(pulledCount()).toBe(1);
  });

  it("odrzuca niepoprawny JSON jako 400, nie 413", async () => {
    const { iterable } = chunked(["to nie json"]);
    await expect(solve(iterable, 1024)).rejects.toThrow(/400/);
  });
});
