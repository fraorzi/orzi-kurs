function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

function timeRun<T>(fn: (input: T) => unknown, input: T): number {
  const start = performance.now();
  fn(input);
  return performance.now() - start;
}

function medianTime<T>(fn: (input: T) => unknown, input: T, runs = 3): number {
  fn(input);
  const times: number[] = [];
  for (let i = 0; i < runs; i++) {
    times.push(timeRun(fn, input));
  }
  return median(times);
}

function classify(ratio: number, sizeFactor: number): string {
  if (ratio >= sizeFactor * sizeFactor * 0.5) return "O(n²)";
  if (ratio >= sizeFactor * 2) return "wielomianową gorszą niż O(n)";
  return "O(n)";
}

export function expectScaling<T>(opts: {
  fn: (input: T) => unknown;
  makeInput: (size: number) => T;
  sizes: [number, number];
  expect: "linear" | "constant";
  maxRatio?: number;
}): void {
  const { fn, makeInput, sizes, expect } = opts;
  const [small, large] = sizes;
  const sizeFactor = large / small;
  const maxRatio = opts.maxRatio ?? (expect === "linear" ? 40 : 5);

  const inputSmall = makeInput(small);
  const inputLarge = makeInput(large);

  const tSmall = medianTime(fn, inputSmall);
  const tLarge = medianTime(fn, inputLarge);

  const floor = 0.02;
  const ratio = tLarge / Math.max(tSmall, floor);

  if (ratio > maxRatio) {
    const expectedLabel = expect === "linear" ? "O(n)" : "O(1)";
    const guessed = classify(ratio, sizeFactor);
    throw new Error(
      `czas wzrósł ~${Math.round(ratio)}× przy ${sizeFactor}× większym wejściu — ` +
        `wygląda na ${guessed}, oczekiwano ${expectedLabel}`,
    );
  }
}
