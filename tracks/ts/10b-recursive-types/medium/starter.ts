type StringKey<T> = Extract<keyof T, string>;

// TODO: mapped type i template literal; tablica jest liściem.
export type Paths<T> = StringKey<T>;

// TODO: rozdziel Head.Tail i zejdź rekurencyjnie.
export type PathValue<T, Path extends string> = unknown;

export function getAtPath<T extends object, Path extends Paths<T>>(
  object: T,
  path: Path,
): PathValue<T, Extract<Path, string>> {
  // TODO: runtime przejście po segmentach
  throw new Error("TODO");
}
