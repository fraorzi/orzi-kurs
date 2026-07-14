import { describe, it, expect } from "vitest";
import { asyncRange, collect } from "./starter.js";

describe("asyncRange", () => {
  it("produkuje liczby od start do end-1", async () => {
    const out = [];
    for await (const n of asyncRange(1, 4)) out.push(n);
    expect(out, "zakres jest półotwarty [start, end)").toEqual([1, 2, 3]);
  });

  it("dla start === end nic nie produkuje", async () => {
    const out = [];
    for await (const n of asyncRange(5, 5)) out.push(n);
    expect(out).toEqual([]);
  });
});

describe("collect", () => {
  it("zbiera wszystkie wartości async iterable do tablicy", async () => {
    expect(await collect(asyncRange(1, 4))).toEqual([1, 2, 3]);
  });

  it("działa na dowolnym async iterable (nie tylko asyncRange)", async () => {
    const source = {
      async *[Symbol.asyncIterator]() {
        yield "a";
        yield "b";
      },
    };
    expect(
      await collect(source),
      "collect ma używać for await...of, więc działa na każdym async iterable",
    ).toEqual(["a", "b"]);
  });
});
