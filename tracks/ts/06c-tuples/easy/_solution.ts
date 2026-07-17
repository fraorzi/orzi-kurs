export type Range = readonly [start: number, end: number];
export type ParseRangeResult =
  | [ok: true, range: Range]
  | [ok: false, message: string];

export function parseRange(input: string): ParseRangeResult {
  const parts = input.split("..");
  if (parts.length !== 2) return [false, "format"];

  const start = Number(parts[0]);
  const end = Number(parts[1]);
  if (!Number.isInteger(start) || !Number.isInteger(end)) {
    return [false, "integer"];
  }
  if (start > end) return [false, "order"];
  return [true, [start, end]];
}

export function rangeLength(range: Range): number {
  return range[1] - range[0] + 1;
}
