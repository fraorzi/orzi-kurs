export type Result<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: string };

export function ok<T>(value: T): Result<T> {
  return { ok: true, value };
}

export function err(error: string): Result<never> {
  return { ok: false, error };
}

export function mapResult<T, U>(
  result: Result<T>,
  fn: (value: T) => U,
): Result<U> {
  return result.ok ? ok(fn(result.value)) : result;
}

export function flatMapResult<T, U>(
  result: Result<T>,
  fn: (value: T) => Result<U>,
): Result<U> {
  return result.ok ? fn(result.value) : result;
}

export function unwrapOr<T>(result: Result<T>, fallback: T): T {
  return result.ok ? result.value : fallback;
}

export function collect<T>(results: readonly Result<T>[]): Result<T[]> {
  const values: T[] = [];
  for (const result of results) {
    if (!result.ok) {
      return result;
    }
    values.push(result.value);
  }
  return ok(values);
}
