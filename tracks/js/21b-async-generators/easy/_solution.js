export async function* asyncRange(start, end) {
  for (let i = start; i < end; i++) {
    yield i;
  }
}

export async function collect(asyncIterable) {
  const out = [];
  for await (const value of asyncIterable) {
    out.push(value);
  }
  return out;
}
