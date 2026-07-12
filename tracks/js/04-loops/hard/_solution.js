export function sieve(n) {
  if (n < 2) {
    return [];
  }
  const composite = new Uint8Array(n + 1);
  const primes = [];
  for (let i = 2; i <= n; i++) {
    if (!composite[i]) {
      primes.push(i);
      for (let j = i * i; j <= n; j += i) {
        composite[j] = 1;
      }
    }
  }
  return primes;
}

export function collatzLength(n) {
  let length = 1;
  let current = n;
  while (current !== 1) {
    current = current % 2 === 0 ? current / 2 : 3 * current + 1;
    length++;
  }
  return length;
}
