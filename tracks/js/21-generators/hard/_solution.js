export function* fibonacci() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

export function* accumulator() {
  let total = 0;
  while (true) {
    const x = yield total;
    total += x;
  }
}
