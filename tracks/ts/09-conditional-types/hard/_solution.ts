export type KeysOfType<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

export type PickByType<T, V> = Pick<T, KeysOfType<T, V>>;

export type OmitByType<T, V> = Omit<T, KeysOfType<T, V>>;

export type DeepPartialSafe<T> = T extends (infer E)[]
  ? DeepPartialSafe<E>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartialSafe<T[K]> }
    : T;

export function pickByType<T extends object, V>(
  source: T,
  guard: (value: unknown) => value is V,
): PickByType<T, V> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(source)) {
    if (guard(value)) {
      out[key] = value;
    }
  }
  return out as PickByType<T, V>;
}
