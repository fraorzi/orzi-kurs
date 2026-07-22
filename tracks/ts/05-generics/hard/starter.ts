// TODO
export type Result<T> =
  | { readonly ok: true; readonly value: unknown }
  | { readonly ok: false; readonly error: string };

export function ok(value: unknown): Result<unknown> {
  // TODO
  return { ok: false, error: "TODO" };
}

// TODO
export function err(error: string): Result<unknown> {
  // TODO
  return { ok: false, error };
}

// TODO
export function mapResult(
  result: Result<unknown>,
  fn: (value: unknown) => unknown,
): Result<unknown> {
  // TODO
  return result;
}

// TODO
export function flatMapResult(
  result: Result<unknown>,
  fn: (value: unknown) => Result<unknown>,
): Result<unknown> {
  // TODO
  return result;
}

export function unwrapOr(result: Result<unknown>, fallback: unknown): unknown {
  // TODO
  return fallback;
}

// TODO
export function collect(results: readonly Result<unknown>[]): Result<unknown[]> {
  // TODO
  return { ok: false, error: "TODO" };
}
