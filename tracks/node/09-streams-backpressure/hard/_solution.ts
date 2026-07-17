export async function solve(lines: readonly string[]): Promise<string> {
  const { Readable, Transform, Writable } = await import("node:stream");
  const output: Buffer[] = [];
  let pending = "";
  const transform = new Transform({
    transform(chunk, _encoding, callback) {
      pending += chunk.toString();
      const parts = pending.split("\n");
      pending = parts.pop() ?? "";
      for (const line of parts)
        if (line.trim()) this.push(line.toUpperCase() + "\n");
      callback();
    },
    flush(callback) {
      if (pending.trim()) this.push(pending.toUpperCase());
      callback();
    },
  });
  const sink = new Writable({
    write(chunk, _encoding, callback) {
      output.push(Buffer.from(chunk));
      callback();
    },
  });
  const { pipeline } = await import("node:stream/promises");
  await pipeline(Readable.from(lines), transform, sink);
  return Buffer.concat(output).toString();
}
