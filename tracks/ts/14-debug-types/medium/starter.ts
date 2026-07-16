export type ParseResult<T> =
  | { ok: true; value: T }
  | { ok: false; message: string };

// TODO: usuń ten kłamliwy kontrakt i zastąp parseJson z funkcją parsera.
export function fromJson<T>(json: string): T {
  return JSON.parse(json);
}
