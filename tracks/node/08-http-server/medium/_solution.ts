export async function solve<T>(
  body: AsyncIterable<Uint8Array>,
  maxBytes: number,
): Promise<T> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of body) {
    size += chunk.byteLength;
    if (size > maxBytes) throw new Error("413 Payload Too Large");
    chunks.push(Buffer.from(chunk));
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8")) as T;
  } catch {
    throw new Error("400 Invalid JSON");
  }
}
