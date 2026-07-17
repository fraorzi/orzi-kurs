export function solve(command: string, error?: unknown, debug = false): string {
  if (!error)
    return `Usage: ${command} <file> [options]\n\nOptions:\n  --json       NDJSON output\n  --max-bytes  Input limit\n\nExample:\n  ${command} app.ndjson --json\n`;
  const message = error instanceof Error ? error.message : "Unknown error";
  const cause =
    debug && error instanceof Error && error.cause
      ? `\nCause: ${String(error.cause)}`
      : "";
  return `Error: ${message}${cause}\nRun '${command} --help' for usage.\n`;
}
