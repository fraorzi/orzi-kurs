// TODO
export type KeysOfType<T, V> = keyof T;

// TODO
export type PickByType<T, V> = T;

// TODO
export type OmitByType<T, V> = T;

// TODO
export type DeepPartialSafe<T> = T;

export function pickByType<T extends object, V>(
  source: T,
  guard: (value: unknown) => value is V,
): PickByType<T, V> {
  // TODO
  throw new Error("TODO");
}
