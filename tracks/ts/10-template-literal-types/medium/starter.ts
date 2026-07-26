// TODO
export type Getters<T> = unknown;

export function makeGetters<T extends object>(source: T): Getters<T> {
  // TODO
  throw new Error("TODO");
}

// TODO
export type ChangeHandlers<T> = unknown;

export function makeChangeHandlers<T extends object>(
  state: T,
  onChange: (next: T) => void,
): ChangeHandlers<T> {
  // TODO
  throw new Error("TODO");
}

// TODO
export type WithoutInternal<T> = unknown;

export function stripInternal<T extends object>(obj: T): WithoutInternal<T> {
  // TODO
  throw new Error("TODO");
}
