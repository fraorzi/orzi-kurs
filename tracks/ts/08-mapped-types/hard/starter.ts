// TODO
export type DeepReadonly<T> = T;

// TODO
export type DeepPartial<T> = T;

export function deepFreeze<T>(value: T): DeepReadonly<T> {
  // TODO
  throw new Error("TODO");
}

export function deepMerge<T extends object>(base: T, patch: DeepPartial<T>): T {
  // TODO
  throw new Error("TODO");
}
