// TODO: ogranicz K do kluczy T; wynik to tablica wartości tego pola (T[K][]).
export function pluck<T extends object, K>(
  items: readonly T[],
  key: K,
): unknown[] {
  return [];
}

// TODO: indeks wartość pola → element; przy powtórce wygrywa ostatni.
export function indexBy<T extends object, K>(
  items: readonly T[],
  key: K,
): Map<unknown, T> {
  return new Map();
}

// TODO: ogranicz K do PropertyKey; zlicz elementy wg klucza z keyOf.
export function countBy<T, K>(
  items: readonly T[],
  keyOf: (item: T) => K,
): Map<K, number> {
  return new Map();
}

// TODO: T musi mieć pole K typu number (Record<K, number>) — stąd kolejność <K, T>.
export function sumBy<K extends PropertyKey, T>(
  items: readonly T[],
  key: K,
): number {
  return 0;
}
