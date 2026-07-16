// TODO: unia kluczy T, których wartość jest przypisywalna do V.
export type KeysOfType<T, V> = keyof T;

// TODO: T ograniczone do pól typu V.
export type PickByType<T, V> = T;

// TODO: T bez pól typu V.
export type OmitByType<T, V> = T;

// TODO: rekurencyjnie opcjonalne pola obiektów; TABLICA zostaje tablicą.
export type DeepPartialSafe<T> = T;

export function pickByType<T extends object, V>(
  source: T,
  guard: (value: unknown) => value is V,
): PickByType<T, V> {
  // TODO: zostaw pola, dla których strażnik zwraca true
  throw new Error("TODO");
}
