export function sumMixed(values) {
  let total = 0n;
  for (const value of values) {
    if (typeof value === "number" && !Number.isInteger(value)) {
      throw new TypeError(
        `nie można skonwertować ${value} na BigInt — BigInt przyjmuje tylko liczby całkowite`,
      );
    }
    total += BigInt(value);
  }
  return total;
}
