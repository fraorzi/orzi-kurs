// TODO: generyczna unia rozłączna — sukces z wartością T albo błąd z komunikatem
export type Result<T> =
  | { readonly ok: true; readonly value: unknown }
  | { readonly ok: false; readonly error: string };

export function ok(value: unknown): Result<unknown> {
  // TODO: wariant sukcesu
  return { ok: false, error: "TODO" };
}

// TODO: typ zwracany to Result<never> — pasuje do każdego Result<T>
export function err(error: string): Result<unknown> {
  // TODO: wariant błędu
  return { ok: false, error };
}

// TODO: dwa parametry typu; na błędzie NIE wołaj fn
export function mapResult(
  result: Result<unknown>,
  fn: (value: unknown) => unknown,
): Result<unknown> {
  // TODO
  return result;
}

// TODO: fn samo zwraca Result — wynik nie może być Result<Result<U>>
export function flatMapResult(
  result: Result<unknown>,
  fn: (value: unknown) => Result<unknown>,
): Result<unknown> {
  // TODO
  return result;
}

export function unwrapOr(result: Result<unknown>, fallback: unknown): unknown {
  // TODO: wartość sukcesu albo fallback
  return fallback;
}

// TODO: lista wyników → wynik z listą; pierwszy błąd wygrywa
export function collect(results: readonly Result<unknown>[]): Result<unknown[]> {
  // TODO
  return { ok: false, error: "TODO" };
}
