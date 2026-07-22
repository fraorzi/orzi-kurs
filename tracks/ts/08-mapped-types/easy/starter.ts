// TODO
export type MyPartial<T> = T;

// TODO
export type MyReadonly<T> = T;

// TODO
export type Mutable<T> = T;

// TODO
export type Nullable<T> = T;

export function toDraft<T extends object>(source: MyReadonly<T>): Mutable<T> {
  // TODO
  throw new Error("TODO");
}

export function clearFields<T extends object>(source: T): Nullable<T> {
  // TODO
  throw new Error("TODO");
}
