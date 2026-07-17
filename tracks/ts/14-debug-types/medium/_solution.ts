export type ParseResult<T> =
  | { ok: true; value: T }
  | { ok: false; message: string };

export function parseJson<T>(
  json: string,
  parse: (value: unknown) => T,
): ParseResult<T> {
  let value: unknown;
  try {
    value = JSON.parse(json);
  } catch {
    return { ok: false, message: "invalid json" };
  }

  try {
    return { ok: true, value: parse(value) };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "invalid value",
    };
  }
}
