export async function batchFetch(ids, fetchBatch, size) {
  const batches = [];
  for (let i = 0; i < ids.length; i += size) {
    batches.push(ids.slice(i, i + size));
  }
  const batchResults = await Promise.all(batches.map(fetchBatch));
  return batchResults.flat();
}
