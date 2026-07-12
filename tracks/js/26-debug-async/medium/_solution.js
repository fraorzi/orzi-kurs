export async function processAll(items, asyncFn) {
  const results = [];
  for (const item of items) {
    results.push(await asyncFn(item));
  }
  return results;
}

export async function mapAsync(items, asyncFn) {
  return Promise.all(items.map(asyncFn));
}
