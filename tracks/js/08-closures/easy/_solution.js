export function makeCounter() {
  let count = 0;
  return () => count++;
}

export function sum(a) {
  return (b) => a + b;
}
