export async function* paginate(fetchPage) {
  let cursor;
  while (true) {
    const { items, next } = await fetchPage(cursor);
    yield* items;
    if (next === null || next === undefined) return;
    cursor = next;
  }
}
