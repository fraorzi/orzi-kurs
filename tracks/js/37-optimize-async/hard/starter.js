export async function batchFetch(ids, fetchBatch, size) {
  // Poprawne, ale woła fetchBatch osobno dla KAŻDEGO id (n wywołań), ignorując size.
  return Promise.all(
    ids.map(async (id) => {
      const [result] = await fetchBatch([id]);
      return result;
    }),
  );
}
