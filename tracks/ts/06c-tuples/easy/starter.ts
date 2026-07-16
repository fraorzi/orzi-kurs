// TODO: etykietowane readonly tuple
export type Range = readonly number[];

// TODO: unia dwóch etykietowanych tuple
export type ParseRangeResult =
  | [boolean, Range]
  | [boolean, string];

export function parseRange(input: string): ParseRangeResult {
  // TODO
  return [false, "TODO"];
}

export function rangeLength(range: Range): number {
  // TODO: zakres liczony włącznie
  return 0;
}
