type StringKey<T> = Extract<keyof T, string>;

// TODO
export type Paths<T> = StringKey<T>;

// TODO
export type PathValue<T, Path extends string> = unknown;

export function getAtPath<T extends object, Path extends Paths<T>>(
  object: T,
  path: Path,
): PathValue<T, Extract<Path, string>> {
  // TODO
  throw new Error("TODO");
}
