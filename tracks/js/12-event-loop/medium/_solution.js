export async function processInChunks(items, process, chunkSize, onProgress) {
  const results = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    for (const item of chunk) {
      results.push(process(item));
    }
    onProgress(results.length, items.length);
    if (results.length < items.length) {
      await new Promise((resolve) => setTimeout(resolve));
    }
  }
  return results;
}
