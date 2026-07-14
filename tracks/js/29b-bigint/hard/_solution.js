export function sumAmounts(amounts) {
  let total = 0n;
  for (const amount of amounts) {
    total += BigInt(amount);
  }
  return total.toString();
}
