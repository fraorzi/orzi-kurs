export function sieve(n) {
  const res = [];
  res.length = n + 1;
  for (let i = 0; i <= n; i++) {
    res[i] = i;
  }
  for (let j = 2; j * j <= n; j++) {
    if (res[j] !== false) {
      for (let k = j * j; k <= n; k += j) {
        res[k] = false;
      }
    }
  }
  res[1] = false;
  return res.filter(Boolean);
}

export function collatzLength(n) {
  let count = 1;
  while (n !== 1) {
    if (n % 2 === 0) {
      n = n / 2;
    } else {
      n = 3 * n + 1;
    }
    count++;
  }
  return count;
}
