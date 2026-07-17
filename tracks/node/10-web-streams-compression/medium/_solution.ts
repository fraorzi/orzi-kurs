export async function solve(
  source: import("node:stream").Readable,
): Promise<string> {
  const { Readable } = await import("node:stream");
  const web = Readable.toWeb(source) as ReadableStream<Uint8Array>;
  const transformed = web.pipeThrough(
    new TransformStream({
      transform(chunk, controller) {
        controller.enqueue(Buffer.from(chunk).toString().toUpperCase());
      },
    }),
  );
  const reader = transformed.getReader();
  let output = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    output += value;
  }
  return output;
}
