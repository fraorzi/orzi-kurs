export async function solve(
  chunks: AsyncIterable<Uint8Array>,
): Promise<string> {
  const { StringDecoder } = await import("node:string_decoder");
  const decoder = new StringDecoder("utf8");
  let text = "";
  for await (const chunk of chunks) text += decoder.write(Buffer.from(chunk));
  return text + decoder.end();
}
