export async function solve(input: AsyncIterable<Uint8Array>): Promise<Buffer> {
  const { Readable, Writable } = await import("node:stream");
  const { createGzip } = await import("node:zlib");
  const { pipeline } = await import("node:stream/promises");
  const chunks: Buffer[] = [];
  await pipeline(
    Readable.from(input),
    createGzip(),
    new Writable({
      write(chunk, _encoding, callback) {
        chunks.push(Buffer.from(chunk));
        callback();
      },
    }),
  );
  return Buffer.concat(chunks);
}
