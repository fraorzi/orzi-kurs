export async function processAll(items, asyncFn) {
  const results = [];
  items.forEach(async (item) => {
    results.push(await asyncFn(item));
  });
  return results;
}

export async function mapAsync(items, asyncFn) {
  return items.map(asyncFn);
}
