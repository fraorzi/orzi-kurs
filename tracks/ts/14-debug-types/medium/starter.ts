export type ParseResult<T> =
  | { ok: true; value: T }
  | { ok: false; message: string };

// TODO
export function fromJson<T>(json: string): T {
  return JSON.parse(json);
}
