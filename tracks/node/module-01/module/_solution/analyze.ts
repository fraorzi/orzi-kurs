import { lines } from "./lines";
import { parseRecord } from "./records";
import {
  LOG_LEVELS,
  type AnalyzeOptions,
  type AnalyzeResult,
  type LogLevel,
  type ParseFailure,
} from "./types";

async function* limitBytes(
  chunks: AsyncIterable<Uint8Array>,
  maxTotalBytes: number,
): AsyncGenerator<Uint8Array> {
  let total = 0;
  for await (const chunk of chunks) {
    total += chunk.byteLength;
    if (total > maxTotalBytes) {
      throw new Error("Przekroczono maxTotalBytes");
    }
    yield chunk;
  }
}

export async function analyzeLog(
  chunks: AsyncIterable<Uint8Array>,
  options: AnalyzeOptions,
): Promise<AnalyzeResult> {
  const counts = Object.fromEntries(
    LOG_LEVELS.map((level) => [level, 0]),
  ) as Record<LogLevel, number>;
  const parseErrors: ParseFailure[] = [];
  let processed = 0;

  const fail = (line: number, reason: string): void => {
    parseErrors.push({ line, reason });
    if (parseErrors.length > options.maxParseErrors) {
      throw new Error("Przekroczono budżet błędów parsowania");
    }
  };

  for await (const { line, text } of lines(
    limitBytes(chunks, options.maxTotalBytes),
  )) {
    if (options.signal?.aborted) {
      throw options.signal.reason instanceof Error
        ? options.signal.reason
        : new Error(String(options.signal.reason ?? "aborted"));
    }
    if (!text.trim()) continue;
    if (Buffer.byteLength(text) > options.maxLineBytes) {
      fail(line, "line-too-long");
      continue;
    }
    try {
      const record = parseRecord(text);
      counts[record.level]++;
      processed++;
    } catch (error) {
      fail(line, error instanceof Error ? error.message : "unknown");
    }
  }

  return { processed, counts, parseErrors };
}
