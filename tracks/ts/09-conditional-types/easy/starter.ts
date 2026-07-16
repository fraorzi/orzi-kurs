// TODO: usuń z unii T składniki przypisywalne do U (bez wbudowanego Exclude).
export type MyExclude<T, U> = T;

// TODO: zostaw w unii T tylko składniki przypisywalne do U.
export type MyExtract<T, U> = T;

// TODO: usuń null i undefined.
export type MyNonNullable<T> = T;

// TODO: typ elementu tablicy (także readonly); dla nie-tablicy never.
export type ElementType<T> = T;

export function compact<T>(items: readonly T[]): MyNonNullable<T>[] {
  // TODO: odsiej null i undefined (0, "" i false ZOSTAJĄ)
  throw new Error("TODO");
}
