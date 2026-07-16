// TODO: każde pole opcjonalne (bez używania wbudowanego Partial).
export type MyPartial<T> = T;

// TODO: każde pole readonly (bez używania wbudowanego Readonly).
export type MyReadonly<T> = T;

// TODO: zdejmij readonly z każdego pola.
export type Mutable<T> = T;

// TODO: wartość każdego pola dopuszcza null.
export type Nullable<T> = T;

export function toDraft<T extends object>(source: MyReadonly<T>): Mutable<T> {
  // TODO: płytka kopia, którą wolno mutować
  throw new Error("TODO");
}

export function clearFields<T extends object>(source: T): Nullable<T> {
  // TODO: te same klucze, każda wartość null
  throw new Error("TODO");
}
