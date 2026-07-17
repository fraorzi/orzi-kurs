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
  throw new Error("TODO");
}
