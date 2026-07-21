import { StringDecoder } from "node:string_decoder";
import type { NumberedLine } from "./types";

export async function* lines(
  chunks: AsyncIterable<Uint8Array>,
): AsyncGenerator<NumberedLine> {
  const decoder = new StringDecoder("utf8");
  let pending = "";
  let line = 0;
  for await (const chunk of chunks) {
    pending += decoder.write(Buffer.from(chunk));
    let index;
    while ((index = pending.indexOf("\n")) >= 0) {
      line++;
      yield { line, text: pending.slice(0, index).replace(/\r$/, "") };
      pending = pending.slice(index + 1);
    }
  }
  pending += decoder.end();
  if (pending) {
    line++;
    yield { line, text: pending.replace(/\r$/, "") };
  }
}
