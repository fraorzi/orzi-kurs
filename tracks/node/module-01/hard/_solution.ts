export async function solve(
  chunks: AsyncIterable<Uint8Array>,
  options: {
    maxBytes: number;
    maxLineBytes: number;
    maxInvalid: number;
    signal?: AbortSignal;
  },
): Promise<{
  total: number;
  invalid: number;
  levels: Record<string, number>;
}> {
  let bytes = 0;
  let pending = Buffer.alloc(0);
  let total = 0;
  let invalid = 0;
  const levels: Record<string, number> = {};
  const consume = (line: Buffer) => {
    if (!line.length) return;
    if (line.length > options.maxLineBytes)
      throw new Error("Linia przekracza limit");
    try {
      const record = JSON.parse(line.toString("utf8")) as {
        level?: unknown;
      };
      if (typeof record.level !== "string") throw new Error();
      total++;
      levels[record.level] = (levels[record.level] ?? 0) + 1;
    } catch {
      invalid++;
      if (invalid > options.maxInvalid)
        throw new Error("Za dużo błędnych rekordów");
    }
  };
  for await (const chunk of chunks) {
    options.signal?.throwIfAborted();
    bytes += chunk.byteLength;
    if (bytes > options.maxBytes) throw new Error("Wejście przekracza limit");
    pending = Buffer.concat([pending, Buffer.from(chunk)]);
    let newline;
    while ((newline = pending.indexOf(10)) >= 0) {
      consume(pending.subarray(0, newline));
      pending = pending.subarray(newline + 1);
    }
    if (pending.length > options.maxLineBytes)
      throw new Error("Linia przekracza limit");
  }
  consume(pending);
  return { total, invalid, levels };
}
