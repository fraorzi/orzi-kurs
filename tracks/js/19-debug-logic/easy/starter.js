export function sumTo(n) {
  let sum = 0;
  for (let i = 1; i < n; i++) {
    sum += i;
  }
  return sum;
}

export function last(arr) {
  return arr[arr.length];
}
