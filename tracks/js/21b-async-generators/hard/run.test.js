import { describe, it, expect } from "vitest";
import { firstN } from "./starter.js";

async function* asyncRange(start, end) {
  for (let i = start; i < end; i++) yield i;
}

// Nieskończone źródło z licznikiem pobrań — impl. materializująca całość by się zawiesiła.
function infiniteCounter() {
  const state = { pulled: 0 };
  async function* gen() {
    let i = 1;
    while (true) {
      state.pulled += 1;
      yield i++;
    }
  }
  return { source: gen(), state };
}

async function drain(asyncIterable) {
  const out = [];
  for await (const x of asyncIterable) out.push(x);
  return out;
}

describe("firstN — poprawność", () => {
  it("zwraca pierwsze n elementów", async () => {
    expect(await drain(firstN(asyncRange(1, 1000), 3))).toEqual([1, 2, 3]);
  });

  it("dla n <= 0 nie produkuje nic", async () => {
    expect(await drain(firstN(asyncRange(1, 1000), 0))).toEqual([]);
  });

  it("gdy źródło ma mniej niż n, zwraca tyle, ile jest", async () => {
    expect(await drain(firstN(asyncRange(1, 3), 10))).toEqual([1, 2]);
  });
});

describe("firstN — leniwość", () => {
  it("pobiera ze źródła dokładnie n elementów (nie ciągnie całości)", async () => {
    const { source, state } = infiniteCounter();
    const out = await drain(firstN(source, 3));
    expect(out, "z nieskończonego źródła bierzemy pierwsze 3").toEqual([1, 2, 3]);
    expect(
      state.pulled,
      "leniwy firstN pobiera dokładnie n=3 elementów — impl. materializująca zawiesiłaby się na nieskończonym źródle",
    ).toBe(3);
  });

  it("dla n <= 0 w ogóle nie dotyka źródła", async () => {
    const { source, state } = infiniteCounter();
    await drain(firstN(source, 0));
    expect(state.pulled, "n <= 0 → zero pobrań ze źródła").toBe(0);
  });
});
