import type { AnalyzeOptions, AnalyzeResult } from "./types";

export async function analyzeLog(
  chunks: AsyncIterable<Uint8Array>,
  options: AnalyzeOptions,
): Promise<AnalyzeResult> {
  throw new Error("TODO");
}
