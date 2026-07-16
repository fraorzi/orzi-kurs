export type ParseResult<T> =
  | { ok: true; value: T }
  | { ok: false; errors: string[] };

export type Parser<T> = (value: unknown) => ParseResult<T>;

export const parsePositiveInteger: Parser<number> = (value) =>
  typeof value === "number" && Number.isInteger(value) && value > 0
    ? { ok: true, value }
    : { ok: false, errors: ["expected positive integer"] };

export function parseArray<T>(
  input: unknown,
  parseItem: Parser<T>,
): ParseResult<T[]> {
  if (!Array.isArray(input)) return { ok: false, errors: ["expected array"] };

  const values: T[] = [];
  const errors: string[] = [];
  input.forEach((item, index) => {
    const result = parseItem(item);
    if (result.ok) values.push(result.value);
    else errors.push(...result.errors.map((error) => `[${index}]: ${error}`));
  });
  return errors.length > 0 ? { ok: false, errors } : { ok: true, value: values };
}
