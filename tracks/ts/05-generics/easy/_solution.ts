export function identity<T>(value: T): T {
  return value;
}

export function firstOrNull<T>(items: readonly T[]): T | null {
  return items.length > 0 ? items[0] : null;
}

export type Box<T> = { value: T };

export function box<T>(value: T): Box<T> {
  return { value };
}

export function unbox<T>(boxed: Box<T>): T {
  return boxed.value;
}

export function pair<A, B>(first: A, second: B): [A, B] {
  return [first, second];
}
