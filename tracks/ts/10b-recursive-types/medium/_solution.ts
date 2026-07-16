type StringKey<T> = Extract<keyof T, string>;

export type Paths<T> =
  T extends readonly unknown[]
    ? never
    : T extends object
      ? {
          [K in StringKey<T>]:
            T[K] extends readonly unknown[]
              ? K
              : T[K] extends object
                ? K | `${K}.${Paths<T[K]>}`
                : K;
        }[StringKey<T>]
      : never;

export type PathValue<T, Path extends string> =
  Path extends `${infer Head}.${infer Tail}`
    ? Head extends keyof T
      ? PathValue<T[Head], Tail>
      : never
    : Path extends keyof T
      ? T[Path]
      : never;

export function getAtPath<T extends object, Path extends Paths<T>>(
  object: T,
  path: Path,
): PathValue<T, Extract<Path, string>> {
  let current: unknown = object;
  for (const segment of String(path).split(".")) {
    if (typeof current !== "object" || current === null) {
      throw new TypeError(`Nie można odczytać segmentu: ${segment}`);
    }
    current = (current as Record<string, unknown>)[segment];
  }
  return current as PathValue<T, Extract<Path, string>>;
}
