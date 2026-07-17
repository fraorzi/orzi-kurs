export async function* solve(
  chunks: AsyncIterable<string>,
): AsyncGenerator<string> {
  let pending = "";
  for await (const chunk of chunks) {
    pending += chunk;
    let index;
    while ((index = pending.indexOf("\n")) >= 0) {
      yield pending.slice(0, index).replace(/\r$/, "");
      pending = pending.slice(index + 1);
    }
  }
  if (pending) yield pending;
}
