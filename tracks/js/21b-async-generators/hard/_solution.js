export async function* firstN(asyncIterable, n) {
  if (n <= 0) return;
  let count = 0;
  for await (const value of asyncIterable) {
    yield value;
    count += 1;
    if (count >= n) return;
  }
}
