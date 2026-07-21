export const LOG_LEVELS = ["debug", "info", "warn", "error"] as const;

export type LogLevel = (typeof LOG_LEVELS)[number];

export interface LogRecord {
  readonly level: LogLevel;
  readonly message: string;
}

export interface NumberedLine {
  readonly line: number;
  readonly text: string;
}

export interface AnalyzeOptions {
  readonly maxTotalBytes: number;
  readonly maxLineBytes: number;
  readonly maxParseErrors: number;
  readonly signal?: AbortSignal;
}

export interface ParseFailure {
  readonly line: number;
  readonly reason: string;
}

export interface AnalyzeResult {
  readonly processed: number;
  readonly counts: Readonly<Record<LogLevel, number>>;
  readonly parseErrors: readonly ParseFailure[];
}
