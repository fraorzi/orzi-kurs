import { describe, it, expect } from "vitest";
import { processInChunks } from "./starter.js";

describe("processInChunks", () => {
  it("przetwarza wszystkie elementy i zwraca wyniki w kolejności", async () => {
    const items = [1, 2, 3, 4, 5];
    const results = await processInChunks(items, (x) => x * 10, 2, () => {});
    expect(results).toEqual([10, 20, 30, 40, 50]);
  });

  it("raportuje postęp po każdej porcji", async () => {
    const calls = [];
    await processInChunks([1, 2, 3, 4, 5], (x) => x, 2, (done, total) => calls.push([done, total]));
    expect(
      calls,
      "onProgress(done, total) ma być wywołane po każdej porcji: po 2, 4 i 5 elementach",
    ).toEqual([
      [2, 5],
      [4, 5],
      [5, 5],
    ]);
  });

  it("oddaje kontrolę do event loopa między porcjami (makrotask)", async () => {
    let timerFired = false;
    let timerFiredDuringProcessing = false;
    setTimeout(() => {
      timerFired = true;
    }, 0);

    const items = Array.from({ length: 50 }, (_, i) => i);
    await processInChunks(
      items,
      (x) => {
        if (timerFired) timerFiredDuringProcessing = true;
        return x;
      },
      10,
      () => {},
    );

    expect(
      timerFiredDuringProcessing,
      "timer ustawiony przed startem nie wykonał się w trakcie przetwarzania — między porcjami musi być MAKROTASK (setTimeout), mikrotask nie oddaje kontroli timerom",
    ).toBe(true);
  });

  it("porcja mniejsza niż chunkSize na końcu też jest obsłużona", async () => {
    const results = await processInChunks([1, 2, 3], (x) => x + 1, 10, () => {});
    expect(results).toEqual([2, 3, 4]);
  });

  it("pusta tablica: brak wywołań process i onProgress, pusty wynik", async () => {
    const progressCalls = [];
    const results = await processInChunks([], (x) => x, 5, (...args) => progressCalls.push(args));
    expect(results).toEqual([]);
    expect(progressCalls).toEqual([]);
  });
});
