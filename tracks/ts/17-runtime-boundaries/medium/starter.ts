export type ParseResult<T> =
  | { ok: true; value: T }
  | { ok: false; errors: string[] };

export type Parser<T> = (value: unknown) => ParseResult<T>;

export const parsePositiveInteger: Parser<number> = () => ({
  ok: false,
  errors: ["expected positive integer"],
});

export function parseArray<T>(
  input: unknown,
  parseItem: Parser<T>,
): ParseResult<T[]> {
  // TODO: wszystkie błędy z indeksami
  return { ok: false, errors: [] };
}
