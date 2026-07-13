export async function collect(promises) {
  const settled = await Promise.allSettled(promises);
  const values = [];
  const errors = [];
  for (const r of settled) {
    if (r.status === "fulfilled") values.push(r.value);
    else errors.push(r.reason);
  }
  return { values, errors };
}
