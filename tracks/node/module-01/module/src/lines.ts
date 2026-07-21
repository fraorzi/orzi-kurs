import type { NumberedLine } from "./types";

export async function* lines(
  chunks: AsyncIterable<Uint8Array>,
): AsyncGenerator<NumberedLine> {
  throw new Error("TODO");
}
